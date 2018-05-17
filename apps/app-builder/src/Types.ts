
import {Field} from "./models/FieldModel";
import {Record} from "./models/RecordModel";

export type AppBuilderState = {
    field: Field,
    record: Record,
    records: Record[]
}

export enum AppBuilderActions {
    RecordPropChange = 'BUILDER__RECORD_PROP_CHANGE',
    RecordEditClick = 'BUILDER__RECORD_EDIT_CLICK',
    RecordAddClick = 'BUILDER__RECORD_ADD_CLICK',
    FieldPropChange = 'BUILDER__FIELD_PROP_CHANGE',
    FieldEditClick = 'BUILDER__FIELD_EDIT_CLICK',
    FieldAddClick = 'BUILDER__FIELD_ADD_CLICK',
};