import * as React from "react";
import {BaseEditor} from "Editors/BaseEditor";
import {RecordSchemaType, SchemaRecordTypeParameters} from "metatonic-core/src/index";
import {BaseEditorModel} from "metatonic-core/src/index";

export class DropdownSelect extends BaseEditor<any, SchemaRecordTypeParameters, BaseEditorModel<any>, void> {
    render() {
        return (
            <select value={this.value()} id={this.uniqueId()}>
                {this.type().items.map(item =>
                    <option value={item.$value}>{item.$description}</option>
                )}
            </select>
        );
    }
}