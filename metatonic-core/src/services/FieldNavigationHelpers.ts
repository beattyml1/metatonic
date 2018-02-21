import {RecordSchemaType} from "../domain/Schema/Records";
import {isNumeric} from "../extensions/Number";

export function findField(type: RecordSchemaType, curKey: string) {
    return type.parameters.fields.find(f => f.name === curKey);
}

export function typeOfField(type: RecordSchemaType, curKey: string) {
    let field = findField(type, curKey);
    return field ? field.type : undefined;
}

export function getPropertyLocatorArray(propertySelector: string) {
    return propertySelector.split('.').map(prop => isNumeric(prop) ? parseFloat(prop) : prop);
}