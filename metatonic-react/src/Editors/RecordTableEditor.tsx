import * as React from "react";
import {SchemaRecordTypeParameters} from "metatonic-core";
import {RecordMultiParams} from "./RecordEditor";
import {FieldCell} from "./FieldEditor";
import {createContext, RecordSchemaType, BaseEditorModel} from "metatonic-core";
import {BaseEditor} from "./BaseEditor";

export class RecordMultiEditor extends BaseEditor<{[key:string]:any}[], SchemaRecordTypeParameters, BaseEditorModel<any>> {
    render() {
        let recordType = this.props.field.type.parameters as SchemaRecordTypeParameters;
        let fields = recordType.fields;
        return (
            <div className="data-grid">
                <div className="data-grid-buttons">
                    <button onClick={this.add}>Add</button>
                </div>
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
                                    <FieldCell value={record} field={field}
                                               context={createContext(field, this.props.context, columnIndex)}
                                               fieldState={this.props.fieldState.children[rowIndex][field.name]}
                                               globals={this.props.globals}/>
                                </td>
                            )}
                            <td>
                                <button type="button" onClick={() => this.remove(rowIndex)}>Remove</button>
                                {/*<button type="button" onClick={() => this.edit(rowIndex, record)}>Edit</button>*/}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
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