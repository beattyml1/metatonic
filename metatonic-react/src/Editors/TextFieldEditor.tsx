import * as React from "react";
import {TextModel} from "metatonic-core";
import {BaseEditor} from "./BaseEditor";
import {TextTypeParameters} from "metatonic-core";
import {getTextHtmlInputType} from "metatonic-core";
import {editorFor} from "metatonic-core";
import InputBoxLabelContainer from "../LabeledFieldContainers/InputFieldLabelAndContainer";
import {TextTypes} from "metatonic-core";

@editorFor("text", InputBoxLabelContainer, {isDefault: true})
export class TextFieldEditor extends BaseEditor<string, TextTypeParameters, TextModel, void> {
    render() {
        return (
            <input
                value={this.props.value}
                type={getTextHtmlInputType(this.type().name as TextTypes)}
                required={this.field().required}
                maxLength={this.field().maxLength || this.type().maxLength}
                className={this.inputTypeClasses()}
                onChange={(value) => this.notifyChanged(value)}
            />
        )
    }

    inputTypeClasses = () =>
        this.type().parentTypeNames.concat(this.type().name).map(_ => `input-${_}`).join(' ')
}