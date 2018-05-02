import {field, model} from "metatonic-core";
import {SchemaFieldInfo, SchemaEntryType, Maybe} from "metatonic-core";
import {codeValue, list, select} from "metatonic-core";
import {Validation} from "./ValidationModel";

@model('Field')
export class Field {
    @codeValue()
    @field("text", "Name", { required: true })
    name: string;

    @field("text", "Label", { required: true })
    label: string;

    @select("Record|ValueTypes", "Type", { required: true })
    typeName: string;

    @field("code", "Type", { required: true })
    entryType?: SchemaEntryType;

    @field("boolean", "Multiple", { required: true })
    multiple: boolean;

    @list("Validation", "Validations")
    validations: Validation[];

    @field("boolean", "Required", { required: true })
    required: boolean;

    @field("numeric", "Max Length", { required: false })
    maxLength?: Maybe<number>;

    @field("numeric", "Max", { required: false })
    max?: Maybe<number>;

    @field("numeric", "Min", { required: false })
    min?: Maybe<number>;

    @field("boolean", "Can Add", { required: false })
    canAdd?: boolean;

    @field("boolean", "Can Add", { required: false })
    canEditSelection?: boolean;

    @field("text", "UI Preference", { required: false })
    uiControlPreference?: string;
}