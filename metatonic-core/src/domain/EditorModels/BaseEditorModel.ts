import {ComponentContext} from "./Context";
import {FieldState} from "../FieldState/FieldState";
import {SchemaField} from "../Schema/Records";
import {MetatonicResources} from "../MetatonicResources";

export type BaseEditorModel<T> = {
    value: T;
    field: SchemaField;
    context: ComponentContext;
    fieldState: FieldState;
    resources: MetatonicResources;
}

export type SingleInputEditorModel<T> = BaseEditorModel<T> & {
    displayText: string;
    editText: string;
    htmlType: string;
}