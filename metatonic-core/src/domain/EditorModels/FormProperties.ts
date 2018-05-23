import {PersistentDataStore} from "../../state/PersistentDataStore";
import {EditorResolver} from "../../services/EditorResolver";
import {MetatonicResources} from "../MetatonicResources";
import {FormSchema, Schema} from "../Schema/RootSchemas";
import {MetatonicApp, MetatonicContext} from "../../MetatonicApp.interfaces";
import {FieldState} from "../FieldState/FieldState";
import {FormAction} from "../StateManagementTypes";

export type FormProperties<T extends {} = any> =  {
    formName?: string,
    recordName?: string,
    recordId?: string,
    title?: string,
    formData?: T;
    schema?: FormSchema;
    onFormEvent: (event: FormAction) => void
    formState: FieldState;
    editors?: EditorResolver<any, any, any>;
}