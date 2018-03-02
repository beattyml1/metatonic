import * as ps from '../src/services/PropertySelection'
import {FormSchema} from "../src/domain/Schema/RootSchemas";
import {FormNavigator} from "../src/services/PropertySelection";
import {SchemaTypeCategory} from "../src/domain/Schema/SchemaEnums";
import {field} from "../src/decorators/MetatonicModelDecorator";
describe('FormNavigator', () => {
    let schema_ab1c = () => ({
        type: {
            category: SchemaTypeCategory.Record,
            parameters: {
                fields: [
                    { name: 'aa', type: {category: SchemaTypeCategory.Text}},
                    { name: 'a', type: {
                        category: SchemaTypeCategory.Record,
                        parameters: {
                            fields: [
                                { name: 'bb', type: {category: SchemaTypeCategory.Text}},
                                { name: 'b', multiple: true ,  type: {
                                    category: SchemaTypeCategory.Record,
                                    parameters: {
                                        fields: [
                                            { name: 'cc', type: {category: SchemaTypeCategory.Text}},
                                            { name: 'c', type: {
                                                category: SchemaTypeCategory.Text
                                            }}
                                        ]
                                    }
                                }}
                            ]
                        }
                    }}
                ]
            }
        }
    } as FormSchema);

    let data_ab1c = () =>({
        a: {
            b: [
                { c: 'greetings', cc: 'cc0' },
                { c: 'hello', cc: 'cc' }
            ],
            bb: 'bb'
        },
        aa: 'aa'
    });

    it('should be able to get a value from a.b.1.c', () => {
        let nav = new FormNavigator(schema_ab1c(), data_ab1c());
        let prop = nav.locate('a.b.1.c');
        let val = prop.getValue();
        expect(val).toBe('hello')
    })
    it('should be able to set a value for a.b.1.c', () => {
        let nav = new FormNavigator(schema_ab1c(), data_ab1c());
        let prop = nav.locate('a.b.1.c');
        let result = prop.setValue('hi');
        let val = result['a']['b'][1]['c'];
        expect(val).toBe('hi')
    })
    it('should be able to set a value for a.b.1.c and not change existing values', () => {
        let nav = new FormNavigator(schema_ab1c(), data_ab1c());
        let prop = nav.locate('a.b.1.c');
        let result = prop.setValue('hi');

        expect(result['a']['bb']).toBe('bb');
        expect(result['aa']).toBe('aa');
        expect(result['a']['b'][1]['cc']).toBe('cc');
        expect(result['a']['b'][0]['cc']).toBe('cc0');
    })
    it('should be able to get the field for a.b.1.c', () => {
        let nav = new FormNavigator(schema_ab1c(), data_ab1c());
        let prop = nav.locate('a.b.1.c');
        let field = prop.getField();
        expect(field.name).toBe('c');
    })
})