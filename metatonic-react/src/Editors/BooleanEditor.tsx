import * as React from "react";
import {BaseEditorModel, BooleanType, editorFor, fieldInputClasses} from "metatonic-core";
import {BaseEditor} from "./BaseEditor";
import InputBoxLabelContainer from "../LabeledFieldContainers/InputFieldLabelAndContainer";

@editorFor("Boolean", InputBoxLabelContainer)
export class BooleanEditor extends BaseEditor<boolean, BooleanType, BaseEditorModel<boolean>, void>
{
    render()
    {
        return (
            <input type="checkbox"
                   checked={this.value()}
                   onChange={this.notifyChanged}
                   id={this.uniqueId()}
                   name={this.props.context.fieldLocator}
                   data-fieldName={this.field().name}
                   className={fieldInputClasses(this.field())} />
        );
    }
}