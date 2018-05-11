import {BaseEditorModel} from "../domain/EditorModels/BaseEditorModel";
import {SchemaField} from "../domain/Schema/Records";
import {createContext} from "./ContextService";
import {ComponentContext} from "../domain/EditorModels/Context";
import {FieldState} from "../domain/FieldState/FieldState";

export function getChildFieldProps<T = any>(props: BaseEditorModel<T>, field: SchemaField) {
    return {
        value: props.value[field.name],
        field: field,
        context: createContext(field, props.context) as ComponentContext,
        fieldState: props.fieldState.children[field.name] as FieldState,
        resources: props.resources,
    } as BaseEditorModel<any>
}

export function getChildCellProps<T = any>(props: BaseEditorModel<T>, field: SchemaField, rowIndex: number) {
    return {
        value: props.value[field.name],
        field: field,
        context: createContext(field, props.context, rowIndex) as ComponentContext,
        fieldState: props.fieldState.children[rowIndex][field.name] as FieldState,
        resources: props.resources,
    } as BaseEditorModel<any>
}