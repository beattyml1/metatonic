import {field, model} from "metatonic-core";
import {SchemaFieldInfo, SchemaEntryType} from "metatonic-core";
import {list} from "metatonic-core";
import {Field} from "./FieldModel";
let id = 0
//@model('Record')
export class Record {
    id = `record-${id++}`;

    //@field("text", "Name", { required: true })
    name: string = '';

    //@field("text", "Label", { required: true })
    label: string = '';

    //@list('Field', 'Fields')
    fields: Field[] = [];

    //@field("text", "UI Preference", { required: false })
    uiControlPreference?: string = '';
}