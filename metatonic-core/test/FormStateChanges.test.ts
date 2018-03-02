import {formStateChanges} from '../src/state/FormStateChanges'
import {FormState} from "../src/domain/StateManagementTypes";
import {FieldState} from "../src/domain/FieldState/FieldState";
import {getDefaultFormState} from "../src/services/DefaultFormState";
import {exampleSchema} from "./TestSchema";

describe('fullReload', () => {
    it('should not error on full reload', () => {
        let state = formStateChanges.fullReload({} as any, {}, exampleSchema);
        expect(state).toBeTruthy();
    })
})
describe('propertyChanged', () => {
    it('should change the property referenced', () => {

    })
})