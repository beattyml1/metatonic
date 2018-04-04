import {Store} from "redux";
import {AllMetatonicEvents, FormState, MetatonicRootAction} from "metatonic-core";
import {AppDispatcher} from "metatonic-core";
import {MetatonicBaseContext} from "metatonic-core";
import {PersistantDataStore} from "metatonic-core";
import {ComponentRegistry, defaultComponentRegistry} from "metatonic-core";
import {RestDataStore} from "metatonic-core";
import { MetatonicApp, MetatonicContext, MetatonicGlobalState} from "metatonic-core";
import {MetatonicReduxApp, MetatonicReduxContext} from "./MetatonicReduxApp.interfaces";
import {FormEvents, MetatonicAction} from "../../metatonic-core/src/domain/StateManagementTypes";
import {SchemaElement} from "../../metatonic-core/src/domain/Schema/SchemaElement";
import {SchemaTypeCategory} from "../../metatonic-core/src/domain/Schema/SchemaEnums";
import {FormProperties} from "../../metatonic-core/src/domain/EditorModels/FormProperties";
import {formReduce} from "./PrimaryFormReducer";
import {getEditorResolverContext} from "../../metatonic-core/src/services/EditorResolver";
import {fetchInitialFormState} from "../../metatonic-core/src/services/fetchFormState";

let identity = 0;

export type MetatonicContextInitializer = {
    componentRegistry?: ComponentRegistry;
    dataStore?: PersistantDataStore;
}

type Map<T> = { [key:string]: T };
let defaultDataStore = (apiUrl = '/api') => new RestDataStore(apiUrl)
let defaultContextInitializer = (apiUrl = '/api') =>
    <MetatonicContextInitializer>{ componentRegistry: defaultComponentRegistry, dataStore: defaultDataStore() };

class MetatonicReduxContextInstance extends MetatonicBaseContext implements  MetatonicReduxContext{
    constructor(app: MetatonicReduxApp, componentRegistry: ComponentRegistry, dataStore: PersistantDataStore) {
        super(app, componentRegistry, dataStore);
    }

    app: MetatonicReduxApp;

    createFormReducer(formId: any): (state: FormState, action: MetatonicRootAction) => FormState {
        return formReduce(formId);
    }

    mapStateToProps(formState: FormState): FormProperties {
        return {
            editors: getEditorResolverContext(this.componentRegistry, formState.schema),
            schema: formState.schema,
            formState: formState.formState,
            recordName: formState.schema.typeName,
            formData: formState.formData,
            formName: '',
            title: '',
            recordId: formState.formData['id']
        } as FormProperties;
    }

    mapStateToDispatch(formId: string):
        (dispatch: (action: MetatonicRootAction) => void) =>
            { onFormEvent: (action: MetatonicRootAction) => void; } {
        return (dispatch: (action: MetatonicRootAction) => void) => (
            { onFormEvent:(action: MetatonicRootAction) => dispatch(action) }
        );
    }

    async loadForm(formId: any, recordName: any, recordId: any) {
        let form = await fetchInitialFormState(this, recordName, recordId);
        // TODO: Something
    }

}

class MetatonicReduxAppInstance implements MetatonicReduxApp {
    public appStore: Store<any>;
    public appDispatcher: AppDispatcher;
    public contexts: Map<MetatonicReduxContext>
    constructor(contextsOrContext: MetatonicContextInitializer| Map<MetatonicContextInitializer> = defaultContextInitializer()) {
        let context = contextsOrContext as MetatonicContextInitializer;
        let contexts = contextsOrContext as Map<MetatonicContextInitializer>
        let isContext = context.componentRegistry || context.componentRegistry;
        this.contexts = (isContext ? { default: this.createContext(context) } : this.createContexts(contexts));
    }

    private createContexts(contexts: Map<MetatonicContextInitializer>) {
        return Object.keys(contexts).reduce((result, key) => Object.assign({ [key]: contexts[key] }, result), {});
    }

    private createContext(initializer: MetatonicContextInitializer) {
        return new MetatonicBaseContext(this, initializer.componentRegistry||defaultComponentRegistry, initializer.dataStore||defaultDataStore())
    }

    reduxMiddleware(store: Store<any>) {
        this.appStore = store;
        this.appDispatcher = store;
        return next => action => next(action);
    }
}

export function createMetatonicReduxApp(options: {
    dataStore?: PersistantDataStore,
    dataStores?: PersistantDataStore,
    componentRegistry?: ComponentRegistry
    componentRegistries?: Map<ComponentRegistry>
    contexts?: Map<MetatonicContextInitializer>
}){
    let o = options;
    let hasDefaultContext = o.dataStore && o.componentRegistry;
    let getAllKeys = (...maps: any[]) => maps.reduce((keys, map) => new Set([...keys, Object.keys(map)]), new Set());
    let allKeys = getAllKeys(o.dataStores, o.contexts, o.componentRegistries, hasDefaultContext ? { default: {} } : {});
    let getContext = (key) =>
        o.contexts && o.contexts[key] || {
            componentRegistry: o.componentRegistries && o.componentRegistries[key] || o.componentRegistry,
            dataStore: o.dataStores && o.dataStores[key] || o.dataStore
        }
    let contexts = allKeys.entries().reduces((contexts, key) => Object.assign(getContext(key), contexts), {});
    return new MetatonicReduxAppInstance(contexts);
}