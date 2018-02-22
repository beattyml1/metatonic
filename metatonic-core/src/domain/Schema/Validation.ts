
import {SchemaField, SchemaType} from "./Records";

export type Validation<T = void> =
    (value: any, type: SchemaType, field: SchemaField, config?: ValidationConfig, params?: T) => string[]

export enum ValidationSeverity {
    Info,
    Warning,
    Error
}

export enum ValidationTime {
    Save,
    Finalize
}

export type ValidationConfig = {
    severity: ValidationSeverity
    time: ValidationTime
}

