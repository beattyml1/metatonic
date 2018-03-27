import {FormState} from "./StateManagementTypes";
import {MetatonicFormEventDispatcher} from "./contracts/MetatonicFormEventDispatcher";
import {AppDispatcher} from "./contracts/AppDispatcher";
import {EditorResolver} from "../services/EditorResolver";
import {Store, Unsubscribe} from "redux";

export type MetatonicResources = {
    formStore: Store<FormState>;
    appStore: { getState: () => FormState, subscribe: (listener: () => void) => Unsubscribe };
    formDispatcher: MetatonicFormEventDispatcher;
    appDispatcher: AppDispatcher;
    editors: EditorResolver<any, any, any>;
};