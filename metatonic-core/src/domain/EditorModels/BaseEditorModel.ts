import {SchemaField} from "../Schema/Records";
import {ComponentContext} from "./Context";
import {FieldState} from "Domain/FieldState/FieldState";

export type BaseEditorModel<T> = {
    value: T;
    field: SchemaField;
    context: ComponentContext;
    fieldState: FieldState;
}

export type SingleInputEditorModel<T> = BaseEditorModel<T> & {
    displayText: string;
    editText: string;
    htmlType: string;
}