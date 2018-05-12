import * as React from "react";
import {LabeledEditorContainer} from "./LabelingProviderBaseComponent";
import {fieldContainerClasses, fieldLabelClasses} from 'metatonic-core';

export default class FieldSet extends LabeledEditorContainer {
    render() {
        return (
            <fieldset className={`field-set-field-container ${fieldContainerClasses(this.field())}`}>
                <legend className={fieldLabelClasses(this.field())}  id={`${this.uniqueId()}-label`}>
                    {this.label()}
                </legend>
                {this.content()}
                {this.renderValidationMessages()}
            </fieldset>
        );
    }
}