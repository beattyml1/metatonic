import * as React from "react";
import {BaseEditor} from "../Editors/BaseEditor";
import {RecordSchemaType, SchemaRecordTypeParameters} from "metatonic-core";
import {BaseEditorModel} from "metatonic-core";

export class RadioSelect extends BaseEditor<any, SchemaRecordTypeParameters, BaseEditorModel<any>, void> {
    render() {
        return (
            <div id={this.uniqueId()}>
                {this.type().items.map((item, index) =>
                    <label>
                        <input
                            type="radio"
                            value={item.$value}
                            name={this.uniqueId()}
                            id={`${this.uniqueId()}-${index}`}
                            checked={item.$value === this.value()}
                            onChange={(changeEvent) => this.notifyChanged(changeEvent.target.value)}
                        />
                        {item.$description}
                    </label>
                )}
            </div>
        );
    }
}