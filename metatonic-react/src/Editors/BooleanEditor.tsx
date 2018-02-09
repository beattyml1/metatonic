import * as React from "react";
import {BaseEditorModel, BooleanType, editorFor} from "metatonic-core";
import {BaseEditor} from "./BaseEditor";
import InputBoxLabelContainer from "../LabeledFieldContainers/InputFieldLabelAndContainer";

@editorFor("boolean", InputBoxLabelContainer)
export class BooleanEditor extends BaseEditor<boolean, BooleanType, BaseEditorModel<boolean>, void>
{
    render()
    {
        return (
            <input type="checkbox" checked={this.value()} onChange={this.notifyChanged} id={this.uniqueId()} />
        );
    }
}