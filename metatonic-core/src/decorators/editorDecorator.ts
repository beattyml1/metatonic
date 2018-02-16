import {editorRegistry, EditorRegistry, multiEditRegistry, selectRegistry} from "../services/EditorRegistry";

function editorRegistrationDecorator(registry: EditorRegistry<any, any, any>) {
    return function(type: string, labeler: new (...args) => any, options?: { uiHint?: string|string[], isDefault?: boolean, repeater?: new (...args) => any }) {
        return function(constructor: Function) {
            editorRegistry.registerComponent(type, constructor, labeler, options);
        }
    }
}

export const editorFor = editorRegistrationDecorator(editorRegistry);
export const multiEditorFor = editorRegistrationDecorator(multiEditRegistry);
export const selectFor = editorRegistrationDecorator(selectRegistry);