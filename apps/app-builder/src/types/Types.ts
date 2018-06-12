
import {Field} from "../models/FieldModel";
import {Record} from "../models/RecordModel";

export type AppBuilderState = {
    field: Field,
    record: Record,
    records: Record[]
}

export enum AppBuilderActions {
    AddField = 'BUILDER__ADD_FIELD',
    EditField = 'BUILDER__EDIT_FIELD',
    StylesApplied = 'STYLES__APPLY',
    StyleEditorLoaded = "STYLES__EDITOR_LOAD",
    StylesChanged = "STYLES__STYLES_CHANGED",
    RecordPropChange = 'BUILDER__RECORD_PROP_CHANGE',
    RecordEditClick = 'BUILDER__RECORD_EDIT_CLICK',
    RecordAddClick = 'BUILDER__RECORD_ADD_CLICK',
    RecordARemoveClick = 'BUILDER__RECORD_REMOVE_CLICK',
    FieldPropChange = 'BUILDER__FIELD_PROP_CHANGE',
    FieldEditClick = 'BUILDER__FIELD_EDIT_CLICK',
    FieldAddClick = 'BUILDER__FIELD_ADD_CLICK',
    FieldRemoveClick = 'BUILDER__FIELD_REMOVE_CLICK',

};