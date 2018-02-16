import {createContext, getAllWithValue } from '../src'

declare var require;
declare var it, describe;
declare var expect;

describe('createContext', () => {
    it('should handle empty field, with parent, with a repeater', () => {
        let context = createContext({} as any, {fieldLocator:"a.b"}, 1);
        expect(context.fieldLocator).toBe("a.b.1");
    })
    it('should handle a field, with parent, with a repeater', () => {
        let context = createContext({name:"c"} as any, {fieldLocator:"a.b"}, 1);
        expect(context.fieldLocator).toBe("a.b.1");
    })
    it('should handle a field, with parent, with no repeater', () => {
        let context = createContext({name:"c"} as any, {fieldLocator:"a.b"});
        expect(context.fieldLocator).toBe("a.b.c");
    })
    it('should handle a field, with no parent, with no repeater', () => {
        let context = createContext({name:"c"} as any);
        expect(context.fieldLocator).toBe("c");
    })
})