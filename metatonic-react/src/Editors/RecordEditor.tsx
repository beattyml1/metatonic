import * as React from "react";
import {FieldEditor} from "./FieldEditor";
import {BaseEditorModel, createContext, editorFor, RecordSchemaType, SchemaRecordTypeParameters} from "metatonic-core";
import FieldSet from "../LabeledFieldContainers/FieldSet";
import {BaseRecordEditor} from "./BaseRecordEditor";
import {field} from "../../../metatonic-core/src/decorators/MetatonicModelDecorator";

export type RecordParams = BaseEditorModel<any>;
export type RecordMultiParams = BaseEditorModel<any[]>;

@editorFor("Record", FieldSet, {isDefault: true})
export class RecordEditor extends BaseRecordEditor<{[key:string]:any}, BaseEditorModel<RecordSchemaType>, {}> {
    render() {
        let recordType = this.props.field.type.parameters as SchemaRecordTypeParameters;
        let fields = recordType.fields;
        let fieldEditors = fields.map(field =>
            <FieldEditor
                value={this.props.value[field.name]}
                field={field}
                context={createContext(field, this.props.context)}
                fieldState={this.props.fieldState.children[field.name]}
                globals={this.props.globals}
            />
        );
        //fieldEditors.forEach(console.log);
        return (<div>{fieldEditors}</div>)
    }
}



