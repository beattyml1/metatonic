import * as React from "react";
import {BaseEditorModel} from "metatonic-core/src/index";
import {AnyTypeParameterType, SchemaField, SchemaType} from "metatonic-core/src/index";
import {getUniqueId} from "metatonic-core/src/index";
import {ComponentContext} from "metatonic-core/src/index";

export abstract class BaseFieldContextComponent<TParams extends { field: SchemaField, context: ComponentContext}, TState>
    extends React.Component<TParams, TState> {

    field() {
        return this.props.field;
    }

    uniqueId() {
        return getUniqueId(this.field(), this.props.context);
    }
}