import * as React from "react";
import {BaseEditor} from "./BaseEditor";
import {Numeric, editorFor, NumericTypeInfo, BaseEditorModel, Decimal, fieldInputClasses} from "metatonic-core";
import InputBoxLabelContainer from "../LabeledFieldContainers/InputFieldLabelAndContainer";

@editorFor("Numeric", InputBoxLabelContainer, { isDefault: true })
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
                   onChange={e => this.notifyChanged(e.target.value)}
                   name={this.props.context.fieldLocator}
                   data-fieldName={this.field().name}
                   className={fieldInputClasses(this.field())}
            />
        );
    }
}