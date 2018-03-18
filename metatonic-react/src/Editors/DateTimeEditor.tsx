import * as React from "react";
import {TextModel} from "metatonic-core";
import {BaseEditor} from "./BaseEditor";
import {getDateHtmlInputType, DateTimeType} from "metatonic-core";
import {editorFor} from "metatonic-core";
import InputBoxLabelContainer from "../LabeledFieldContainers/InputFieldLabelAndContainer";
import {TimeStamp, DateTime, Date} from "metatonic-core";
import {DateTimeModel} from "metatonic-core";
import {fieldInputClasses} from "metatonic-core";

@editorFor("date", InputBoxLabelContainer, {isDefault: true})
@editorFor("datetime", InputBoxLabelContainer, {isDefault: true})
@editorFor("time", InputBoxLabelContainer, {isDefault: true})
@editorFor("timestamp", InputBoxLabelContainer, {isDefault: true})
export class DateTimeEditor extends BaseEditor<Date|DateTime|TimeStamp, DateTimeType, DateTimeModel, void> {
    render() {
        return (
            <input
                id={this.uniqueId()}
                value={this.props.value.toEditorString()}
                type={getDateHtmlInputType(this.type().name as any)}
                required={this.field().required}
                max={this.field().max || this.type().max}
                min={this.field().min || this.type().min}
                onChange={(value) => this.notifyChanged(value)}
                name={this.props.context.fieldLocator}
                data-fieldName={this.field().name}
                className={fieldInputClasses(this.field())}
            />
        )
    }
}