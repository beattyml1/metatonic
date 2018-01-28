import * as React from "react";
import {SchemaField} from "metatonic-core";
import {BaseFieldContextComponent} from "BaseFieldContextComponent";
import {ComponentContext} from "metatonic-core";

export abstract class LabeledEditorContainer extends BaseFieldContextComponent<{ field: SchemaField, context: ComponentContext }, void> {
    content() {
        return (this.props as any).children;
    }

    label() {
        return this.props.field.label;
    }
}