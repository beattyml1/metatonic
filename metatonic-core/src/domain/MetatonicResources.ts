import {FormState} from "./StateManagementTypes";
import {MetatonicFormEventDispatcher} from "./contracts/MetatonicFormEventDispatcher";
import {AppDispatcher} from "./contracts/AppDispatcher";
import {EditorResolver} from "../services/EditorResolver";
import {Store, Unsubscribe} from "redux";

export type MetatonicResources = {
    formDispatcher: MetatonicFormEventDispatcher;
    editors: EditorResolver<any, any, any>;
};