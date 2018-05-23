import {LeftRight, UnitCategory} from "../src/domain/Schema/Quantities";
import {exampleSchema} from "./TestSchema";
import {Unit} from "../src/domain/Schema/Quantities";
import {ObjectDataStorage} from "../src/state/LocalStorageDataStore";

export const testDataStore = new ObjectDataStorage({
    $schema: exampleSchema,
    $units: [
        {
            key: 'dollars',
            abbreviation: '$',
            category: { name: 'currency', side: LeftRight.Left },
            fullNameSingular: 'Dollar',
            measurementSystem: {name:'US'},
            fullNamePlural: 'Dollars'
        }
    ] as Unit[],
    $unitCategories: [{ name: 'currency', side: LeftRight.Left }] as UnitCategory[]
});