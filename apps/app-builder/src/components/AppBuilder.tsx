import * as React from 'react'
import {Field} from "../models/FieldModel";
import {FieldBuilder} from "./FieldBuilder";
import {Record} from '../models/RecordModel'
import {connect} from "react-redux";
import {RecordBuilder, RecordBuilderBound} from "./RecordBuilder";
import './AppBuilder.css'
import {AppBuilderActions} from "../Types";

export type AppBuilderProps = {
    records: Record[],
    record: Record,
    messages: string[]
}

export type AppBuilderEvents = {
    onRecordPropChange(recordName, propName, value, index)
    onRecordRemoveClick(record: Record)
    onRecordAddClick: () => void
    onRecordEditClick: (record: Record) => void
}

export class AppBuilder extends React.Component<AppBuilderProps & AppBuilderEvents, any> {
    render() {
        return (
            <div className="app-editor">
                <fieldset className={"record-editor-fieldset"}>
                    <legend>Records</legend>
                    <table className="data-grid">
                        <thead>
                        <tr>
                            <th>Label</th>
                            <th>Name</th>
                            <th><button type="button" onClick={this.props.onRecordAddClick} className="before-table-add-btn">Add Record</button></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.records.map((record, index) => <tr>
                            <td>
                                <input value={record.label} onChange={this.onRecordPropChange(record.name, 'label', index)} />
                            </td>
                            <td>
                                <input value={record.name} onChange={this.onRecordPropChange(record.name, 'name', index)} />
                            </td>
                            <td>
                                <button type="button" onClick={() => this.props.onRecordEditClick(record)}>Edit</button>
                                <button type="button" onClick={() => this.props.onRecordRemoveClick(record)}>Remove</button>
                            </td>
                        </tr>)}
                        </tbody>

                        <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>
                                <button type="button" onClick={this.props.onRecordAddClick} className="after-table-add-btn">Add Record</button>
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                </fieldset>
                <fieldset className={"record-builder-field"}>
                    <legend>{this.props.record && this.props.record.label ? `Edit '${this.props.record.label}' Record` : 'Edit Record'} </legend>
                    <RecordBuilderBound/>
                </fieldset>
                <div className={'error-list'}>
                    {this.props.messages.map(message =>
                        <div className={"error"}>{message}</div>
                    )}
                </div>
            </div>
        );
    }


    onRecordPropChange(recordName, prop, index) {
        return (event) => this.props.onRecordPropChange(recordName, prop, event.target.value, index);
    }
}

export const AppBuilderBound = connect(
    (state: {appBuilder: {records}, messages? }) => ({
        ...((state||{}).appBuilder||{records:[]}),
        messages: (state||{}).messages||[]
    })as AppBuilderProps,
    (dispatch) => ({
        onRecordPropChange: (recordName, propName, value, index) =>
            dispatch({type: 'BUILDER__RECORD_PROP_CHANGE', payload: { recordName, propName, value, index }}),
        onRecordEditClick: (record) => dispatch({type: 'BUILDER__RECORD_EDIT_CLICK', payload: record }),
        onRecordRemoveClick: (record) => dispatch({type: AppBuilderActions.RecordARemoveClick, payload: record }),
        onRecordAddClick: () => dispatch({type: 'BUILDER__RECORD_ADD_CLICK'}),
    } as AppBuilderEvents)
)(AppBuilder);
