import {max, min} from "../src/services/BuiltInValidations";
import {SchemaField} from "../src/domain/Schema/Records";
import {OptionalProps} from "../src/CoreTypes";
import {Integer} from "../src/Data/Integer";

let smaller = "1";
let bigger = "2";
let val = Integer.fromData;

describe('min', () => {
    it('return messages when value less than min', () => {
        let field = { min: bigger, name: "a", label: "ABC" } as OptionalProps<SchemaField> as any
        let messages = min(val(smaller), {} as any, field);
        expect(messages).toHaveLength(1);
    })
    it('return a message containing min val when value less than min', () => {
        let field = { min: bigger, name: "a", label: "ABC" } as OptionalProps<SchemaField> as any
        let messages = min(val(smaller), {} as any, field);
        expect(messages[0]).toContain(bigger);
    })
    it('return empty when value greater than min', () => {
        let field = { min: smaller, name: "a", label: "ABC" } as OptionalProps<SchemaField> as any
        let messages = min(val(bigger), {} as any, field);
        expect(messages).toHaveLength(0);
    })
    it('return empty when value equal to min', () => {
        let field = { min: smaller, name: "a", label: "ABC" } as OptionalProps<SchemaField> as any
        let messages = min(val(smaller), {} as any, field);
        expect(messages).toHaveLength(0);
    })
})

describe('max', () => {
    it('return messages when value greater than max', () => {
        let field = { max: smaller, name: "a", label: "ABC" } as OptionalProps<SchemaField> as any
        let messages = max(val(bigger), {} as any, field);
        expect(messages).toHaveLength(1);
    })
    it('return message containing max val when value greater than max', () => {
        let field = { max: smaller, name: "a", label: "ABC" } as OptionalProps<SchemaField> as any
        let messages = max(val(bigger), {} as any, field);
        expect(messages[0]).toContain(smaller);
    })
    it('return empty when value less than max', () => {
        let field = { max: bigger, name: "a", label: "ABC" } as OptionalProps<SchemaField> as any
        let messages = max(val(smaller), {} as any, field);
        expect(messages).toHaveLength(0);
    })
    it('return empty when value equal to max', () => {
        let field = { max: smaller, name: "a", label: "ABC" } as OptionalProps<SchemaField> as any
        let messages = max(val(smaller), {} as any, field);
        expect(messages).toHaveLength(0);
    })
})