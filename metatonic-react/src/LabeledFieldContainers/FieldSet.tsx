import * as React from "react";
import {LabeledEditorContainer} from "./LabelingProviderBaseComponent";
import {fieldContainerClasses, fieldLabelClasses} from 'metatonic-core';

export default class FieldSet extends LabeledEditorContainer {
    render() {
        return (
            <fieldset className={fieldContainerClasses(this.field())}>
                <legend className={fieldLabelClasses(this.field())}>{this.label()}</legend>
                {this.content()}
                {this.renderValidationMessages()}
            </fieldset>
        );
    }
}