import {MetatonicFormEventDispatcher} from "./contracts/MetatonicFormEventDispatcher";
import {EditorResolver} from "../services/EditorResolver";

export interface MetatonicResources {
    formDispatcher: MetatonicFormEventDispatcher;
    editors: EditorResolver<any, any, any>;
};