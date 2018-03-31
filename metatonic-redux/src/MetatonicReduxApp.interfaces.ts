import {Store} from "redux";
import {MetatonicRootAction} from "metatonic-core";
import {MetatonicApp, MetatonicContext, MetatonicGlobalState} from "metatonic-core.interfaces";
import {AppDispatcher} from "metatonic-core";

export interface MetatonicReduxApp extends MetatonicApp {
    appStore: Store<any>,
    appDispatcher: AppDispatcher;

    reduxMiddleware(store: Store<any>): (next) => (action) => any;
}

export interface MetatonicReduxContext extends MetatonicContext {
    app: MetatonicReduxApp
}