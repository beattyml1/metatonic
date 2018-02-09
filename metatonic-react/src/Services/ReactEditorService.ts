import {BaseEditor} from "../Editors/BaseEditor";
import * as React from "react";
import {FormSchema} from "metatonic-core";
import {EditorSubContext} from "metatonic-core";
import {
    editorRegistry, multiEditRegistry,
    selectRegistry, EditorResolver
} from "metatonic-core";

export type BaseEditorComponentClass = new () => BaseEditor<any, any, any, any>
export type LabelContainerClass = new () => React.Component<any, any>;
export type BaseRepeaterClass = new () => React.Component<any, any>

export class ReactEditorResolver extends EditorResolver<BaseEditorComponentClass, LabelContainerClass, BaseRepeaterClass> {
    constructor(protected schema: FormSchema) {
        super(
            new EditorSubContext<BaseEditorComponentClass, LabelContainerClass, BaseRepeaterClass>(
                editorRegistry, schema, false),
            new EditorSubContext<BaseEditorComponentClass, LabelContainerClass, BaseRepeaterClass>(
                selectRegistry,schema, true),
            new EditorSubContext<BaseEditorComponentClass, LabelContainerClass, BaseRepeaterClass>(
                multiEditRegistry,schema, false)
        );
    }
}
