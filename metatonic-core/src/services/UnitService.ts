import {PersistentDataStore} from "../state/PersistentDataStore";
import {QuantityType, SchemaField} from "../domain/Schema/Records";
import {QuantityTypeParameters} from "../domain/Schema/Quantities";
import {SchemaTypeCategory} from "../domain/Schema/SchemaEnums";

export class UnitService {
    constructor(public dataStore: PersistentDataStore) {

    }

    async addUnitData(field: SchemaField) {
        if (field.type.category !== SchemaTypeCategory.Quantity) return Promise.resolve();

        let type = field.type as QuantityType;
        let unitSpec = type.parameters.unitSource;
        let isFixedUnit = !!unitSpec.unitKey;
        if (isFixedUnit) {
            unitSpec.unit = await this.dataStore.unit(unitSpec.unitKey);
        } else {
            if (unitSpec.unitCategoryName && !unitSpec.unitCategory) {
                unitSpec.unitCategory = await this.dataStore.unitCategory(unitSpec.unitCategoryName);
            }

            if (!unitSpec.units) {
                unitSpec.units = await this.dataStore.units({
                    category: unitSpec.unitCategoryName,
                    measurementSystem: unitSpec.measurementSystemName,
                    group: unitSpec.groupName
                })
            }
        }
    }
}