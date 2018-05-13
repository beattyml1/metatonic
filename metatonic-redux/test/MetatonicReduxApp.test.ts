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
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {FormEvents, defaultComponentRegistry, ObjectDataStorage, MetatonicGlobalState} from "metatonic-core";



describe('Metatonic Redux App', () => {
    describe('given a Home form', () => {
        let metatonicConfig = {
            dataStore: new ObjectDataStorage({}),
            componentRegistry: defaultComponentRegistry
        }
        let app = createMetatonicReduxThunkApp(metatonicConfig);
        let context = app.contexts['default'];
        let store = createStore<{metatonic: MetatonicGlobalState}>(
            combineReducers({
                metatonic: (s, a) => context.metatonicReducer(s, a)
            }),
            applyMiddleware(thunk)
        )

        let recordName = 'Home'
        let recordId = null;
        let formId = 'test'
        describe('when initialized', () => {
            store.dispatch({ type: FormEvents.initialize, payload: { recordName, recordId }, meta: { formId }});

            let state = store.getState() as {metatonic: MetatonicGlobalState};
            it('should have a metatonic object in state', () => {
                expect(state).toBeTruthy()
                expect(state.metatonic).toBeTruthy()
                expect(form).toBeTruthy();
            })

            let forms = state.metatonic.forms;
            let form = forms['test']
            it('should have a test form', () => {
                expect(forms).toHaveProperty('test');
                expect(form).toBeTruthy();
            })

            it('should do other things but tests have not been written yet', () => {

            })
        })
    })
})