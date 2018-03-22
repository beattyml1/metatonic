import {ComponentContext} from "./Context";
import {FieldState} from "../FieldState/FieldState";
import {SchemaField} from "../Schema/Records";
import {ReduxStateManager} from "../../state/ReduxStateManager";
import {EditorResolver} from "../../services/EditorResolver";
import {MetatonicFormEventDispatcher} from "../contracts/MetatonicFormEventDispatcher";
import {FormState} from "../StateManagementTypes";

export type MetatonicResources = {
    store: { getState: () => FormState };
    dispatcher: MetatonicFormEventDispatcher
    editors: EditorResolver<any, any, any>;
};

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