import {RecordSchemaType, SchemaField, SchemaType} from "../domain/Schema/Records";
import {hasValue} from "../extensions/hasValue";
import {builtInValidations, max, maxLength, min, required} from "./BuiltInValidations";
import {SchemaTypeCategory} from "../domain/Schema/SchemaEnums";

function uniqueItems(array: any[]) {
    return array.reduce((uniqueItems, item) => uniqueItems.contains(item) ? uniqueItems : uniqueItems.concat(item), []);
}

export function getValidationMessages(field: SchemaField, value, recursive: boolean = false) {
    let builtInMessages = builtInValidations.reduce((messages, validation) =>
        messages.concat(validation(value, field.type, field)), new Array<string>());

    return recursive ? builtInMessages.concat(getChildValidationMessages(field,value)) : builtInMessages;
}

function  getChildValidationMessages(field: SchemaField, value) {
    if (field.type.category !== SchemaTypeCategory.Record) return [];

    let type = field.type as RecordSchemaType;

    return type.parameters.fields.reduce((messages, field) =>
        messages.concat(getValidationMessages(value, field, true)), new Array<string>())
}

