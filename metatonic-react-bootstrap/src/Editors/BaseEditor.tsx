import * as React from "react";
import {BaseEditorModel} from "metatonic-core/src/index";
import {AnyTypeParameterType, SchemaType} from "metatonic-core/src/index";
import {getUniqueId} from "metatonic-core/src/index";
import {BaseFieldContextComponent} from "BaseFieldContextComponent";
import {SchemaTypeCategory} from "../../../metatonic-core/src/domain/Schema/SchemaEnums";

export abstract class BaseEditor
    <TData,
     TType extends AnyTypeParameterType,
     TParams extends BaseEditorModel<TData>,
     TState>
    extends BaseFieldContextComponent<TParams, TState> {

    type() {
        return Object.assign({}, this.props.field.type, this.props.field.type.parameters as TType)
    }

    value() {
        return this.props.value;
    }

    notifyChanged(value) {
        this.props.store.propertyChanged(this.props.context.fieldLocator, this.value()())
    }
}