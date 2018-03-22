import {PersistantDataStore} from "../../state/PersistantDataStore";
import {EditorResolver} from "../../services/EditorResolver";

export type FormProperties<T extends {} = any> = {
    formName?: string,
    recordName: string,
    recordId?: string,
    title?: string,
    formData?: T;
    dataStore: PersistantDataStore
    editors: EditorResolver<any, any, any>;
    afterLoad?: () => void
}