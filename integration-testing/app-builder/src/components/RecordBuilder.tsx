import * as React from 'react'
import {Field} from "../models/FieldModel";
import {connect} from "react-redux";
import {Record} from '../models/RecordModel'
import {TypeSelector} from "./TypeSelector";
import {FieldBuilderBound} from "./FieldBuilder";

export type RecordBuilderProps= {
    record: Record
    records: Record[]
}


export type RecordBuilderEvents = {
    onRecordPropChange(recordName, propName, value)
    onFieldPropChange(recordName, fieldName, propName, value, index, category)
    onFieldEditClick(field: Field)
    onFieldAddClick()
}

export class RecordBuilder extends React.Component<RecordBuilderEvents & RecordBuilderProps, any> {
    render() {
        return this.props.record ? (
            <div className="record-builder">
                <label>
                    Name
                    <input value={this.props.record.name} onChange={this.onRecordPropChange('name')} />
                </label>
                <label>
                    Label
                    <input value={this.props.record.label} onChange={this.onRecordPropChange('label')} />
                </label>
                <button type="button" onClick={this.props.onFieldAddClick}>Add Field</button>
                <fieldset>
                    <legend>Fields</legend>
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Label</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.record.fields.map((field, index) => <tr>
                            <td>
                                <input value={field.name} onChange={this.onFieldPropChange(field.name, 'name', index)} />
                            </td>
                            <td>
                                <input value={field.label} onChange={this.onFieldPropChange(field.name, 'label', index)} />
                            </td>
                            <td>
                                <TypeSelector includeValues={true} field={field} records={this.props.records} onChange={this.onFieldPropChange(field.name, 'typeName', index)}/>
                            </td>
                            <td><button type="button" onClick={e => this.props.onFieldEditClick(field)}>Edit Field</button></td>
                        </tr>)}
                        </tbody>
                    </table>
                    <button type="button" onClick={this.props.onFieldAddClick}>Add Field</button>
                </fieldset>
                <fieldset>
                    <legend>Edit Field</legend>
                    <FieldBuilderBound/>
                </fieldset>
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
        onFieldAddClick: () => dispatch({type: 'BUILDER__FIELD_ADD_CLICK'}),
        onFieldPropChange: (recordName, fieldName, propName, value, index, category) =>
            dispatch({type: 'BUILDER__FIELD_PROP_CHANGE', payload: { recordName, fieldName, propName, value, index, category }})
    } as RecordBuilderEvents)
)(RecordBuilder);