import {
    MetatonicReduxAppInstance,
    Thunks,
    MetatonicReduxContext,
    createMetatonicAppInitializer,
    MetatonicContextInitializer,
    MetatonicReduxApp,
    MetatonicAppConfig,
    createMetatonicReduxThunkApp
} from '../src/index'
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {FormEvents, defaultComponentRegistry, ObjectDataStorage, MetatonicGlobalState} from "metatonic-core";
import {exampleSchema} from 'metatonic-core/lib/test-tools'
import {FormState} from "metatonic-core";
import {Maybe} from "metatonic-core";


export function metatonicTestMiddleware(awaits: { [x:string]: Maybe<Promise> }) {
    let eventHappenedFuncs = Object.keys(awaits).reduce((funcs, k) => {
        let loadFinishedReceived: (x) => void
        awaits[k] = new Promise<FormState>((resolve, reject) => { loadFinishedReceived = resolve; });
        funcs[k] = loadFinishedReceived;
        return funcs;
    }, {})
    let middleWare = applyMiddleware(store => next => (action) => {
        //console.log('redux.action:before', 'action', action, 'state', store.getState())
        next(action);
        //console.log('redux.action:after', 'action', action, 'state', store.getState())
        if (action.type === FormEvents.loadFinished) {
            //console.log('final state', JSON.stringify(store.getState()))
        }
        Object.keys(awaits).forEach(k => {
            if (k === action.type) {
                eventHappenedFuncs[k](store.getState());
                //console.log('happened', k)
            }
        })

    });
    return middleWare;
}


describe('Metatonic Redux App', () => {
    describe('given a Home form', () => {
        let metatonicConfig = {
            dataStore: new ObjectDataStorage({
                $schema: exampleSchema,
            }),
            componentRegistry: defaultComponentRegistry
        }

        let awaits = {
            [FormEvents.loadFinished]: null
        }

        let app = createMetatonicReduxThunkApp(metatonicConfig);
        let context = app.contexts['default'];
        let store = createStore<{metatonic: MetatonicGlobalState}>(
            combineReducers({
                metatonic: (s, a) => context.metatonicReducer(s, a)
            }),
            compose(applyMiddleware(thunk), metatonicTestMiddleware(awaits))
        )
        let thunks = new Thunks(context)

        let recordName = 'Home'
        let recordId = null;
        let formId = 'test'

        describe('when initialized', async () => {
            store.dispatch(thunks.initialLoad(formId, recordName, recordId));

            let state = () => store.getState() as {metatonic: MetatonicGlobalState};
            it('should have a metatonic object in state', async () => {
                expect.assertions(2)
                await awaits[FormEvents.loadFinished];
                expect(state()).toBeTruthy()
                expect(state().metatonic).toBeTruthy()
            })

            let forms = () => ((state()||{}).metatonic||{}).forms;
            let form = () => (forms()||{})['test'] as FormState;
            it('should have a test form', async () => {
                expect.assertions(2)
                return awaits[FormEvents.loadFinished].then(x => {
                    expect(forms()).toHaveProperty('test');
                    expect(form()).toBeTruthy();
                });
            })

            it('should have a schema object set', async () => {
                expect.assertions(1)
                await awaits[FormEvents.loadFinished];
                expect(form().schema).toBeTruthy();
            })

            it('should have a formData object set', async () => {
                expect.assertions(1)
                await awaits[FormEvents.loadFinished];
                expect(form().formData).toBeTruthy();
            })

            it('should have a formState object set', async () => {
                expect.assertions(1)
                await awaits[FormEvents.loadFinished];
                expect(form().formState).toBeTruthy();
            })
        })
    })
})