import {Nullable} from "../../CoreTypes";
import {FormSchema} from "../Schema/RootSchemas";
import {FormProperties} from "../EditorModels/FormProperties";

export interface MetatonicFormEventDispatcher {
    propertyChanged(propertySelector: string, value);
    itemAdded(propertySelector: string, item, index?: Nullable<number>);
    itemRemoved(propertySelector: string, index: number);
    propertiesChanged(properties: { property: string, value: any }[]);
    formServerUpdate(formData: any);
    fullReload(formData: any, schema: FormSchema);
    trySubmit();
    loadFormFromServer(formProps: FormProperties);
}