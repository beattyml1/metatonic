import {SchemaField} from "domain/Schema/Records";

export type CustomValidation = {
    getMessage: (val, params, field: SchemaField) => string,
    passesValidation: (val, params, field: SchemaField) => boolean
}