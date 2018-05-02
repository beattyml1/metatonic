import {field, model} from "metatonic-core";
import {SchemaFieldInfo, SchemaEntryType, Maybe} from "metatonic-core";
import {codeValue, list, select} from "metatonic-core";
import {ValidationSeverity, ValidationTime} from "metatonic-core";

@model('Validation')
export class Validation {
    @codeValue()
    @field("text", "Name", { required: true })
    name: string;

    label: string = "";

    severity?: ValidationSeverity = ValidationSeverity.Error;
    time?: ValidationTime = ValidationTime.Save;

    parameters: any;
}