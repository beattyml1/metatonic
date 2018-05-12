import * as React from 'react'
import {Field} from "../models/FieldModel";
import {connect} from "react-redux";
import {Record} from '../models/RecordModel'
import {TypeSelector} from "./TypeSelector";

export type FieldBuilderProps = {
    field: Field,
    record: Record,
    records: Record[]
}


export type FieldBuilderEvents = {
    onFieldPropChange(recordName, fieldName, propName, value)
}

export class FieldBuilder extends React.Component<FieldBuilderEvents & FieldBuilderProps, any> {
    render() {
        return this.props.field ? (
            <div className="field-builder">
                <label>
                    Name
                    <input value={this.props.field.name} onChange={this.onFieldPropChange('name')} />
                </label>
                <label>
                    Label
                    <input value={this.props.field.label} onChange={this.onFieldPropChange('label')}/>
                </label>
                <label>
                    Type
                    <TypeSelector includeValues={true} field={this.props.field} records={this.props.records} onChange={this.onFieldPropChange('typeName')}/>
                </label>
                <fieldset>
                    <legend>Validations</legend>
                    <table>
                        <thead>
                        <tr>
                            <th>Type</th>
                            <th>Parameter</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Required</td>
                            <td><input type="checkbox" checked={this.props.field.required} onChange={this.onFieldPropChange('required')} /></td>
                        </tr>
                        <tr>
                            <td>Min</td>
                            <td><input type="number" step={1} value={this.props.field.min} onChange={this.onFieldPropChange('min')} /></td>
                        </tr>
                        <tr>
                            <td>Max</td>
                            <td><input type="number" step={1} value={this.props.field.max} onChange={this.onFieldPropChange('max')} /></td>
                        </tr>
                        <tr>
                            <td>Max Length</td>
                            <td><input type="number" step={1} value={this.props.field.maxLength} onChange={this.onFieldPropChange('maxLength')} /></td>
                        </tr>
                        </tbody>
                    </table>
                </fieldset>
            </div>
        ) : <div></div>
    }

    onFieldPropChange(prop) {
        return (event) => this.props.onFieldPropChange(this.props.record.name, this.props.field.name, prop, event.target.value);
    }
}

export const FieldBuilderBound = connect(
    (state: {appBuilder: {records:any, field:any, record:any}}) => ((state||{}).appBuilder||{records:[] as any[], field:{name:''} as any, record: {} as any} as FieldBuilderProps),
    (dispatch) => ({
        onFieldPropChange: (recordName, fieldName, propName, value) =>
            dispatch({type: 'BUILDER__FIELD_PROP_CHANGE', payload: { recordName, fieldName, propName, value }})
    } as FieldBuilderEvents)
)(FieldBuilder);