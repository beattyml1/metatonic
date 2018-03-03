import {getFormSchemaFromJsonObject} from '../src/services/SchemaFromJsonService'
import {
    RecordSchemaType, SchemaRecordTypeParameters, SchemaType,
    SchemaTypeGeneric
} from "../src/domain/Schema/Records";
import {SchemaTypeCategory} from "../src/domain/Schema/SchemaEnums";
import {exampleSchema} from "./TestSchema";
import {TextTypeParameters} from "../src/domain/Schema/TextTypes";

describe('getFormSchemaFromJsonObject', () => {
    let result = getFormSchemaFromJsonObject(exampleSchema);
    describe('given example real estate schema', () => {
        it('should not error', () =>
            expect(result).toBeTruthy())

        let homeParams = result.type.parameters;

        it('should have a root type properly configured', () =>
            expect(homeParams).toBeTruthy())

        let ownerField = homeParams.fields.find(f => f.name === 'owners')!;

        it('should have an owners field', () =>
            expect(ownerField).toBeTruthy())

        let ownerType = ownerField.type.parameters as SchemaRecordTypeParameters;

        it('should setup the type of the owners field', () =>
            expect(ownerType).toBeTruthy())

        let addressField = homeParams.fields.find(f => f.name === 'address')!;

        it('should have an address field', () =>
            expect(addressField).toBeTruthy())

        let addressType = ownerField.type.parameters as SchemaRecordTypeParameters;

        it('should setup the type of the address field', () =>
            expect(addressType).toBeTruthy())

        let ownerPhoneField = ownerType.fields.find(x => x.name === 'phone');
        it('should setup owner with phone field', () =>
            expect(ownerPhoneField).toBeTruthy())

        it('should have an owner phone type setup', () => expect(ownerPhoneField!.type).toBeTruthy())

        it('should have an owner phone with type phone and base type test', () => {
            expect(ownerPhoneField!.type.name).toBe('tel')
            expect(ownerPhoneField!.type.parentTypeNames[0]).toBe('text')
        })

        it('should have multiple set to true on owners', () =>
            expect(ownerField.multiple).toBe(true))
    })
})