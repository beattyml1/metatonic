import * as React from "react";
import {TextModel} from "metatonic-core";
import {BaseEditor} from "./BaseEditor";
import {TextTypeParameters} from "metatonic-core";
import {getTextHtmlInputType} from "metatonic-core";
import {editorFor} from "metatonic-core";
import InputBoxLabelContainer from "../LabeledFieldContainers/InputFieldLabelAndContainer";
import {TextTypes, fieldInputClasses} from "metatonic-core";

@editorFor("text", InputBoxLabelContainer, {isDefault: true})
export class TextFieldEditor extends BaseEditor<string, TextTypeParameters, TextModel, void> {
    render() {
        return (
            <input
                id={this.uniqueId()}
                value={this.props.value}
                type={getTextHtmlInputType(this.type().name as TextTypes)}
                required={this.field().required}
                maxLength={this.field().maxLength || this.type().maxLength}
                className={fieldInputClasses(this.field())}
                name={this.props.context.fieldLocator}
                data-fieldName={this.field().name}
                onChange={(value) => this.notifyChanged(value)}
            />
        )
    }
}