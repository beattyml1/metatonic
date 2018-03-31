import {BaseEditor} from "../Editors/BaseEditor";
import * as React from "react";
import {EditorResolver} from "metatonic-core";

export type BaseEditorComponentClass = new () => BaseEditor<any, any, any, any>
export type LabelContainerClass = new () => React.Component<any, any>;
export type BaseRepeaterClass = new () => React.Component<any, any>

export type ReactEditorResolver = EditorResolver<BaseEditorComponentClass, LabelContainerClass, BaseRepeaterClass>;
