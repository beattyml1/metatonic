
import {list,SchemaElement,SchemaTypeInfo,SchemaTypeCategory} from "metatonic-core";
import {Field} from "./FieldModel";
let id = 0
//@model('Record')
export class Record implements SchemaElement {
    id = `record-${id++}`;

    //@field("text", "Name", { required: true })
    name: string = '';

    //@field("text", "Label", { required: true })
    label: string = '';

    hasUserChangedName = false;

    //@list('Field', 'Fields')
    fields: Field[] = [];

    //@field("text", "UI Preference", { required: false })
    uiControlPreference?: string = '';
    validations = []
    category= SchemaTypeCategory.Record;
    parentTypeNames = ['Record']
}