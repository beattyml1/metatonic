import {editorRegistry} from "../src/services/EditorRegistry";
import {editorFor} from "../src/decorators/editorDecorator";

describe('editorDecorator',() => {
    afterEach(() => editorRegistry.clearAll())
    it('should add a the editor for a string type', () => {
        @editorFor('Xyz', class Labeler{})
        class Abc {

        }

        expect(editorRegistry.editorRegistrations['Xyz']).toBeTruthy()
        expect(editorRegistry.editorRegistrations['Xyz'].availableComponents).toBeTruthy()
    })

    it('should add a the editor for a class type', () => {
        @editorFor(class MyClass{}, class Labeler{})
        class Abc {

        }

        expect(editorRegistry.editorRegistrations['MyClass']).toBeTruthy()
        expect(editorRegistry.editorRegistrations['MyClass'].availableComponents).toBeTruthy()
    })
})