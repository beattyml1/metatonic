import * as React from "react";
import {BaseEditor} from "./BaseEditor";
import {Numeric, editorFor, NumericTypeInfo, BaseEditorModel, Decimal} from "metatonic-core";
import InputBoxLabelContainer from "../LabeledFieldContainers/InputFieldLabelAndContainer";

@editorFor("numeric", InputBoxLabelContainer, { isDefault: true })
export class NumericEditor extends BaseEditor<Numeric, NumericTypeInfo, BaseEditorModel<Numeric>> {
    render() {
        return (
            <input type="number"
                   id={this.uniqueId()}
                   value={this.value().toEditorString()}
                   required={this.field().required}
                   max={this.props.field.max || undefined}
                   min={this.props.field.min || undefined}
                   step={1}
                   onChange={this.notifyChanged}
            />
        );
    }
}