import {BaseEditorModel} from "../domain/EditorModels/BaseEditorModel";
import {SchemaField} from "../domain/Schema/Records";
import {createContext} from "./ContextService";

export function getChildFieldProps<T = any>(props: BaseEditorModel<T>, field: SchemaField) {
    return {
        value: props.value[field.name],
        field: field,
        context: createContext(field, props.context),
        fieldState: props.fieldState.children[field.name],
        resources: props.resources,
    }
}

export function getChildCellProps<T = any>(props: BaseEditorModel<T>, field: SchemaField, rowIndex: number) {
    return {
        value: props.value[field.name],
        field: field,
        context: createContext(field, props.context, rowIndex),
        fieldState: props.fieldState.children[rowIndex][field.name],
        resources: props.resources,
    }
}