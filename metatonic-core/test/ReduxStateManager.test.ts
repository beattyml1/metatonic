import {startNewFormStateManager} from '../src/state/ReduxStateManager';
import {FormState} from "../src/domain/StateManagementTypes";
import {FormSchema} from "../src/domain/Schema/RootSchemas";
import {exampleSchema} from "./TestSchema";
import {getFormSchemaFromJsonObject} from "../src/services/SchemaFromJsonService";
import {Integer} from "../src/data/Integer";
import {getDefaultDataForField} from "../src/services/DefaultDataService";
import {addUniqueIdsToChildren} from "../src/services/IdGeneratorService";

describe('ReduxStateManager', () => {
    it('should handle initial load', () => {
        let stateManager = startNewFormStateManager();
        stateManager.fullReload(null, exampleSchema)
        let x = stateManager.store.getState();
        expect(x.schema).toMatchObject(addUniqueIdsToChildren(getFormSchemaFromJsonObject(exampleSchema), "")); // TODO : better way to do this
        expect(x.formData).toBeTruthy();
        expect(x.formState).toBeTruthy();
    })
    it('should handle property change', () => {
        let stateManager = startNewFormStateManager();
        stateManager.fullReload(null, exampleSchema)
        stateManager.propertyChanged('numberOfBedRooms', Integer.fromData("1"))
        let x = stateManager.store.getState().formData.numberOfBedRooms;
        expect(x.value).toBe(1);
    })
    it('should handle item added', () => {
        let stateManager = startNewFormStateManager();
        stateManager.fullReload(null, exampleSchema)
        stateManager.itemAdded('owners', {})
        let x = stateManager.store.getState().formData.owners;
        expect(x).toHaveLength(1);
    })

    it('should handle item removed', () => {
        let stateManager = startNewFormStateManager();
        stateManager.fullReload(null, exampleSchema)
        stateManager.itemAdded('owners', {})
        stateManager.itemRemoved('owners', 0)
        let x = stateManager.store.getState().formData.owners;
        expect(x).toHaveLength(0);
    })
})