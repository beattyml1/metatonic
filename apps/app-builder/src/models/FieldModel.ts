import {field, model} from "metatonic-core";
import {SchemaFieldInfo, SchemaEntryType, Maybe} from "metatonic-core";
import {list, select} from "metatonic-core";
import {Validation} from "./ValidationModel";
import {SchemaField} from "metatonic-core";

let fieldId = 0;

//@model('Field')
export class Field implements SchemaFieldInfo {
    @field("text", "Name", { required: true })
    name: string = '';
    hasUserChangedName = false;

    id = `field-${fieldId++}`
    uiUniqueId = `field-${fieldId++}`

    //@field("text", "Label", { required: true })
    label: string = '';

    //@select("Record|ValueTypes", "Type", { required: true })
    typeName: string = 'text';

    //@field("code", "Type", { required: true })
    entryType?: SchemaEntryType = SchemaEntryType.entry;

    //@field("boolean", "Multiple", { required: true })
    multiple: boolean = false;

    //@list("Validation", "Validations")
    validations: Validation[] = [];

    //@field("boolean", "Required", { required: true })
    required: boolean = false;

    //@field("numeric", "Max Length", { required: false })
    maxLength?: number = undefined;

    //@field("numeric", "Max", { required: false })
    max?: string = undefined;

    //@field("numeric", "Min", { required: false })
    min?: string = undefined;

    //@field("boolean", "Can Add", { required: false })
    canAdd?: boolean = false;

    //@field("boolean", "Can Add", { required: false })
    canEditSelection?: boolean = false;

    //@field("text", "UI Preference", { required: false })
    uiControlPreference?: string;
}