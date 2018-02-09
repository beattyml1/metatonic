import {BaseEditor} from "../Editors/BaseEditor";
import * as React from "react";
import {SchemaEntryType, SchemaField} from "metatonic-core";
import * as Base from 'metatonic-core';
import {FormSchema} from "metatonic-core/src/index";
import {EditorSubContext} from "metatonic-core";
import {editorConfig} from "../../../metatonic-core/src/services/BaseEditorService";

export type BaseEditorComponentClass = new () => BaseEditor<any, any, any, any>
export type LabelContainerClass = new () => React.Component<any, any>;
export type BaseRepeaterClass = new () => React.Component<any, any>

export class EditorContext extends Base.EditorContext<BaseEditorComponentClass, LabelContainerClass, BaseRepeaterClass> {

    constructor(protected schema: FormSchema) {
        super(
            new EditorSubContext<BaseEditorComponentClass, LabelContainerClass, BaseRepeaterClass>(
                editorConfig.mainEditorRegistrationContext, schema, false),
            new EditorSubContext<BaseEditorComponentClass, LabelContainerClass, BaseRepeaterClass>(
                editorConfig.mainSelectRegistrationContext,schema, true),
            new EditorSubContext<BaseEditorComponentClass, LabelContainerClass, BaseRepeaterClass>(
                editorConfig.mainMultiEditorRegistrationContext,schema, false)
            );
    }
}
