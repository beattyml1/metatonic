import * as React from "react";
import {BaseEditor} from "./BaseEditor";
import {BaseEditorModel} from "metatonic-core";
import {FieldEditor} from "./FieldEditor";
import {createContext} from "metatonic-core";
import {multiEditorFor} from "metatonic-core";
import FieldSet from "../LabeledFieldContainers/FieldSet";
import {AnyTypeParameterType} from "metatonic-core";
import {getDefaultDataForField} from "metatonic-core";

@multiEditorFor("", FieldSet, { uiHint: 'repeater' })
export class Repeater<TData, TSchemaType extends AnyTypeParameterType, TState> extends BaseEditor<TData[], TSchemaType, BaseEditorModel<TData[]>, TState> {
    render() {
        return <div>
            <div>
                <button type="button" onClick={this.add}>Add</button>
            </div>
            {this.value().map((item, index) =>
                <div>
                    <FieldEditor
                        field={Object.assign({multiple: false}, this.field())}
                        value={item}
                        context={createContext(this.field(), this.context(), index)}
                        fieldState={this.props.fieldState.children[index]}
                        resources={this.props.resources}
                    />
                    <button type="button" onClick={() => this.remove(index)}>Remove</button>
                </div>
            )}
        </div>
    }


    remove = (rowIndex) => {
        this.formDispatcher().itemRemoved({ propertySelector: this.fieldLocator(), index: rowIndex} );
    }

    add = () =>  {
        this.formDispatcher().itemAdded({ propertySelector: this.fieldLocator(), item: getDefaultDataForField(this.field(), true) });
    }
}