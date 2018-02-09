import * as React from "react";
import {BaseEditorModel} from "metatonic-core";
import {AnyTypeParameterType, SchemaField, SchemaType} from "metatonic-core";
import {getUniqueId} from "metatonic-core";
import {ComponentContext} from "metatonic-core";

export abstract class BaseFieldContextComponent<TParams extends { field: SchemaField, context: ComponentContext}, TState = {}>
    extends React.Component<TParams, TState> {

    field() {
        return this.props.field;
    }

    uniqueId() {
        return getUniqueId(this.field(), this.props.context);
    }
}