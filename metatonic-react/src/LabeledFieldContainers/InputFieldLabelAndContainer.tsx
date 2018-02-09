import * as React from "react";
import {LabeledEditorContainer} from "./LabelingProviderBaseComponent";


export default class InputBoxLabelContainer extends LabeledEditorContainer {
	render() { return (
        <div className="field-editor input-field-editor">
            <label htmlFor={this.props.field.uiUniqueId}>{this.props.field.label}</label>
            {(this.props as any).children}
        </div>);
	}

}