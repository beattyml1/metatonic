import * as React from "react";
import {LabeledEditorContainer} from "./LabelingProviderBaseComponent";
import {fieldContainerClasses, fieldLabelClasses} from 'metatonic-core';


export default class InputBoxLabelContainer extends LabeledEditorContainer {
	render() { return (
        <div className={`input-box-field-container ${fieldContainerClasses(this.field())}`}>
            <label htmlFor={this.uniqueId()} className={fieldLabelClasses(this.field())} id={`${this.uniqueId()}-label`}>
                {this.label()}
            </label>
            {this.content()}
            {this.renderValidationMessages()}
        </div>);
	}

}