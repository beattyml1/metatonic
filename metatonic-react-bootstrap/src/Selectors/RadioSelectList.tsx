import * as React from "react";
import {BaseEditor} from "Editors/BaseEditor";
import {RecordSchemaType, SchemaRecordTypeParameters} from "metatonic-core/src/index";
import {BaseEditorModel} from "metatonic-core/src/index";

export class RadioSelect extends BaseEditor<any, SchemaRecordTypeParameters, BaseEditorModel<any>, void> {
    render() {
        return (
            <div id={this.uniqueId()}>
                {this.type().items.map((item, index) =>
                    <label>
                        <input type="radio" value={item.$value} name={this.uniqueId()} id={`${this.uniqueId()}-${index}`}/>
                        {item.$description}
                    </label>

                )}
            </div>
        );
    }
}