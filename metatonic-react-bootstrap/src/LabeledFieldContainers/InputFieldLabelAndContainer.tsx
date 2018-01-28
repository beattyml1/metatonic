import * as React from "react";
import {SchemaField} from "metatonic-core";
import {LabeledEditorContainer} from "./LabelingProviderBaseComponent";
import {ComponentContext} from "metatonic-core";

export default class InputBoxLabelContainer extends LabeledEditorContainer {
	render() { return (
        <div className="field-editor input-field-editor">
            <label htmlFor={this.props.field.uiUniqueId}>{this.props.field.label}</label>
            {(this.props as any).children}
        </div>);
	}

}