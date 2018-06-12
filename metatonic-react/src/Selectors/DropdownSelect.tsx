import * as React from "react";
import {BaseEditor} from "../Editors/BaseEditor";
import {RecordSchemaType, SchemaRecordTypeParameters, fieldInputClasses} from "metatonic-core";
import {BaseEditorModel} from "metatonic-core";
import {selectFor} from "metatonic-core";
import InputBoxLabelContainer from "../LabeledFieldContainers/InputFieldLabelAndContainer";

@selectFor("Record", InputBoxLabelContainer)
export class DropdownSelect extends BaseEditor<any, SchemaRecordTypeParameters, BaseEditorModel<any>, void> {
    render() {
        let items = this.type().items || [];
        return (
            <select value={this.value()} id={this.uniqueId()} onChange={(e) => this.notifyChanged(e.target.value)} className={fieldInputClasses(this.field())}>
                {items.map(item =>
                    <option value={item.$value}>{item.$description}</option>
                )}
            </select>
        );
    }
}