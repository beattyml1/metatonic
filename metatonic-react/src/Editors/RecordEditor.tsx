import * as React from "react";
import {FieldEditor} from "./FieldEditor";
import {BaseEditorModel, createContext, editorFor, RecordSchemaType, SchemaRecordTypeParameters} from "metatonic-core";
import FieldSet from "../LabeledFieldContainers/FieldSet";
import {BaseRecordEditor} from "./BaseRecordEditor";
import {fieldEditorClasses} from "metatonic-core";
import {getChildFieldProps} from "metatonic-core";

export type RecordParams = BaseEditorModel<any>;
export type RecordMultiParams = BaseEditorModel<any[]>;

@editorFor("Record", FieldSet, {isDefault: true})
export class RecordEditor extends BaseRecordEditor<{[key:string]:any}, BaseEditorModel<RecordSchemaType>, {}> {
    render() {
        let recordType = this.props.field.type.parameters as SchemaRecordTypeParameters;
        let fields = recordType.fields;
        let fieldEditors = fields.map(field =>
            <FieldEditor {...getChildFieldProps(this.props, field)} />);

        return (<div className={fieldEditorClasses(this.field())}>{fieldEditors}</div>)
    }
}



