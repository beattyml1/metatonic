import * as React from "react";
import {TextModel} from "metatonic-core";
import {BaseEditor} from "./BaseEditor";
import {getDateHtmlInputType, DateTimeType} from "metatonic-core";
import {editorFor} from "metatonic-core";
import InputBoxLabelContainer from "../LabeledFieldContainers/InputFieldLabelAndContainer";

@editorFor("date", InputBoxLabelContainer, {isDefault: true})
@editorFor("datetime", InputBoxLabelContainer, {isDefault: true})
@editorFor("time", InputBoxLabelContainer, {isDefault: true})
@editorFor("timestamp", InputBoxLabelContainer, {isDefault: true})
export class TextFieldEditor extends BaseEditor<string, DateTimeType, TextModel, void> {
    render() {
        return (
            <input
                id={this.uniqueId()}
                value={this.props.value}
                type={getDateHtmlInputType(this.type().name as any)}
                required={this.field().required}
                max={this.field().max || this.type().max}
                min={this.field().min || this.type().min}
                onChange={(value) => this.notifyChanged(value)}
                className={this.inputTypeClasses()}
            />
        )
    }

    inputTypeClasses = () =>
        this.type().parentTypeNames.concat(this.type().name).map(_ => `input-${_}`).join(' ')
}