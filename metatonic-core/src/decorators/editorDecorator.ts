import {editorRegistry, multiEditRegistry, selectRegistry} from "../services/EditorRegistry";

export function editorFor(type: string, labeler: new (...args) => any, options?: { uiHint?: string|string[], isDefault?: boolean, repeater?: new (...args) => any }) {
    return function(constructor: Function) {
        editorRegistry.registerComponent(type, constructor, labeler, options);
    }
}

export function multiEditorFor(type: string, labeler: new (...args) => any, options?: { uiHint?: string|string[], isDefault?: boolean, repeater?: new (...args) => any }) {
    return function(constructor: Function) {
        multiEditRegistry.registerComponent(type, constructor, labeler, options);
    }
}

export function selectFor(type: string, labeler: new (...args) => any, options?: { uiHint?: string|string[], isDefault?: boolean, repeater?: new (...args) => any }) {
    return function(constructor: Function) {
        selectRegistry.registerComponent(type, constructor, labeler, options);
    }
}