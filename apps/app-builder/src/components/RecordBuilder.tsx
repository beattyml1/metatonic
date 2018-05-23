import * as React from 'react'
import {Field} from "../models/FieldModel";
import {connect} from "react-redux";
import {Record} from '../models/RecordModel'
import {TypeSelector} from "./TypeSelector";
import {FieldBuilderBound} from "./FieldBuilder";
import {AppBuilderActions} from "../Types";
import {ButtonGroup} from "metatonic-react/lib/controls";

export type RecordBuilderProps= {
    record: Record
    records: Record[]
}


export type RecordBuilderEvents = {
    onRecordPropChange(recordName, propName, value)
    onFieldRemoveClick(field: Field)
    onFieldPropChange(recordName, fieldName, propName, value, index, category)
    onFieldEditClick(field: Field)
    onFieldAddClick()
}

export class RecordBuilder extends React.Component<RecordBuilderEvents & RecordBuilderProps, any> {
    render() {
        return this.props.record ? (
            <div className="record-builder">
                <div className={"field-grid-layout"}>
                    <label>
                        Label
                        <input value={this.props.record.label} onChange={this.onRecordPropChange('label')} />
                    </label>
                    <label>
                        Name
                        <input value={this.props.record.name} onChange={this.onRecordPropChange('name')} />
                    </label>
                </div>
                <fieldset>
                    <legend>Fields</legend>
                    <table>
                        <thead>
                        <tr>
                            <th>Label</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>List</th>
                            <th>Required</th>
                            <th>Max Length</th>
                            <th>Max #</th>
                            <th>Min #</th>
                            <th><button type="button" onClick={this.props.onFieldAddClick}>Add Field</button></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.record.fields.map((field, index) => <tr>
                            <td>
                                <input value={field.label} onChange={this.onFieldPropChange(field.name, 'label', index)} />
                            </td>
                            <td>
                                <input value={field.name} onChange={this.onFieldPropChange(field.name, 'name', index)} />
                            </td>
                            <td>
                                <TypeSelector includeValues={true} field={field} records={this.props.records} onChange={this.onFieldPropChange(field.name, 'typeName', index)}/>
                            </td>
                            <td>
                                <input type="checkbox" checked={field.multiple} onChange={this.onFieldPropChange(field.name, 'multiple', index)} />
                            </td>
                            <td>
                                <input type="checkbox" checked={field.required} onChange={this.onFieldPropChange(field.name, 'required', index)} />
                            </td>
                            <td>
                                <input type={"number"} value={field.maxLength} onChange={this.onFieldPropChange(field.name, 'maxLength', index)} />
                            </td>
                            <td>
                                <input type={"number"} value={field.max} onChange={this.onFieldPropChange(field.name, 'max', index)} />
                            </td>
                            <td>
                                <input type={"number"} value={field.min} onChange={this.onFieldPropChange(field.name, 'min', index)} />
                            </td>
                            <td>
                                <ButtonGroup actions={[
                                    { label: 'Edit', onClick: e => this.props.onFieldEditClick(field) },
                                    { label: 'Remove', onClick: e => this.props.onFieldRemoveClick(field) }
                                ]}/>
                            </td>
                        </tr>)}
                        </tbody>
                        <tfoot>
                        <tr>
                            <td/><td/><td/><td/><td/><td/><td/><td/>
                            <td>
                                <button type="button" onClick={this.props.onFieldAddClick}>Add Field</button>
                            </td>
                        </tr>
                        </tfoot>
                    </table>

                </fieldset>
                {/*<fieldset>*/}
                    {/*<legend>Edit Field</legend>*/}
                    {/*<FieldBuilderBound/>*/}
                {/*</fieldset>*/}
            </div>
        ) : <div></div>
    }

    onFieldPropChange(fieldName, prop, index) {
        return (event, category?) => this.props.onFieldPropChange(this.props.record.name, fieldName, prop, event.target.value, index, category);
    }

    onRecordPropChange(prop) {
        return (event) => this.props.onRecordPropChange(this.props.record.name, prop, event.target.value);
    }
}

export const RecordBuilderBound = connect(
    (state: {appBuilder: {records, record}}) => ((state||{}).appBuilder||{ } as any as RecordBuilderProps),
    (dispatch) => ({
        onRecordPropChange: (recordName, propName, value) =>
            dispatch({type: 'BUILDER__RECORD_PROP_CHANGE', payload: { recordName, propName, value }}),
        onFieldEditClick: (field) => dispatch({type: 'BUILDER__FIELD_EDIT_CLICK', payload: field }),
        onFieldRemoveClick: (field) => dispatch({type: AppBuilderActions.FieldRemoveClick, payload: field }),
        onFieldAddClick: () => dispatch({type: 'BUILDER__FIELD_ADD_CLICK'}),
        onFieldPropChange: (recordName, fieldName, propName, value, index, category) =>
            dispatch({type: 'BUILDER__FIELD_PROP_CHANGE', payload: { recordName, fieldName, propName, value, index, category }})
    } as RecordBuilderEvents)
)(RecordBuilder);