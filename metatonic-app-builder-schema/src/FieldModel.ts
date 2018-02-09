import {field, model} from "metatonic-schema-from-ts/src/index";
import {SchemaFieldInfo, SchemaEntryType, Maybe} from "metatonic-core/src/index";

@model
export class Field {
    @field("text", "Name", SchemaEntryType.entry, { required: true })
    name: string;

    @field("text", "Label", SchemaEntryType.entry, { required: true })
    label: string;

    @field("code", "Type", SchemaEntryType.selection, { required: true })
    typeName: string;

    @field("code", "Type", SchemaEntryType.selection, { required: true })
    entryType?: SchemaEntryType;

    @field("boolean", "Multiple", SchemaEntryType.entry, { required: true })
    multiple: boolean;

    @field("boolean", "Required", SchemaEntryType.entry, { required: true })
    required: boolean;

    @field("numeric", "Max Length", SchemaEntryType.entry, { required: false })
    maxLength?: Maybe<number>;

    @field("numeric", "Max", SchemaEntryType.entry, { required: false })
    max?: Maybe<number>;

    @field("numeric", "Min", SchemaEntryType.entry, { required: false })
    min?: Maybe<number>;

    @field("boolean", "Can Add", SchemaEntryType.entry, { required: false })
    canAdd?: boolean;

    @field("boolean", "Can Add", SchemaEntryType.entry, { required: false })
    canEditSelection?: boolean;

    @field("text", "UI Preference", SchemaEntryType.entry, { required: false })
    uiControlPreference?: string;
}