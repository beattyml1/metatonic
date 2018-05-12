import {NamedAndLabeled} from "./NamedAndLabeled";
import {SchemaElementId} from "./ID";

export enum ValidationSeverity {
    Info = "info",
    Warning = "warning",
    Error = "error"
}


export enum ValidationTime {
    Save = 1,
    Finalize = 2
}

export type SchemaValidation = {
    id?: SchemaElementId;
    name: string;
    label: string;
    severity?: ValidationSeverity
    time?: ValidationTime
    parameters: any;
}