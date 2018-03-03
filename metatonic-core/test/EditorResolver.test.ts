import {EditorResolver, EditorSubContext} from "../src/services/EditorResolver";
import {EditorRegistry, editorRegistry, multiEditRegistry, selectRegistry} from "../src/services/EditorRegistry";
import {FormSchema} from "../src/domain/Schema/RootSchemas";
import {SchemaEntryType, SchemaTypeCategory} from "../src/domain/Schema/SchemaEnums";
import {NumericTypeInfo} from "../src/domain/Schema/Numerics";
import {RecordSchemaType, SchemaField, SchemaRecordTypeParameters} from "../src/domain/Schema/Records";
import {ItemCollectionSize} from "../src/domain/Schema/ItemSelectionType";

describe('EditorResolver', () => {
    function getResolver(schema: FormSchema) {
        return new EditorResolver(
            new EditorSubContext<any, any, any>(
                editorRegistry, schema, false),
            new EditorSubContext<any, any, any>(
                selectRegistry,schema, true),
            new EditorSubContext<any, any, any>(
                multiEditRegistry,schema, false));
    }

    function getDefaultSchema(): FormSchema {
        return {
            name: 'Form',
            label: 'Form',
            id: '1',
            typeName: 'MyType',
            type: {
                name: 'MyType',
                label: 'My Type',
                id: '2',
                customValidations:[],
                category: SchemaTypeCategory.Record,
                parentTypeNames: [],
                parameters: {  itemSearchUrl: '', fields: [], items: [], canAdd: false, size: ItemCollectionSize.Small }as SchemaRecordTypeParameters
            } ,
            types: {
                "MyType": {
                    name: 'MyType',
                    label: 'My Type',
                    id: '2',
                    customValidations:[],
                    category: SchemaTypeCategory.Record,
                    parentTypeNames: [],
                    parameters: {  itemSearchUrl: '', fields: [], items: [], canAdd: false, size: ItemCollectionSize.Small }as SchemaRecordTypeParameters
                }
            },
            customValidations: []
        };
    }

    function getDefaultField(): SchemaField {
        return {
            name: 'Field',
            label: 'Field',
            id: '1',
            uiUniqueId: "abc",
            customValidations: [],
            typeName:"MyType",
            uiControlPreference: "abc",
            entryType: SchemaEntryType.entry,
            type: {
                name: 'MyType',
                label: 'My Type',
                id: '2',
                customValidations:[],
                category: SchemaTypeCategory.Record,
                parentTypeNames: [],
                parameters: {  itemSearchUrl: '', fields: [], items: [], canAdd: false, size: ItemCollectionSize.Small }as SchemaRecordTypeParameters
            }
        }
    }

    afterEach(() => {
        editorRegistry.clearAll();
        selectRegistry.clearAll()
        multiEditRegistry.clearAll();
    })

    it('should resolve with one item entered with no hints', () => {
        let resolver = getResolver(getDefaultSchema())
        editorRegistry.registerComponent("MyType", class Editor{}, class Labeler{}, {

        });
        let components = resolver.getEditorComponents(getDefaultField())!;
        expect(components.labeler.name).toBe("Labeler")
        expect(components.editor.name).toBe("Editor")
    })

    it('should resolve with two item entered with hints', () => {
        let resolver = getResolver(getDefaultSchema())
        editorRegistry.registerComponent("MyType", class Editor1{}, class Labeler1{}, {
            uiHint: "123"
        });
        editorRegistry.registerComponent("MyType", class Editor2{}, class Labeler2{}, {
            uiHint: ["abc", "xyz"]
        });
        let components = resolver.getEditorComponents(getDefaultField())!;
        expect(components.labeler.name).toBe("Labeler2")
        expect(components.editor.name).toBe("Editor2")
    })

    it('should resolve with two item based on default', () => {
        let resolver = getResolver(getDefaultSchema())
        editorRegistry.registerComponent("MyType", class Editor1{}, class Labeler1{}, {

        });
        editorRegistry.registerComponent("MyType", class Editor2{}, class Labeler2{}, {
            isDefault: true
        });
        let components = resolver.getEditorComponents(getDefaultField())!;
        expect(components.labeler.name).toBe("Labeler2")
        expect(components.editor.name).toBe("Editor2")
    })

    it('should auto resolve select based on size', () => {
        let resolver = getResolver(getDefaultSchema())
        selectRegistry.registerComponent("MyType", class Editor1{}, class Labeler1{}, {
            uiHint: "search"
        });
        selectRegistry.registerComponent("MyType", class Editor2{}, class Labeler2{}, {
            uiHint: "radio"
        });
        let field = Object.assign({}, getDefaultField(), { uiControlPreference: "", entryType: SchemaEntryType.selection });
        let components = resolver.getEditorComponents(field)!;
        expect(components.labeler.name).toBe("Labeler2")
        expect(components.editor.name).toBe("Editor2")
    })

    it('should resolve to the first editor added if no hint or default', () => {
        let resolver = getResolver(getDefaultSchema())
        editorRegistry.registerComponent("MyType", class Editor1{}, class Labeler1{}, {

        });
        editorRegistry.registerComponent("MyType", class Editor2{}, class Labeler2{}, {

        });
        let components = resolver.getEditorComponents(getDefaultField())!;
        expect(components.labeler.name).toBe("Labeler1")
        expect(components.editor.name).toBe("Editor1")
    })

    it('should resolve resolve a multi editor when set', () => {
        let resolver = getResolver(getDefaultSchema())
        multiEditRegistry.registerComponent("MyType", class Editor1{}, class Labeler1{}, {

        });
        let field = Object.assign({}, getDefaultField(), { multiple: true });
        let components = resolver.getEditorComponents(field)!;
        expect(components.labeler.name).toBe("Labeler1")
        expect(components.editor.name).toBe("Editor1")
    })
})