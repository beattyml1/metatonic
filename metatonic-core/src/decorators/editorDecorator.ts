import {editorConfig} from "../services/BaseEditorService";

export function editorFor(type: string, labeler: new (...args) => any, options?: { uiHint?: string|string[], isDefault?: boolean, repeater?: new (...args) => any }) {
    return function(constructor: Function) {
        if (!editorConfig.mainEditorRegistrationContext) throw "No main editor registration context created by View Binding library";

        editorConfig.mainEditorRegistrationContext.registerComponent(type, constructor, labeler, options);
    }
}

export function multiEditorFor(type: string, labeler: new (...args) => any, options?: { uiHint?: string|string[], isDefault?: boolean, repeater?: new (...args) => any }) {
    return function(constructor: Function) {
        if (!editorConfig.mainMultiEditorRegistrationContext) throw "No main editor registration context created by View Binding library";

        editorConfig.mainMultiEditorRegistrationContext.registerComponent(type, constructor, labeler, options);
    }
}

export function selectorFor(type: string, labeler: new (...args) => any, options?: { uiHint?: string|string[], isDefault?: boolean, repeater?: new (...args) => any }) {
    return function(constructor: Function) {
        if (!editorConfig.mainEditorRegistrationContext) throw "No main editor registration context created by View Binding library";

        editorConfig.mainEditorRegistrationContext.registerComponent(type, constructor, labeler, options);
    }
}