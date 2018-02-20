import {RecordSchemaType, SchemaField, SchemaRecordTypeParameters} from "../domain/Schema/Records";
import {ComponentContext} from "../domain/EditorModels/Context";
import {hasValue} from "../extensions/hasValue";
import {getAllWithValue} from "./ContextService";
import {SchemaTypeCategory} from "../domain/Schema/SchemaEnums";

export function getUniqueId(field: SchemaField, context: ComponentContext) {
    let indexes = getAllRepeaterIndexes(context);
    return indexes.concat(field.uiUniqueId).reverse().join('r')
}

function getFieldUniqueId(parentId: string, index) {
    return parentId ? `${parentId}f${index}` : `f${index}`;
}

function setFieldUniqueId(field: SchemaField, parentId: string, index) {
    let uniqueId = getFieldUniqueId(parentId, index);
    let withUniqueId = Object.assign(field, { uiUniqueId: uniqueId };

    let isRecord = field.type.category === SchemaTypeCategory.Record;

    return isRecord ? addUniqueIdsToChildren(withUniqueId, uniqueId) : withUniqueId;
}

export function addUniqueIdsToChildren(field: SchemaField, parentId: string) {
    let type = field.type.parameters as SchemaRecordTypeParameters;
    let fields = type.fields;

    return Object.assign(field, {
        type: Object.assign(field.type, {
            parameters: Object.assign(field.type.parameters, {
                fields: fields.map((f, i) =>
                    setFieldUniqueId(f, parentId, i))
            })
        })
    })
}

function getAllRepeaterIndexes(context: ComponentContext) {
    return getAllWithValue(context, _=>_.repeaterIndex)
}