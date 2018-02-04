import * as React from "react";
import {BaseEditor} from "Editors/BaseEditor";
import {RecordSchemaType, SchemaRecordTypeParameters} from "metatonic-core/src/index";
import {BaseEditorModel} from "metatonic-core/src/index";

export default class DropdownSelect extends BaseEditor<any, SchemaRecordTypeParameters, BaseEditorModel<any>, void> {
    render() {
        return (
            <select >
                {}
            </select>
        );
    }
}