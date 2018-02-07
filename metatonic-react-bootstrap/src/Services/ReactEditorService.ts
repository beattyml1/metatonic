import {BaseEditor} from "Editors/BaseEditor";
import * as React from "react";
import {SchemaEntryType, SchemaField} from "metatonic-core";
import * as Base from 'metatonic-core';
import {FormSchema} from "metatonic-core/src/index";

export type BaseEditorComponentClass = new () => BaseEditor<any, any, any, any>
export type LabelContainerClass = new () => React.Component<any, any>;
export type BaseRepeaterClass = new () => React.Component<any, any>

export class EditorRegistrationContext extends Base.EditorRegistrationContext<BaseEditorComponentClass, LabelContainerClass, BaseRepeaterClass>{
}

export const EditorService = new EditorRegistrationContext();
export const SelectorService = new EditorRegistrationContext();
export const MultiSelectorService = new EditorRegistrationContext();

export function getEditorComponents(field: SchemaField) {
    if (field.entryType === SchemaEntryType.entry) {
        return EditorService.getEditorParts(field.name, field.uiControlPreference);
    } else if (field.multiple) {
        return MultiSelectorService.getEditorParts(field.name, field.uiControlPreference)
    } else {
        return SelectorService.getEditorParts(field.name, field.uiControlPreference)
    }
}
