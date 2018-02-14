import * as React from "react";
import {FieldEditor} from "./FieldEditor";
import {BaseEditorModel, createContext, editorFor, RecordSchemaType, SchemaRecordTypeParameters} from "metatonic-core";
import FieldSet from "../LabeledFieldContainers/FieldSet";
import {BaseRecordEditor} from "./BaseRecordEditor";

export type RecordParams = BaseEditorModel<any>;
export type RecordMultiParams = BaseEditorModel<any[]>;

@editorFor("record", FieldSet, {isDefault: true})
export class RecordEditor extends BaseRecordEditor<{[key:string]:any}, BaseEditorModel<RecordSchemaType>, {}> {
    render() {
        let recordType = this.props.field.type.parameters as SchemaRecordTypeParameters;
        let fields = recordType.fields;
        return (<div>{
            fields.map(field =>
                <FieldEditor
                    value={this.props.value[field.name]}
                    field={field}
                    context={createContext(field, this.props.context)}
                    fieldState={this.props.fieldState.children[field.name]}
                    globals={this.props.globals}
                />
            )}
        </div>)
    }
}



