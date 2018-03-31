
import {Nullable} from "../../CoreTypes";
import {FormSchema} from "../Schema/RootSchemas"

export type PropertyChangedActionPayload = { propertySelector: string, value }
export type ItemAddedActionPayload = { propertySelector: string, item, index?: Nullable<number> };
export type ItemRemovedActionPayload = { propertySelector: string, index: number };
export type PropertiesChangedActionPayload = { properties: { property: string, value: any }[] };
export type LocalUpdateActionPayload = { formData: any };
export type LocalReloadActionPayload = { formData: any, schema: FormSchema };
export type TrySubmitActionPayload = {  };
export type LoadDataFromServerActionPayload = { recordName: string, recordId }
