import {RecordSchemaType, SchemaField, SchemaType} from "../domain/Schema/Records";
import {hasValue} from "../extensions/hasValue";
import './BuiltInValidations';
import {SchemaTypeCategory} from "../domain/Schema/SchemaEnums";
import {
    ValidationMessage, ValidationMessageDetailed, ValidationResults,
    ValidationTime, ValidationSeverity, SchemaValidation
} from "../domain";
import {globalValidations} from "./CustomValidations";
import {Validation} from "../domain/contracts/Validation";

function uniqueItems(array: any[]) {
    return array.reduce((uniqueItems, item) => uniqueItems.contains(item) ? uniqueItems : uniqueItems.concat(item), []);
}

export function getValidationMessages(field: SchemaField, value, recursive: boolean = false, validationTime?: ValidationTime): ValidationMessageDetailed[] {
    let validationMessages  = getValidationMessagesForField(field, value, validationTime||ValidationTime.Save);
    let allValidationMessage = recursive ? [...validationMessages, ...getChildValidationMessages(field,value)] : validationMessages;

    return allValidationMessage.sort(bySeverityLevel).filter(distinctMessages);
}

function getValidation(name) {
    return globalValidations.getValidation(name) || { validate: (a) => [] } as { validate: Validation };
}

function getValidationMessagesForField(field: SchemaField, value, validationTime: ValidationTime): ValidationMessageDetailed[] {
    return [...field.validations, ...field.type.validations]
        .map(v => ({ ...v, validate: getValidation(v.name).validate }))
        .map(v => formatValidationResults(v.validate(value, field, v, validationTime, v.parameters), v))
        .reduce((allMessages, messagesForValidation) => [...allMessages, ...messagesForValidation], []);
}

const severityLevels = { [ValidationSeverity.Error]: 0, [ValidationSeverity.Warning]: 1, [ValidationSeverity.Info]: 2 }
const bySeverityLevel = (a: ValidationMessageDetailed, b: ValidationMessageDetailed) => severityLevels[a.severity] - severityLevels[b.severity];
const distinctMessages = (message: ValidationMessageDetailed, index, allMessages: ValidationMessageDetailed[]) =>
    allMessages.findIndex(x => x.message === message.message) === index;

function formatMessage(config: SchemaValidation) {
    return (message: ValidationMessage) =>
        typeof message === "string" ? { message, severity: config.severity || ValidationSeverity.Error } : message
}

function formatValidationResults(results: ValidationResults, config: SchemaValidation): ValidationMessageDetailed[] {
    let messages = Array.isArray(results) ? results : [results];
    return messages.map(formatMessage(config))
}

function  getChildValidationMessages(field: SchemaField, value): ValidationMessageDetailed[] {
    if (field.type.category !== SchemaTypeCategory.Record) return [];

    let type = field.type as RecordSchemaType;

    return type.parameters.fields.reduce((messages, field) =>
        messages.concat(getValidationMessages(value, field, true)), new Array())
}

