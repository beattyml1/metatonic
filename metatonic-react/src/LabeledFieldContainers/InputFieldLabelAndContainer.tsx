import * as React from "react";
import {LabeledEditorContainer} from "./LabelingProviderBaseComponent";
import {fieldContainerClasses, fieldLabelClasses} from 'metatonic-core';


export default class InputBoxLabelContainer extends LabeledEditorContainer {
	render() { return (
        <div className={fieldContainerClasses(this.field())}>
            <label htmlFor={this.uniqueId()} className={fieldLabelClasses(this.field())}>{this.label()}</label>
            {this.content()}
            {this.renderValidationMessages()}
        </div>);
	}

}