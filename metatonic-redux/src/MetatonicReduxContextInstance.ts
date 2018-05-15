import {AllMetatonicEvents, FormState, MetatonicRootAction} from "metatonic-core";
import {MetatonicBaseContext} from "metatonic-core";
import {PersistantDataStore} from "metatonic-core";
import {ComponentRegistry, defaultComponentRegistry} from "metatonic-core";
import {
    MetatonicReduxApp, MetatonicReduxContext, MetatonicDispatchFunction,
    MetatonicFormEventProps, MetatonicReduxFormFunctions, MetatonicReduxWrappers
} from "./MetatonicReduxApp.interfaces";
import {FormEvents, MetatonicAction} from "metatonic-core";
import {FormProperties} from "metatonic-core";
import {formReduce} from "./PrimaryFormReducer";
import {getEditorResolverContext} from "metatonic-core";
import {Store} from "redux";
import {AppDispatcher} from "metatonic-core";
import {StandardAction} from "metatonic-core";
import {OptionalProps} from "metatonic-core";
import {MetatonicGlobalState} from "metatonic-core";
import {copyAndSet} from "metatonic-core";

export class MetatonicReduxContextInstance extends MetatonicBaseContext implements  MetatonicReduxContext{
    constructor(app: MetatonicReduxApp, componentRegistry: ComponentRegistry, dataStore: PersistantDataStore, wrappers: (context: MetatonicReduxContext) => MetatonicReduxWrappers) {
        super(app, componentRegistry, dataStore);
        this.actionWrapper = wrappers(this).action;
    }
    public appStore: Store<any>;
    public appDispatcher: AppDispatcher;
    public actionWrapper: (action: MetatonicRootAction) => any;
    private ownedForms: any[] = [];

    app: MetatonicReduxApp;

    metatonicReducer = (state: MetatonicGlobalState, action: MetatonicRootAction) => {
        let isMetatonicEventType = Object.keys(FormEvents).map(k => FormEvents[k]).includes(action.type);
        let hasFormId = action.meta && action.meta.formId;
        if (!isMetatonicEventType || !hasFormId) return state||{forms:{}};
        let formId = action.meta.formId;
        state = copyAndSet(state, {forms: state.forms||{}})
        return copyAndSet(state, {
            forms: {
                ...state.forms||{},
                [formId]: this.form(formId).reduce(state.forms[formId], action)
            }
        });
    }

    registerForm(formId) {
        this.ownedForms.push(formId)
    }

    form(formId){
        return new MetatonicReduxFormInstance(formId, this)
    }

    wrapAction(action) {
        return this.actionWrapper? this.actionWrapper(action) : action;
    }
}


export class MetatonicReduxFormInstance  implements MetatonicReduxFormFunctions {
    constructor(public formId, public context: MetatonicReduxContextInstance) {
        this.reduce = formReduce(formId);
    }

    reduce(state: FormState, action: MetatonicRootAction): FormState {
        return formReduce(this.formId)(state, action);
    }

    mapStateToProps = (formState: FormState): FormProperties => {
        return {
            editors: getEditorResolverContext(this.context.componentRegistry, formState.schema),
            schema: formState.schema,
            formState: formState.formState,
            recordName: (formState.schema||{}).typeName,
            formData: formState.formData,
            formName: '',
            title: '',
            recordId: (formState.formData||{})['id']
        } as FormProperties
    }
    mapDispatchToProps = (dispatch: MetatonicDispatchFunction): MetatonicFormEventProps => {
        return {
            onFormEvent: (action: MetatonicRootAction) =>
                dispatch(this.formatAction(action))
        }
    }

    formatAction = (action: MetatonicAction) => {
        return this.context.wrapAction({
            ...action,
            meta: { formId: this.formId }
        })
    }
        
    state() {
        return this.context.appStore.getState().metatonic.forms[this.formId];
    }
}