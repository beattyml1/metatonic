import * as React from "react";
import {SchemaRecordTypeParameters,multiEditorFor} from "metatonic-core";
import {RecordMultiParams} from "./RecordEditor";
import {FieldCell} from "./FieldEditor";
import {createContext, RecordSchemaType, BaseEditorModel, SchemaField, fieldEditorClasses} from "metatonic-core";
import {BaseEditor} from "./BaseEditor";
import {} from 'metatonic-core/'
import {getChildCellProps} from "metatonic-core";
import FieldSet from "../LabeledFieldContainers/FieldSet";
import {getDefaultDataForField} from "metatonic-core";

@multiEditorFor("Record", FieldSet, { uiHint: 'table' })
export class RecordMultiEditor extends BaseEditor<{[key:string]:any}[], SchemaRecordTypeParameters, BaseEditorModel<any>> {
    render() {
        let fields = this.type().fields;
        return (
            <div className={`data-grid ${fieldEditorClasses(this.field())}`}>
                <div className="data-grid-buttons">
                    <button onClick={this.add} type="button">Add</button>
                </div>
                <table>
                    <thead>
                    <tr>
                        {fields.map(this.headerCell)}
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.value.map(this.row)}
                    </tbody>
                </table>
            </div>
        )
    }

    headerCell(field: SchemaField) {
        return <th>{field.label}</th>
    }

    row = (record, rowIndex) => {
        let context = createContext(this.field(), this.props.context, rowIndex)
        return (
        <tr>
            {this.getCells(record, rowIndex, context)}
            <td>
                <button type="button" onClick={() => this.remove(rowIndex)}>Remove</button>
                {/*<button type="button" onClick={() => this.edit(rowIndex, record)}>Edit</button>*/}
            </td>
        </tr>);
    }

    cell(record, field: SchemaField, rowIndex, columnIndex, context) {
        return (
            <td>
                <FieldCell {...getChildCellProps(this.props, field, rowIndex, context)} />
            </td>
        );
    }

    getCells(record, rowIndex, context) {
        return this.type().fields.map((field, columnIndex) => this.cell(record, field, rowIndex, columnIndex, context))
    }

    edit = (rowIndex, record) => {

    }

    remove = (rowIndex) => {
        this.formDispatcher().itemRemoved({ propertySelector: this.fieldLocator(), index: rowIndex} );
    }

    add = () =>  {
        this.formDispatcher().itemAdded({ propertySelector: this.fieldLocator(), item: getDefaultDataForField(this.field(), true) });
    }
}