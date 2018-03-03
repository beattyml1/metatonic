import {formStateChanges} from '../src/state/FormStateChanges'
import {FormState} from "../src/domain/StateManagementTypes";
import {FieldState} from "../src/domain/FieldState/FieldState";
import {getDefaultFormState} from "../src/services/DefaultFormState";
import {exampleSchema} from "./TestSchema";
import {getDefaultDataForField} from "../src/services/DefaultDataService";
import {Integer} from "../src/Data/Integer";

describe('fullReload', () => {
    it('should not error on full reload', () => {
        let state = formStateChanges.fullReload({} as any, null as any, exampleSchema);
        expect(state).toBeTruthy();
    })
})
describe('propertyChanged', () => {
    it('should change the property referenced', () => {
        expect.assertions(2)
        let initialState = formStateChanges.fullReload({} as any, null as any, exampleSchema);
        let state = formStateChanges.propertyChanged(initialState, 'address.state', "PA");
        expect(state.formData).toHaveProperty('address.state');
        expect(state.formData.address.state).toBe('PA')
    })
    it('should not change other properties', () => {
        let initialState = formStateChanges.fullReload({} as any, null as any, exampleSchema);
        let state = formStateChanges.propertyChanged(initialState, 'address.state', "PA");
        state.formData.address.state = "";
        expect(state.formData).toMatchObject(initialState.formData)
    })
    it('should validate property', () => {
        let initialState = formStateChanges.fullReload({} as any, null as any, exampleSchema);
        let state = formStateChanges.propertyChanged(initialState, 'numberOfBedRooms', Integer.fromData("-1"));
        expect(state.formState.children['numberOfBedRooms'].validationMessages).toHaveLength(1);
    })
    it('should should not change other state', () => {
        let initialState = formStateChanges.fullReload({} as any, null as any, exampleSchema);
        let state = formStateChanges.propertyChanged(initialState, 'numberOfBedRooms', Integer.fromData("-1"));
        state.formState.children.numberOfBedRooms.validationMessages = [];
        expect(state.formState).toMatchObject(initialState.formState);
    })
})
describe('itemAdd', () => {
    it('should add a first to the end when no index specified', () => {
        expect.assertions(2)
        let initialState = formStateChanges.fullReload({} as any, null as any, exampleSchema);
        let ownersField = initialState.schema.type.parameters.fields.find(f => f.name === 'owners')!;
        let ownerItemField = Object.assign({}, ownersField, {multiple: false});
        let owner1 = getDefaultDataForField(ownerItemField);
        owner1.fullName = 'Jane Doe'
        let state = formStateChanges.itemAdded(initialState, 'owners', owner1);
        expect(state.formData.owners).toHaveLength(1)
        expect(state.formData.owners[0].fullName).toBe('Jane Doe')
    })
    it('should add a second item to the end when no index specified', () => {
        expect.assertions(2)
        let initialState = formStateChanges.fullReload({} as any, null as any, exampleSchema);
        let ownersField = initialState.schema.type.parameters.fields.find(f => f.name === 'owners')!;
        let ownerItemField = Object.assign({}, ownersField, {multiple: false});
        let owner1 = getDefaultDataForField(ownerItemField);
        owner1.fullName = 'Jane Doe'
        let owner2 = getDefaultDataForField(ownerItemField);
        owner2.fullName = 'John Smith'
        let state = formStateChanges.itemAdded(initialState, 'owners', owner1);
        state = formStateChanges.itemAdded(state, 'owners', owner2);
        expect(state.formData.owners).toHaveLength(2)
        expect(state.formData.owners[0].fullName).toBe('Jane Doe')
    })
    it('should add a second item to the index specified', () => {
        expect.assertions(2)
        let initialState = formStateChanges.fullReload({} as any, null as any, exampleSchema);
        let ownersField = initialState.schema.type.parameters.fields.find(f => f.name === 'owners')!;
        let ownerItemField = Object.assign({}, ownersField, {multiple: false});
        let owner1 = getDefaultDataForField(ownerItemField);
        owner1.fullName = 'Jane Doe'
        let owner2 = getDefaultDataForField(ownerItemField);
        owner2.fullName = 'John Smith'
        let state = formStateChanges.itemAdded(initialState, 'owners', owner1);
        state = formStateChanges.itemAdded(state, 'owners', owner2, 0);
        expect(state.formData.owners).toHaveLength(2)
        expect(state.formData.owners[0].fullName).toBe('John Smith')
    })
})

describe('itemRemoved', () => {
    it('should add a second item to the index specified', () => {
        expect.assertions(3)
        let initialState = formStateChanges.fullReload({} as any, null as any, exampleSchema);
        let ownersField = initialState.schema.type.parameters.fields.find(f => f.name === 'owners')!;
        let ownerItemField = Object.assign({}, ownersField, {multiple: false});
        let owner1 = getDefaultDataForField(ownerItemField);
        owner1.fullName = 'Jane Doe'
        let owner2 = getDefaultDataForField(ownerItemField);
        owner2.fullName = 'John Smith'
        let owner3 = getDefaultDataForField(ownerItemField);
        owner3.fullName = 'Tiny Tim'
        initialState.formData.owners = [owner1, owner2, owner3];

        let state = formStateChanges.itemRemoved(initialState, 'owners', 1);
        expect(state.formData.owners).toHaveLength(2)
        expect(state.formData.owners[0].fullName).toBe('Jane Doe');
        expect(state.formData.owners[1].fullName).toBe('Tiny Tim');
    })
})