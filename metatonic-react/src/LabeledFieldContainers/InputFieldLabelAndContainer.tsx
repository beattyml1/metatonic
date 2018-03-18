import * as React from "react";
import {LabeledEditorContainer} from "./LabelingProviderBaseComponent";
import {fieldContainerClasses, fieldLabelClasses} from 'metatonic-core';


export default class InputBoxLabelContainer extends LabeledEditorContainer {
	render() { return (
        <div className={fieldContainerClasses(this.field())}>
            <label htmlFor={this.props.field.uiUniqueId} className={fieldLabelClasses(this.field())}>{this.props.field.label}</label>
            {(this.props as any).children}
        </div>);
	}

}