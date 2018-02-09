import {ComponentContext} from "./Context";
import {FieldState} from "../FieldState/FieldState";
import {SchemaField} from "../Schema/Records";
import {ReduxStateManager} from "../../state/ReduxStateManager";

export type BaseEditorModel<T> = {
    value: T;
    field: SchemaField;
    context: ComponentContext;
    fieldState: FieldState;
    store: ReduxStateManager;
}

export type SingleInputEditorModel<T> = BaseEditorModel<T> & {
    displayText: string;
    editText: string;
    htmlType: string;
}