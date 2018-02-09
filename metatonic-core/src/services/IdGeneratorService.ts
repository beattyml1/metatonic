import {SchemaField} from "../domain/Schema/Records";
import {ComponentContext} from "../domain/EditorModels/Context";
import {hasValue} from "../extensions/hasValue";
import {getAllWithValue} from "./ContextService";

export function getUniqueId(field: SchemaField, context: ComponentContext) {
    let indexes = getAllRepeaterIndexes(context);
    return indexes.concat(field.uiUniqueId).join('--')
}

export function getAllRepeaterIndexes(context: ComponentContext) {
    return getAllWithValue(context, _=>_.repeaterIndex)
}