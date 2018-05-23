import {getDefaultDataForField} from '../src/services/DefaultDataService';
import {exampleSchema} from "./TestSchema";
import {Decimal} from "../src/data/Decimal";
import {getFormSchemaFromJsonObject} from "../src/services/SchemaFromJsonService";
import {Date} from "../src/data/Date";
import {Integer} from "../src/data/Integer";
import {FormAsyncMethods} from "../src/state/FormAsyncMethods";
import {MetatonicContext} from "../src/MetatonicApp.interfaces";
import {ObjectDataStorage} from "../src/state/LocalStorageDataStore";
import {Unit, UnitCategory} from "../src/domain/Schema/Quantities";
import {testDataStore} from "./TestDataStore";

describe('getDefaultDataForField', () =>{
    it('should get setup example schema data properly', async () => {
        expect.assertions(1)
        let schema = getFormSchemaFromJsonObject(exampleSchema);
        let asyncMethods = new FormAsyncMethods({dataStore: testDataStore} as MetatonicContext);

        await asyncMethods.addAsyncSchemaInfo(schema)

        let data = getDefaultDataForField(schema);
        expect(data).toMatchObject({
            owners:[],
            address: {
                address1: "",
                address2: "",
                city: "",
                state: "",
                zip: ""
            },
            numberOfBedRooms: Integer.fromData(""),
            askingPrice: { value: Decimal.fromData(""), unit: "dollars" },
            datePutOnSale: Date.fromData("")
        })
    })
})
