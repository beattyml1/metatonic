import * as IdGen from '../src/services/IdGeneratorService'
import {addUniqueIdsToChildren} from "../src/services/IdGeneratorService";
import {SchemaTypeCategory} from "../src/domain/Schema/SchemaEnums";

declare const require;
declare const it, describe;
declare const expect;

describe('getFieldUniqueId', () => {
    it('should handle two repeaters directly nested' , () => {
        let uid = IdGen.getUniqueId({
            name: 'abc',
            uiUniqueId: 'xyz-'
        } as any, { repeaterIndex:1, parentContext: { repeaterIndex: 2}} as any);
        expect(uid).toBe('xyz-r1r2')

    })
    it('should handle two repeaters indirectly nested' , () => {
        let uid = IdGen.getUniqueId({
            name: 'abc',
            uiUniqueId: 'xyz-'
        } as any, { repeaterIndex:1, parentContext: { parentContext:  { repeaterIndex: 2 } }} as any)
        expect(uid).toBe('xyz-r1r2')
    })
    it('should handle a single repeater indirectly nested' , () => {
        let uid = IdGen.getUniqueId({
            name: 'abc',
            uiUniqueId: 'xyz-'
        } as any, { parentContext:  { repeaterIndex: 2 } } as any)
        expect(uid).toBe('xyz-r2')
    })
    it('should handle a single repeater directly nested' , () => {
        let uid = IdGen.getUniqueId({
            name: 'abc',
            uiUniqueId: 'xyz-'
        } as any, { repeaterIndex: 2 } as any )
        expect(uid).toBe('xyz-r2')
    })
    it('should handle no repeaters' , () => {
        let uid = IdGen.getUniqueId({
            name: 'abc',
            uiUniqueId: 'xyz-'
        } as any, { parentContext: {} } as any )
        expect(uid).toBe('xyz-')
    })
});

describe('addUniqueIdsToChildren', () => {
    it('should handle a single direct child', () => {
       let fieldInitial = {
           type: { category: SchemaTypeCategory.Record, parameters: { fields: [
               { type: { category: SchemaTypeCategory.Numeric } }
           ]}}
       } as any;
       let fieldAfter = addUniqueIdsToChildren(fieldInitial, 'a-');
       expect(fieldAfter.type.parameters.fields[0].uiUniqueId).toBe('a-f0')
    });
    it('should handle a multiple direct child', () => {
        let fieldInitial = {
            type: { category: SchemaTypeCategory.Record, parameters: { fields: [
                { type: { category: SchemaTypeCategory.Numeric } },
                { type: { category: SchemaTypeCategory.Numeric } }
            ]}}
        } as any;
        let fieldAfter = addUniqueIdsToChildren(fieldInitial, 'a-');
        expect(fieldAfter.type.parameters.fields[0].uiUniqueId).toBe('a-f0')
        expect(fieldAfter.type.parameters.fields[1].uiUniqueId).toBe('a-f1')
    });
    it('should handle a multiple nested child', () => {
        let fieldInitial = {
            type: { category: SchemaTypeCategory.Record, parameters: { fields: [
                { type: { category: SchemaTypeCategory.Numeric } },
                { type: { category: SchemaTypeCategory.Record, parameters: { fields: [
                    { type: { category: SchemaTypeCategory.Numeric } },
                    { type: { category: SchemaTypeCategory.Numeric } }
                ]}} }
            ]}}
        } as any;
        let fieldAfter = addUniqueIdsToChildren(fieldInitial, 'a-');
        expect(fieldAfter.type.parameters.fields[0].uiUniqueId).toBe('a-f0')
        expect(fieldAfter.type.parameters.fields[1].uiUniqueId).toBe('a-f1')
        expect(fieldAfter.type.parameters.fields[1].type.parameters.fields[0].uiUniqueId).toBe('a-f1f0')
        expect(fieldAfter.type.parameters.fields[1].type.parameters.fields[1].uiUniqueId).toBe('a-f1f1')
    });
})