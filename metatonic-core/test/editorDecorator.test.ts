import {defaultComponentRegistry} from "../src/services/EditorRegistry";
import {editorFor} from "../src/decorators/editorDecorator";

describe('editorDecorator',() => {
    afterEach(() => defaultComponentRegistry.editors.clearAll())
    it('should add a the editor for a string type', () => {
        @editorFor('Xyz', class Labeler{})
        class Abc {

        }

        expect(defaultComponentRegistry.editors.editorRegistrations['Xyz']).toBeTruthy()
        expect(defaultComponentRegistry.editors.editorRegistrations['Xyz'].availableComponents).toBeTruthy()
    })

    it('should add a the editor for a class type', () => {
        @editorFor(class MyClass{}, class Labeler{})
        class Abc {

        }

        expect(defaultComponentRegistry.editors.editorRegistrations['MyClass']).toBeTruthy()
        expect(defaultComponentRegistry.editors.editorRegistrations['MyClass'].availableComponents).toBeTruthy()
    })
})