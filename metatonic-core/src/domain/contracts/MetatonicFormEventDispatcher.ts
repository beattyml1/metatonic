import {Nullable} from "../../CoreTypes";
import {FormSchema} from "../Schema/RootSchemas";
import {MetatonicResources} from "../MetatonicResources";


export interface MetatonicFormEventDispatcher {
    propertyChanged(payload: { propertySelector: string, value });
    itemAdded(payload: { propertySelector: string, item, index?: Nullable<number> });
    itemRemoved(payload: { propertySelector: string, index: number });
    propertiesChanged(payload: { properties: { property: string, value: any }[] });
    localUpdate(payload: { formData: any });
    localReload(payload: { formData: any, schema: FormSchema, resources: MetatonicResources });
    trySubmit(payload?: { });
}