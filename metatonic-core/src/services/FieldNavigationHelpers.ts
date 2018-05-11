import {RecordSchemaType, SchemaField, SchemaType} from "../domain/Schema/Records";
import {isNumeric} from "../extensions/Number";
import {Maybe} from "../CoreTypes";

export function findField(type: RecordSchemaType, curKey: string): SchemaField|undefined {
    return type.parameters.fields.find(f => f.name === curKey);
}

export function typeOfField(type: RecordSchemaType, curKey: string): SchemaType|undefined {
    let field = findField(type, curKey);
    return field ? field.type : undefined;
}

export function getPropertyLocatorArray(propertySelector: string) {
    return propertySelector.split('.').map(prop => isNumeric(prop) ? parseFloat(prop) : prop);
}