import * as React from "react";
import {BaseEditor} from "./BaseEditor";
import {BaseEditorModel} from "metatonic-core/src/index";
import {FieldEditor} from "./FieldEditor";
import {createContext} from "../../../metatonic-core/src/services/ContextService";
import {multiEditorFor} from "../../../metatonic-core/src/decorators/editorDecorator";
import FieldSet from "../LabeledFieldContainers/FieldSet";

multiEditorFor("", FieldSet)
export default class Repeater<TData, TSchemaType, BaseEditorModel, TState> extends BaseEditor<TData[], TSchemaType, TProps, State>
{
    render()
    {
        return this.value().map((item, index) =>
            <div>
                <FieldEditor
                    field={Object.assign({multiple: false}, this.field())}
                    value={item}
                    context={createContext(this.field(), this.context(), index)}
                    fieldState={this.props.fieldState.children[index]}/>
            </div>
        );
    }
}