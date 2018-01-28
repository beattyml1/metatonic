import * as React from "react";
import {TextModel} from "metatonic-core";
import {BaseEditor} from "./BaseEditor";
import {TextType} from "metatonic-core";
import {getTextHtmlInputType} from "metatonic-core";

export class TextFieldEditor extends BaseEditor<string, TextType, TextModel, void> {
    render() {
        return (
            <input
                value={this.props.value}
                type={getTextHtmlInputType(this.type().type)}
                required={this.field().required}
                maxLength={this.field().maxLength || this.type().maxLength}
                className={this.inputTypeClasses()}
            />
        )
    }

    inputTypeClasses = () =>
        this.type().parentTypeNames.concat(this.type().name).map(_ => `input-${_}`).join(' ')
}