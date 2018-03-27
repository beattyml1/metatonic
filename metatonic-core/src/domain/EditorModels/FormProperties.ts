import {PersistantDataStore} from "../../state/PersistantDataStore";
import {EditorResolver} from "../../services/EditorResolver";
import {MetatonicResources} from "../MetatonicResources";

export type FormBaseProperties<T extends {} = any> = {
    formName?: string,
    recordName: string,
    recordId?: string,
    title?: string,
    formData?: T;
    afterLoad?: () => void
}

export type FormProperties<T extends {} = any> = FormBaseProperties & {
    resources: MetatonicResources;
}