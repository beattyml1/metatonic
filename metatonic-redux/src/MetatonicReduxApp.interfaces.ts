import {Store} from "redux";
import {AllMetatonicEvents, FormState, MetatonicRootAction} from "metatonic-core";
import {AppDispatcher} from "metatonic-core";
import {PersistantDataStore} from "metatonic-core";
import {ComponentRegistry} from "metatonic-core";
import { MetatonicApp, MetatonicContext} from "metatonic-core";
import {MetatonicReduxApp, MetatonicReduxContext} from "./MetatonicReduxApp.interfaces";
import {FormEvents, MetatonicAction} from "metatonic-core";
import {FormProperties} from "metatonic-core";
import {MetatonicGlobalState} from "metatonic-core";
import {Map} from './PrivateTypes'


export type MetatonicDispatchFunction = (action: MetatonicRootAction) => void;
export type MetatonicFormEventProps = { onFormEvent: (action: MetatonicRootAction) => void; };

export type MetatonicReduxWrappers = {
    action: (action: MetatonicRootAction) => any;
}


export type MetatonicAppConfig = {
    dataStore?: PersistantDataStore,
    dataStores?: Map<PersistantDataStore>,
    componentRegistry?: ComponentRegistry
    componentRegistries?: Map<ComponentRegistry>
    contexts?: Map<MetatonicContextInitializer>
}

export interface MetatonicReduxApp extends MetatonicApp {
    appStore: Store<any>,
    appDispatcher: AppDispatcher;
    contexts: {[key: string]: MetatonicReduxContext }
    reduxMiddleware(store: Store<any>): (next) => (action) => any;
}

export interface MetatonicReduxContext extends MetatonicContext {
    app: MetatonicReduxApp;
    form(formId): MetatonicReduxFormFunctions;
    metatonicReducer(state: MetatonicGlobalState, action: MetatonicRootAction): MetatonicGlobalState;
    registerForm(formId);
}

export interface MetatonicReduxFormFunctions {
    reduce(state: FormState, action: MetatonicAction): FormState;
    mapStateToProps(formState: FormState): FormProperties;
    mapDispatchToProps(dispatch: MetatonicDispatchFunction): MetatonicFormEventProps;
    state(): FormState;
}

export type MetatonicContextInitializer = {
    componentRegistry?: ComponentRegistry;
    dataStore?: PersistantDataStore;
}