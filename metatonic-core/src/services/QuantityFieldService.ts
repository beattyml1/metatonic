import {SchemaField} from "domain/Schema/Records";
import {QuantityTypeParameters} from "domain/Schema/Quantities";
import {SchemaTypeCategory} from "domain/Schema/SchemaEnums";

export function getNumericField(quantityField: SchemaField): SchemaField {
    let quantityType = quantityField.type.parameters as QuantityTypeParameters;
    return {
        name: "value",
        type: {
            category: SchemaTypeCategory.Numeric,
            parameters: quantityType.numericFormat
        }
    } as SchemaField;
}