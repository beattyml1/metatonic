import {EditorResolver, getEditorResolverContext} from "../src/services/EditorResolver";
import {EditorRegistry, defaultComponentRegistry} from "../src/services/EditorRegistry";
import {FormSchema} from "../src/domain/Schema/RootSchemas";
import {SchemaEntryType, SchemaTypeCategory} from "../src/domain/Schema/SchemaEnums";
import {NumericTypeInfo} from "../src/domain/Schema/Numerics";
import {RecordSchemaType, SchemaField, SchemaRecordTypeParameters} from "../src/domain/Schema/Records";
import {ItemCollectionSize} from "../src/domain/Schema/ItemSelectionType";

describe('EditorResolver', () => {
    function getResolver(schema: FormSchema) {
        return getEditorResolverContext(defaultComponentRegistry, schema);
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
                validations:[],
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
            validations: []
        };
    }

    function getDefaultField(): SchemaField {
        return {
            name: 'Field',
            label: 'Field',
            id: '1',
            uiUniqueId: "abc",
            validations: [],
            typeName:"MyType",
            uiControlPreference: "abc",
            entryType: SchemaEntryType.entry,
            type: {
                name: 'MyType',
                label: 'My Type',
                id: '2',
                validations:[],
                category: SchemaTypeCategory.Record,
                parentTypeNames: [],
                parameters: {  itemSearchUrl: '', fields: [], items: [], canAdd: false, size: ItemCollectionSize.Small }as SchemaRecordTypeParameters
            }
        }
    }

    afterEach(() => {
        defaultComponentRegistry.editors.clearAll();
        defaultComponentRegistry.selects.clearAll()
        defaultComponentRegistry.multiEdits.clearAll();
    })

    it('should resolve with one item entered with no hints', () => {
        let resolver = getResolver(getDefaultSchema())
        defaultComponentRegistry.editors.registerComponent("MyType", class Editor{}, class Labeler{}, {

        });
        let components = resolver.getEditorComponents(getDefaultField())!;
        expect(components.labeler.name).toBe("Labeler")
        expect(components.editor.name).toBe("Editor")
    })

    it('should resolve with two item entered with hints', () => {
        let resolver = getResolver(getDefaultSchema())
        defaultComponentRegistry.editors.registerComponent("MyType", class Editor1{}, class Labeler1{}, {
            uiHint: "123"
        });
        defaultComponentRegistry.editors.registerComponent("MyType", class Editor2{}, class Labeler2{}, {
            uiHint: ["abc", "xyz"]
        });
        let components = resolver.getEditorComponents(getDefaultField())!;
        expect(components.labeler.name).toBe("Labeler2")
        expect(components.editor.name).toBe("Editor2")
    })

    it('should resolve with two item based on default', () => {
        let resolver = getResolver(getDefaultSchema())
        defaultComponentRegistry.editors.registerComponent("MyType", class Editor1{}, class Labeler1{}, {

        });
        defaultComponentRegistry.editors.registerComponent("MyType", class Editor2{}, class Labeler2{}, {
            isDefault: true
        });
        let components = resolver.getEditorComponents(getDefaultField())!;
        expect(components.labeler.name).toBe("Labeler2")
        expect(components.editor.name).toBe("Editor2")
    })

    it('should auto resolve select based on size', () => {
        let resolver = getResolver(getDefaultSchema())
        defaultComponentRegistry.selects.registerComponent("MyType", class Editor1{}, class Labeler1{}, {
            uiHint: "search"
        });
        defaultComponentRegistry.selects.registerComponent("MyType", class Editor2{}, class Labeler2{}, {
            uiHint: "radio"
        });
        let field = Object.assign({}, getDefaultField(), { uiControlPreference: "", entryType: SchemaEntryType.selection });
        let components = resolver.getEditorComponents(field)!;
        expect(components.labeler.name).toBe("Labeler2")
        expect(components.editor.name).toBe("Editor2")
    })

    it('should resolve to the first editor added if no hint or default', () => {
        let resolver = getResolver(getDefaultSchema())
        defaultComponentRegistry.editors.registerComponent("MyType", class Editor1{}, class Labeler1{}, {

        });
        defaultComponentRegistry.editors.registerComponent("MyType", class Editor2{}, class Labeler2{}, {

        });
        let components = resolver.getEditorComponents(getDefaultField())!;
        expect(components.labeler.name).toBe("Labeler1")
        expect(components.editor.name).toBe("Editor1")
    })

    it('should resolve resolve a multi editor when set', () => {
        let resolver = getResolver(getDefaultSchema())
        defaultComponentRegistry.multiEdits.registerComponent("MyType", class Editor1{}, class Labeler1{}, {

        });
        let field = Object.assign({}, getDefaultField(), { multiple: true });
        let components = resolver.getEditorComponents(field)!;
        expect(components.labeler.name).toBe("Labeler1")
        expect(components.editor.name).toBe("Editor1")
    })
})