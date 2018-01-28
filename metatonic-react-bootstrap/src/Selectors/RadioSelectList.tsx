import * as React from "react";
import {BaseEditorModel} from "metatonic-core"
import {SchemaRecordType, SelectableType} from "metatonic-core"
import {BaseEditor} from "Editors/BaseEditor";

export class RadioSelectList extends BaseEditor<string, SelectableType, BaseEditorModel<string>, void> {
    render() {
        return (
            <div></div>
        );
    }
}