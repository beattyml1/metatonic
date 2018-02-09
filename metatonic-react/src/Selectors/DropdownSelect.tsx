import * as React from "react";
import {BaseEditor} from "../Editors/BaseEditor";
import {RecordSchemaType, SchemaRecordTypeParameters} from "metatonic-core";
import {BaseEditorModel} from "metatonic-core";

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