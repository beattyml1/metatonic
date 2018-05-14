import {SchemaField} from "../domain/Schema/Records";
import {QuantityTypeParameters} from "../domain/Schema/Quantities";
import {SchemaTypeCategory} from "../domain/Schema/SchemaEnums";
import {NumericTypeInfo} from "../domain/Schema/Numerics";
import {NumericType} from "../domain/Schema/Records";

let id = 0;

export function getNumericField(quantityField: SchemaField): SchemaField {
    let quantityType = quantityField.type.parameters as QuantityTypeParameters;
    return {
        name: "value",
        typeName: 'Numeric',
        type: {
            name: 'Numeric',
            parentTypeNames: [],
            validations: [],
            id: `quant-num-type-${id++}`,
            label: 'Numeric',
            category: SchemaTypeCategory.Numeric,
            parameters: quantityType.numericFormat
        } as NumericType,
        id: `quant-num-field-${id++}`,
        uiUniqueId: `quant-num-field-${id++}`
    } as SchemaField;
}