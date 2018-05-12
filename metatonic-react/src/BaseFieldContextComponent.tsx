import * as React from "react";
import {BaseEditorModel} from "metatonic-core";
import {AnyTypeParameterType, SchemaField, SchemaType} from "metatonic-core";
import {getUniqueId} from "metatonic-core";
import {ComponentContext} from "metatonic-core";
import {ValidationMessageDetailed} from "metatonic-core";

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
            <div className="validation-list">
                <div >
                    {this.validationMessages().map((message, index) => {
                        <div className={`validation-message ${message.severity}`}
                             id={`${this.uniqueId()}-message-${index}`}
                             role="alert" >
                            {message.message}
                        </div>
                    })}
                </div>
            </div>);
    }

    validationMessages(): ValidationMessageDetailed[] {
        return this.props.fieldState.validationMessages;
    }
}