import {Store} from "redux";
import {AllMetatonicEvents, FormState, MetatonicRootAction} from "metatonic-core";
import {AppDispatcher} from "metatonic-core";
import {MetatonicBaseContext} from "metatonic-core";
import {defaultComponentRegistry} from "metatonic-core";
import {RestDataStore} from "metatonic-core";
import {
    MetatonicContextInitializer, MetatonicReduxApp, MetatonicReduxContext,
    MetatonicReduxWrappers
} from "./MetatonicReduxApp.interfaces";
import {FormEvents, MetatonicAction} from "metatonic-core";
import {FormProperties} from "metatonic-core";
import {Map} from "./PrivateTypes";
import {MetatonicReduxContextInstance} from "./MetatonicReduxContextInstance";

let defaultDataStore = (apiUrl = '/api') => new RestDataStore(apiUrl)
let defaultContextInitializer = (apiUrl = '/api') =>
    <MetatonicContextInitializer>{ componentRegistry: defaultComponentRegistry, dataStore: defaultDataStore() };

export class MetatonicReduxAppInstance implements MetatonicReduxApp {
    public appStore: Store<any>;
    public appDispatcher: AppDispatcher;
    public contexts: Map<MetatonicReduxContext>
    constructor(contextsOrContext: MetatonicContextInitializer| Map<MetatonicContextInitializer> = defaultContextInitializer(), public wrappers: (context: MetatonicReduxContext) => MetatonicReduxWrappers) {
        let context = contextsOrContext as MetatonicContextInitializer;
        let contexts = contextsOrContext as Map<MetatonicContextInitializer>
        let isContext = context.componentRegistry || context.componentRegistry;
        this.contexts = (isContext ? { default: this.createContext(context) } : this.createContexts(contexts));
    }

    private createContexts(contexts: Map<MetatonicContextInitializer>) {
        return Object.keys(contexts).reduce((result, key) => Object.assign({ [key]: contexts[key] }, result), {});
    }

    private createContext(initializer: MetatonicContextInitializer) {
        return new MetatonicReduxContextInstance(this, initializer.componentRegistry||defaultComponentRegistry, initializer.dataStore||defaultDataStore(), this.wrappers)
    }

    reduxMiddleware = (store: Store<any>) => {
        this.appStore = store;
        this.appDispatcher = store;

        return next => (action: MetatonicRootAction) => {

            next(action);
        }
    }
}