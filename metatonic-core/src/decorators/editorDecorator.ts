import {editorRegistry, EditorRegistry, multiEditRegistry, selectRegistry} from "../services/EditorRegistry";

function editorRegistrationDecorator(registry: EditorRegistry<any, any, any>) {
    return function(
        type: string| (new (...args) => any),
        labeler: new (...args) => any,
        options?: {
            uiHint?: string|string[],
            isDefault?: boolean,
            repeater?: new (...args) => any
        }) {
        let typeStr = typeof type === "string" ? type :
                      typeof type === "function" ? type.name : "";

        return function(constructor: Function) {
            editorRegistry.registerComponent(typeStr, constructor, labeler, options);
        }
    }
}

export const editorFor = editorRegistrationDecorator(editorRegistry);
export const multiEditorFor = editorRegistrationDecorator(multiEditRegistry);
export const selectFor = editorRegistrationDecorator(selectRegistry);