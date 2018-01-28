import {BaseEditor} from "Editors/BaseEditor";
import * as React from "react";
import {SchemaEntryType, SchemaField} from "metatonic-core";
import * as Base from 'metatonic-core';

export type BaseEditorComponentClass = new () => BaseEditor<any, any, any, any>
export type LabelContainerClass = new () => React.Component<any, any>;

export class EditorRegistrationContext extends Base.EditorRegistrationContext<BaseEditorComponentClass, LabelContainerClass>{}

export var EditorService = new EditorRegistrationContext();
export var SelectorService = new EditorRegistrationContext();
export var MultiSelectorService = new EditorRegistrationContext();

export var registerEditor = EditorService.registerComponent;
export var registerSelector = SelectorService.registerComponent;
export var registerMultiSelector = MultiSelectorService.registerComponent;

export function getEditorComponents(field: SchemaField) {
    if (field.entryType === SchemaEntryType.entry) {
        return EditorService.getComponent(field.name, field.uiControlPreference);
    } else if (field.multiple) {
        return MultiSelectorService.getComponent(field.name, field.uiControlPreference)
    } else {
        return SelectorService.getComponent(field.name, field.uiControlPreference)
    }
}
