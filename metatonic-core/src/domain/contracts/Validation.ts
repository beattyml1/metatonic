
import {SchemaField} from "../Schema/Records";
import {ValidationSeverity, ValidationTime} from "../Schema/SchemaValidation";
import {SchemaValidation} from "../Schema/SchemaValidation";

export interface ValidationMessageDetailed { message: string, severity: ValidationSeverity }
export type ValidationMessage = string | ValidationMessageDetailed;
export type ValidationResults = ValidationMessage | ValidationMessage[];

export type Validation<T = any> =
    (value: any, field: SchemaField, validation: SchemaValidation, time: ValidationTime, params?: T) => ValidationResults


