import {createContext, getAllWithValue } from '../src'
import {getDefaultFormState} from "../src/services/DefaultFormState";
import {SchemaTypeCategory} from "../src/domain/Schema/SchemaEnums";

declare var require;
declare var it, describe;
declare var expect;

describe('getDefaultFormState', () => {
    let recordField = (name, fields) => ({
        name: name,
        type: {
            category: SchemaTypeCategory.Record,
            parameters: {
                fields: fields
            }
        }
    })
    it('should get set the children property recursively', () => {

        let formState = getDefaultFormState({
            category: SchemaTypeCategory.Record,
            parameters: {
                fields: [
                    recordField("a",
                    [
                        recordField("b",
                        [
                            {
                                name: "c",
                                type: { category: SchemaTypeCategory.Numeric}
                            }
                        ])
                    ])
                ]
            }
        } as any);
        expect(formState.children["a"]).toBeTruthy();
        expect(formState.children["a"].children).toBeTruthy();
        expect(formState.children["a"].children["b"]).toBeTruthy();
        expect(formState.children["a"].children["b"].children).toBeTruthy();
        expect(formState.children["a"].children["b"].children["c"]).toBeTruthy();
        expect(formState.children["a"].children["b"].children["c"].children).toBeTruthy();
    })

    it('should get set children property to an empty object on non records', () => {
        let formState = getDefaultFormState({
            type: {
                category: SchemaTypeCategory.Numeric
            }
        } as any);
        expect(formState.validationMessages).toHaveLength(0);
    })

    it('should get set validationMessages property to an empty array on non records', () => {
        let formState = getDefaultFormState({
            type: {
                category: SchemaTypeCategory.Numeric
            }
        } as any);
        expect(formState.validationMessages).toHaveLength(0);
    })

    it('should get set validationMessages property to an empty array on records', () => {
        let formState = getDefaultFormState({
            type: {
                category: SchemaTypeCategory.Record,
                parameters: {fields:[]}
            }
        } as any);
        expect(formState.validationMessages).toHaveLength(0);
    })
})
