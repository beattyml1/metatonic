import {BaseEditor} from "../Editors/BaseEditor";
import * as React from "react";
import {FormSchema} from "metatonic-core";
import {EditorSubContext} from "metatonic-core";
import {
    editorRegistry, multiEditRegistry,
    selectRegistry, DefaultEditorResolver
} from "metatonic-core";

export type BaseEditorComponentClass = new () => BaseEditor<any, any, any, any>
export type LabelContainerClass = new () => React.Component<any, any>;
export type BaseRepeaterClass = new () => React.Component<any, any>

export class ReactEditorResolver extends DefaultEditorResolver<BaseEditorComponentClass, LabelContainerClass, BaseRepeaterClass> {

}
