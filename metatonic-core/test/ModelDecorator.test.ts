import {model, field, list, valueType, clearTsModels, getTsModels} from '../src/decorators/MetatonicModelDecorator';
import {MetatonicType, SchemaEntryType} from "../src/domain/Schema/SchemaEnums";
import {Integer} from "../src/Data/Integer";


describe('model', () => {
    afterEach(clearTsModels);

    it('should add the model with no parent classes and no options', () => {
        @model()
        class MyModel {}
        expect(getTsModels()).toHaveLength(1)
        expect(getTsModels()[0].name).toBe('MyModel');
        expect(getTsModels()[0].parentTypeNames).toHaveLength(0)
    })
    it('should add set parentTypeNames when there are parent classes ', () => {
        class BaseModel {}
        @model()
        class MyModel extends BaseModel {}
        expect(getTsModels()).toHaveLength(1)
        expect(getTsModels()[0].name).toBe('MyModel');
        expect(getTsModels()[0].parentTypeNames).toHaveLength(1);
        expect(getTsModels()[0].parentTypeNames).toContain('BaseModel');
    })
    it('should add the model with options', () => {
        @model('Label', {
            uiControlPreference: 'hint',
            canAdd: true,
            itemSearchUrl: '/hey'
        })
        class MyModel {}
        expect(getTsModels()).toHaveLength(1)
        expect(getTsModels()[0].label).toBe('Label');
        expect(getTsModels()[0].parameters.canAdd).toBe(true);
        expect(getTsModels()[0].parameters.itemSearchUrl).toBe('/hey');
        expect(getTsModels()[0].uiControlPreference).toBe('hint');
    })
})

describe('field', () => {
    afterEach(clearTsModels);
    it('should add to an existing model if it exists', () => {
        @model('My Model')
        class MyModel {
            @field("text", "My Field", SchemaEntryType.entry)
            myField;
        }
        expect(getTsModels()).toHaveLength(1);
        expect(getTsModels()[0].label).toBe('My Model');
        expect(getTsModels()[0].parameters.fields).toHaveLength(1);
    })

    it('should create a new model entry if none exists', () => {
        class MyModel {
            @field("text", "My Field", SchemaEntryType.entry)
            myField;
        }
        expect(getTsModels()).toHaveLength(1);
        expect(getTsModels()[0].parameters.fields).toHaveLength(1);
    })

    it('should set the typeName from a string', () => {
        class MyModel {
            @field("text", "My Field", SchemaEntryType.entry)
            myField;
        }
        expect(getTsModels()).toHaveLength(1);
        expect(getTsModels()[0].parameters.fields).toHaveLength(1);
        expect(getTsModels()[0].parameters.fields[0].typeName).toBe("text");
    })

    it('should set the typeName from a string', () => {
        class MyModel {
            @field(Integer, "My Field", SchemaEntryType.entry)
            myField;
        }
        expect(getTsModels()).toHaveLength(1);
        expect(getTsModels()[0].parameters.fields).toHaveLength(1);
        expect(getTsModels()[0].parameters.fields[0].typeName).toBe("Integer");
    })

    it('should work for multiple fields', () => {
        class MyModel {
            @field("text", "My Field", SchemaEntryType.entry)
            field1;
            @field("text", "My Field", SchemaEntryType.entry)
            field2;
        }
        expect(getTsModels()).toHaveLength(1);
        expect(getTsModels()[0].parameters.fields).toHaveLength(2);
        expect(getTsModels()[0].parameters.fields[0].name).toBe("field1");
        expect(getTsModels()[0].parameters.fields[1].name).toBe("field2");
    })

    it('should set the label', () => {
        class MyModel {
            @field("text", "My Field", SchemaEntryType.entry)
            myField;
        }
        expect(getTsModels()).toHaveLength(1);
        expect(getTsModels()[0].parameters.fields).toHaveLength(1);
        expect(getTsModels()[0].parameters.fields[0].label).toBe("My Field");
    })

    it('should set additional properties from options', () => {
        class MyModel {
            @field("text", "My Field", SchemaEntryType.entry, { required: true })
            myField;
        }
        expect(getTsModels()).toHaveLength(1);
        expect(getTsModels()[0].parameters.fields).toHaveLength(1);
        expect(getTsModels()[0].parameters.fields[0].required).toBe(true);
    })
});