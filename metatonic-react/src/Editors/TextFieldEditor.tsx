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
    size = () => (this.field().maxLength && this.field().maxLength! <= 10) ? this.field().maxLength! : 20;
    render() {
        return (
            <input
                id={this.uniqueId()}
                value={this.props.value}
                type={getTextHtmlInputType(this.type().name as TextTypes)}
                required={this.field().required}
                size={this.size()}
                maxLength={this.field().maxLength || this.type().maxLength}
                className={fieldInputClasses(this.field())}
                name={this.props.context.fieldLocator}
                data-fieldName={this.field().name}
                onChange={(e) => this.notifyChanged(e.target.value)}
            />
        )
    }
}