import { EditorRegistry } from '../src/services/EditorRegistry';

describe('EditorRegistry', () => {
    it('should register a single component with no hints', () => {
        let registry = new EditorRegistry();
        registry.registerComponent("Abc", class Editor{}, class Labeler{}, {

        })
        expect(registry.editorRegistrations["Abc"]).toBeTruthy()
        expect(registry.editorRegistrations["Abc"].availableComponents).toHaveLength(1)
        expect(registry.editorRegistrations["Abc"].availableComponents[0].labeler.name).toBe("Labeler")
        expect(registry.editorRegistrations["Abc"].availableComponents[0].editor.name).toBe("Editor")
    })
    it('should register a single component with 1 hints', () => {
        let registry = new EditorRegistry();
        registry.registerComponent("Abc", class Editor{}, class Labeler{}, {
            uiHint: "abc"
        })
        expect(registry.editorRegistrations["Abc"]).toBeTruthy()
        expect(registry.editorRegistrations["Abc"].uiHintMap["abc"]).toBeTruthy()
    })
    it('should register a single component with 3 hints', () => {
        let registry = new EditorRegistry();
        registry.registerComponent("Abc", class Editor{}, class Labeler{}, {
            uiHint: ["abc", "xyz"]
        })
        expect(registry.editorRegistrations["Abc"].uiHintMap["xyz"]).toBeTruthy()
    })
    it('should clear all when needed', () => {
        let registry = new EditorRegistry();
        registry.registerComponent("Abc", class Editor{}, class Labeler{}, {

        })
        registry.clearAll();

        expect(registry.editorRegistrations["Abc"]).toBeFalsy()
    })
})