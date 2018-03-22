import {FormNavigator} from "../services/PropertySelection";
import {FieldState} from "./FieldState/FieldState";
import {FormSchema} from "./Schema/RootSchemas";
import {FormProperties} from "./EditorModels/FormProperties";

export enum StateEvents {
    propertyChanged,
    propertiesChanged,
    formServerUpdate,
    trySubmit,
    itemAdded,
    itemRemoved,
    fullReload
}

export type FormEvent<TData> = { event: StateEvents; data: TData };

export type FormState = {
    formData: any;
    formProps: FormProperties;
    serverDocumentData: any;
    schema: FormSchema;
    formState: FieldState;
    navigator: FormNavigator;
}