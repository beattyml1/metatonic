import {editorConfig} from "../services/BaseEditorService";

export function editorFor(type: string, labeler: new (...args) => any, options: { uiHint?: string|string[], isDefault?: boolean }) {
    return function(constructor: Function) {
        if (!editorConfig.mainEditorRegistrationContext) throw "No main editor registration context created by View Binding library";

        editorConfig.mainEditorRegistrationContext.registerComponent(type, constructor, labeler, options.uiHint, options.isDefault);
    }
}