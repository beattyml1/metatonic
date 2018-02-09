import {SchemaField, SchemaType} from "../domain/Schema/Records";
import {hasValue} from "../extensions/hasValue";
import {max, maxLength, min, required} from "./Validations";

function uniqueItems(array: any[]) {
    return array.reduce((uniqueItems, item) => uniqueItems.contains(item) ? uniqueItems : uniqueItems.concat(item), []);
}

export function runFieldValidations(field?: SchemaField, value?: any) {
    if (!field) return [];
    return uniqueItems([
        ...(runCustomTypeValidations(field.type)),
        doValidation(field, field.min, field.type.parameters["min"], m => min(m, value), `${field.label} must be at least ${min}`),
        doValidation(field, field.max, field.type.parameters["max"], m => max(m, value), `${field.label} must be at most ${max}`),
        doValidation(field, field.max, field.type.parameters["maxLength"], m => maxLength(m, value), `${field.label} must be at most ${maxLength}`),
        doValidation(field, field.required, field.type.parameters["required"], m => required(value), `${field.label} is required`)
    ].filter(x => x !== null));
}

export function runCustomTypeValidations(type: SchemaType) {
    return [];
}

function passesValidation(first, second, callback: (x) => boolean) {
    return hasValue(first) ? callback(first) : hasValue(second) ? callback(second) : true;
}

function doValidation(field: SchemaField, first, second, callback: (x) => boolean, message: string) {
    return passesValidation(first, second, callback) ? null : message;
}