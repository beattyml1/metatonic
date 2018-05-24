import * as React from "react";
import {SchemaRecordTypeParameters,multiEditorFor} from "metatonic-core";
import {FieldCell} from "./FieldEditor";
import {createContext, RecordSchemaType, BaseEditorModel, SchemaField, fieldEditorClasses} from "metatonic-core";
import {BaseEditor} from "./BaseEditor";
import {getChildCellProps} from "metatonic-core";
import FieldSet from "../LabeledFieldContainers/FieldSet";
import {getDefaultDataForField} from "metatonic-core";
import {ButtonGroup} from "../SupportingControls/ButtonGroup";
import {Button} from "../SupportingControls/Button";

@multiEditorFor("Record", FieldSet, { uiHint: 'table' })
export class RecordMultiEditor extends BaseEditor<{[key:string]:any}[], SchemaRecordTypeParameters, BaseEditorModel<any>, { isEditing, itemEditing }> {
    render() {
        let fields = this.type().fields;
        return (
            <div className={`data-grid ${fieldEditorClasses(this.field())}`}>
                <div className="data-grid-buttons">

                </div>
                <table>
                    <thead>
                    <tr>
                        {fields.map(this.headerCell)}
                        <th><Button onClick={this.add} type="button">Add {this.type().label}</Button></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.value.map(this.row)}
                    </tbody>
                    <tfoot>
                    <tr>
                        {fields.map(f=><th></th>)}
                        <th><Button onClick={this.add} type="button">Add {this.type().label}</Button></th>
                    </tr>
                    </tfoot>
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
                <ButtonGroup actions={[
                    { label: 'Edit', onClick: () => this.edit(rowIndex, record) },
                    { label: 'Remove', onClick: () => this.remove(rowIndex) }
                ]}/>
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