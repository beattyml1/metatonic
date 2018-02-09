import {ComponentContext} from "./Context";
import {FieldState} from "../FieldState/FieldState";
import {SchemaField} from "../Schema/Records";
import {ReduxStateManager} from "../../state/ReduxStateManager";
import {EditorResolver} from "../../services/EditorContext";

export type BaseEditorModel<T> = {
    value: T;
    field: SchemaField;
    context: ComponentContext;
    fieldState: FieldState;
    globals: {
        store: ReduxStateManager;
        editors: EditorResolver<any, any, any>;
    };
}

export type SingleInputEditorModel<T> = BaseEditorModel<T> & {
    displayText: string;
    editText: string;
    htmlType: string;
}