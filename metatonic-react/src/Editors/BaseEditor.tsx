import * as React from "react";
// noinspection ES6UnusedImports
import {
    BaseEditorModel,
    MetatonicFormEventDispatcher,
    ValidationSeverity,
    AnyTypeParameterType, SchemaType,
    ComponentContext,
    SchemaField
} from "metatonic-core";
import {BaseFieldContextComponent} from "../BaseFieldContextComponent";

export abstract class BaseEditor
    <TData,
     TType extends AnyTypeParameterType,
     TParams extends BaseEditorModel<TData>,
     TState = {}>
    extends BaseFieldContextComponent<TParams, TState> {

    fieldLocator() {
        return this.props.context.fieldLocator
    }

    formDispatcher(): MetatonicFormEventDispatcher {
        return this.props.resources.formDispatcher;
    }

    type() {
        return Object.assign({}, this.props.field.type, this.props.field.type.parameters as TType)
    }

    value() {
        return this.props.value;
    }

    notifyChanged(value) {
        this.props.resources.formDispatcher.propertyChanged({
            propertySelector: this.fieldLocator(),
            value: this.value()
        })
    }

    primaryInputAriaAttributes() {
        return {
        }
    }
}