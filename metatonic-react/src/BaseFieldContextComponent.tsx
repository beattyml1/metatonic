import * as React from "react";
import {BaseEditorModel} from "metatonic-core";
import {AnyTypeParameterType, SchemaField, SchemaType} from "metatonic-core";
import {getUniqueId} from "metatonic-core";
import {ComponentContext} from "metatonic-core";

export abstract class BaseFieldContextComponent<TParams extends BaseEditorModel<any>, TState = {}>
    extends React.Component<TParams, TState> {

    field() {
        return this.props.field;
    }

    uniqueId() {
        return getUniqueId(this.field(), this.props.context);
    }


    renderValidationMessages() {
        return (
            <div className="error-list">
                {this.validationMessages().map(message => {
                    <label className="error" htmlFor={this.uniqueId()}>{message}</label>
                })}
            </div>);
    }

    validationMessages() {
        return this.props.fieldState.validationMessages;
    }
}