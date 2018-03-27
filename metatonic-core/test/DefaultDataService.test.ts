import {getDefaultDataForField} from '../src/services/DefaultDataService';
import {exampleSchema} from "./TestSchema";
import {Decimal} from "../src/data/Decimal";
import {getFormSchemaFromJsonObject} from "../src/services/SchemaFromJsonService";
import {Date} from "../src/data/Date";
import {Integer} from "../src/data/Integer";

describe('getDefaultDataForField', () =>{
    it('should get setup example schema data properly', () => {
        let schema = getFormSchemaFromJsonObject(exampleSchema);
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
