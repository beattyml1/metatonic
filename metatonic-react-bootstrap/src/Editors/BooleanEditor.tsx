import * as React from "react";
import {BaseEditorModel} from "metatonic-core/src/index";
import {BaseEditor} from "./BaseEditor";

export default class BooleanEditor extends BaseEditor<boolean, BooleanType, BaseEditorModel<BooleanType>, void>
{
    render()
    {
        return (
            <input type="checkbox" value={this.value()} onchange={this.notifyChanged} id={this.uniqueId()} />
        );
    }
}