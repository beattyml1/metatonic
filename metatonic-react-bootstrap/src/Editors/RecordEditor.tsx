import * as React from "react";
import {FieldCell, FieldEditor} from "./FieldEditor";
import {BaseEditorModel} from "metatonic-core";
import {createContext, editorFor} from "metatonic-core";
import {RecordSchemaType} from "metatonic-core";
import FieldSet from "../LabeledFieldContainers/FieldSet";
import {BaseRecordEditor} from "./BaseRecordEditor";
import {SchemaRecordTypeParameters} from "metatonic-core";
import * as mtcore from 'metatonic-core';

export type RecordParams = BaseEditorModel<any>;
export type RecordMultiParams = BaseEditorModel<any[]>;

@editorFor("record", FieldSet, {isDefault: true})
export class RecordEditor extends BaseRecordEditor<{[key:string]:any}, BaseEditorModel<RecordSchemaType>, void> {
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



export class RecordMultiEditor extends React.Component<RecordMultiParams, void> {
    render() {
        let recordType = this.props.field.type.parameters as SchemaRecordTypeParameters;
        let fields = recordType.fields;
        return (
            <table>
                <thead>
                    <tr>
                        {fields.map(field =>
                            <th>{field.label}</th>
                        )}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {this.props.value.map((record, rowIndex) =>
                    <tr>
                        {fields.map((field, columnIndex) =>
                            <td>
                                <FieldCell value={record} field={field} context={createContext(field, this.props.context, columnIndex)} fieldState={this.props.fieldState.children[rowIndex][field.name]} globals={this.props.globals}/>
                            </td>
                        )}
                        <td>
                            <button type="button" onClick={() => this.remove(record)}>Remove</button>
                            <button type="button" onClick={() => this.edit(record)}>Edit</button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        )
    }

    edit(record) {

    }

    remove(record) {

    }
}
