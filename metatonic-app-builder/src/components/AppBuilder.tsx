import * as React from 'react'
import {Field} from "../models/FieldModel";
import {FieldBuilder} from "./FieldBuilder";
import {Record} from '../models/RecordModel'
import {connect} from "react-redux";
import {RecordBuilder, RecordBuilderBound} from "./RecordBuilder";

export type AppBuilderProps = {
    records: Record[]
}

export type AppBuilderEvents = {
    onRecordPropChange(recordName, propName, value)
    onRecordAddClick: () => void
    onRecordEditClick: (record: Record) => void
}

export class AppBuilder extends React.Component<AppBuilderProps & AppBuilderEvents, any> {
    render() {
        return (
            <div className="app-editor">
                <fieldset>
                    <legend>Records</legend>
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Label</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.records.map(record => <tr>
                            <td>
                                <input value={record.name} onChange={this.onRecordPropChange(record.name, 'name')} />
                            </td>
                            <td>
                                <input value={record.label} onChange={this.onRecordPropChange(record.name, 'label')} />
                            </td>
                            <td><button type="button" onClick={() => this.props.onRecordEditClick(record)}></button></td>
                        </tr>)}
                        </tbody>
                    </table>
                </fieldset>
            </div>
        );
    }


    onRecordPropChange(recordName, prop) {
        return (value) => this.props.onRecordPropChange(recordName, prop, value);
    }
}

export const AppBuilderBound = connect(
    (state: any) => (state.appBuilder as AppBuilderProps),
    (dispatch) => ({
        onRecordPropChange: (recordName, propName, value) =>
            dispatch({type: 'BUILDER__RECORD_PROP_CHANGE', payload: { recordName, propName, value }}),
        onRecordEditClick: (record) => dispatch({type: 'BUILDER__FIELD_EDIT_CLICK', payload: record }),
        onRecordAddClick: () => dispatch({type: 'BUILDER__RECORD_ADD_CLICK'}),
    } as AppBuilderEvents)
)(AppBuilder)
