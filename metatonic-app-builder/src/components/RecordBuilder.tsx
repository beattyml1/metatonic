import * as React from 'react'
import {Field} from "../models/FieldModel";
import {connect} from "react-redux";
import {Record} from '../models/RecordModel'
import {TypeSelector} from "./TypeSelector";

export type RecordBuilderProps= {
    record: Record
    records: Record[]
}


export type RecordBuilderEvents = {
    onRecordPropChange(recordName, propName, value)
    onFieldPropChange(recordName, fieldName, propName, value)
    onFieldEditClick(field: Field)
    onFieldAddClick()
}

export class RecordBuilder extends React.Component<RecordBuilderEvents & RecordBuilderProps, any> {
    render() {
        return (
            <div className="field-builder">
                <label>
                    Name
                    <input value={this.props.record.name} onChange={this.onRecordPropChange('name')} />
                </label>
                <label>
                    Label
                    <input value={this.props.record.label} onChange={this.onRecordPropChange('label')} />
                </label>
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
                        {this.props.record.fields.map(field => <tr>
                            <td>
                                <input value={field.name} onChange={this.onFieldPropChange(field.name, 'name')} />
                            </td>
                            <td>
                                <input value={field.label} onChange={this.onFieldPropChange(field.name, 'label')} />
                            </td>
                            <td>
                                <TypeSelector field={field} records={this.props.records} onChange={this.onFieldPropChange(field.name, 'typeName')}/>
                            </td>
                        </tr>)}
                        </tbody>
                    </table>
                </fieldset>
            </div>
        )
    }

    onFieldPropChange(fieldName, prop) {
        return (value) => this.props.onFieldPropChange(this.props.record.name, fieldName, prop, value);
    }

    onRecordPropChange(prop) {
        return (value) => this.props.onRecordPropChange(this.props.record.name, prop, value);
    }
}

export const RecordBuilderBound = connect(
    (state: any) => (state.appBuilder as RecordBuilderProps),
    (dispatch) => ({
        onRecordPropChange: (recordName, propName, value) =>
            dispatch({type: 'BUILDER__RECORD_PROP_CHANGE', payload: { recordName, propName, value }}),
        onFieldEditClick: (field) => dispatch({type: 'BUILDER__FIELD_EDIT_CLICK', payload: field }),
        onFieldAddClick: () => dispatch({type: 'BUILDER__RECORD_ADD_CLICK'}),
        onFieldPropChange: (recordName, fieldName, propName, value) =>
            dispatch({type: 'BUILDER__FIELD_PROP_CHANGE', payload: { recordName, fieldName, propName, value }})
    } as RecordBuilderEvents)
)(RecordBuilder)