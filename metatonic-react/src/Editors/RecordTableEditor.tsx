import * as React from "react";
import {SchemaRecordTypeParameters} from "metatonic-core";
import {RecordMultiParams} from "./RecordEditor";
import {FieldCell} from "./FieldEditor";
import {createContext, RecordSchemaType, BaseEditorModel, SchemaField, fieldEditorClasses} from "metatonic-core";
import {BaseEditor} from "./BaseEditor";
import {} from 'metatonic-core/'

export class RecordMultiEditor extends BaseEditor<{[key:string]:any}[], SchemaRecordTypeParameters, BaseEditorModel<any>> {
    render() {
        let fields = this.type().fields;
        return (
            <div className={`data-grid ${fieldEditorClasses(this.field())}`}>
                <div className="data-grid-buttons">
                    <button onClick={this.add}>Add</button>
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

    row(record, rowIndex) {
        return (
        <tr>
            {this.getCells(record, rowIndex)}
            <td>
                <button type="button" onClick={() => this.remove(rowIndex)}>Remove</button>
                {/*<button type="button" onClick={() => this.edit(rowIndex, record)}>Edit</button>*/}
            </td>
        </tr>);
    }

    cell(record, field: SchemaField, rowIndex, columnIndex) {
        return (
            <td>
                <FieldCell value={record} field={field}
                           context={createContext(field, this.props.context, columnIndex)}
                           fieldState={this.props.fieldState.children[rowIndex][field.name]}
                           globals={this.props.globals}/>
            </td>
        );
    }

    getCells(record, rowIndex) {
        return this.type().fields.map((field, columnIndex) => this.cell(record, field, rowIndex, columnIndex))
    }

    edit(rowIndex, record) {

    }

    remove(rowIndex) {
        this.store().itemRemoved(this.fieldLocator(), rowIndex);
    }

    add() {
        this.store().itemAdded(this.fieldLocator(), {});
    }
}