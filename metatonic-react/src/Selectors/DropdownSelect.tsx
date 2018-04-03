import * as React from "react";
import {BaseEditor} from "../Editors/BaseEditor";
import {RecordSchemaType, SchemaRecordTypeParameters, fieldInputClasses} from "metatonic-core";
import {BaseEditorModel} from "metatonic-core";
import {selectFor} from "metatonic-core";
import InputBoxLabelContainer from "../LabeledFieldContainers/InputFieldLabelAndContainer";

@selectFor("Record", InputBoxLabelContainer)
export class DropdownSelect extends BaseEditor<any, SchemaRecordTypeParameters, BaseEditorModel<any>, void> {
    render() {
        return (
            <select value={this.value()} id={this.uniqueId()} onChange={(value) => this.notifyChanged(value)} className={fieldInputClasses(this.field())}>
                {this.type().items.map(item =>
                    <option value={item.$value}>{item.$description}</option>
                )}
            </select>
        );
    }
}