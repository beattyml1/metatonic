import * as React from "react";
import {BaseEditorModel} from "metatonic-core";
import {AnyTypeParameterType, SchemaType} from "metatonic-core";
import {BaseFieldContextComponent} from "../BaseFieldContextComponent";

export abstract class BaseEditor
    <TData,
     TType extends AnyTypeParameterType,
     TParams extends BaseEditorModel<TData>,
     TState = {}>
    extends BaseFieldContextComponent<TParams, TState> {

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

    fieldLocator() {
        return this.props.context.fieldLocator
    }

    formDispatcher() {
        return this.props.resources.formDispatcher;
    }

    type() {
        return Object.assign({}, this.props.field.type, this.props.field.type.parameters as TType)
    }

    value() {
        return this.props.value;
    }

    notifyChanged(value) {
        this.props.resources.formDispatcher.propertyChanged({
            propertySelector: this.fieldLocator(),
            value: this.value()
        })
    }
}