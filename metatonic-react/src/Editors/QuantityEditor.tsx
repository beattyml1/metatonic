import * as React from "react";
import InputFieldLabelAndContainer, {default as InputBoxLabelContainer} from "../LabeledFieldContainers/InputFieldLabelAndContainer";
import {BaseEditor} from "./BaseEditor";
import {NumericEditor} from "./NumericEditor";
import {
    getNumericField,
    editorFor,
    SchemaField,
    fieldEditorClasses,
    createContext,
    UnitCategory,
    Unit,
    QuantityType,
    QuantityEditorProperties,
    LeftRight,
    UnitCategoryData,
    Quantity,
    QuantityTypeParameters,
} from "metatonic-core";

export class SelectUnit extends React.Component<{ category: UnitCategory, units:Unit[], side: LeftRight, unit?: string, field: SchemaField }, {}> {
    render() {
        return (
            <select
                className={`unit ${this.props.side === LeftRight.Right ? 'right' : 'left'} ${this.props.field.name}-field-unit`}
                value={this.props.unit}
            >
                {this.props.units.map(unit =>
                    <option value={unit.key}>{unit.abbreviation}</option>
                )}
            </select>
        );
    }
}

@editorFor("Quantity", InputBoxLabelContainer, { isDefault: true })
export class QuantityEditor extends BaseEditor<Quantity, QuantityTypeParameters, QuantityEditorProperties, void> {
    render() {
        let hardCodedUnit = this.type().unitSource.unit;
        let unitCategory = this.type().unitSource.unitCategory;
        let units = this.type().unitSource.units;
        let hasUnits = !!unitCategory;
        let unitSide = hasUnits ? unitCategory!.side : null;
        let leftUnit = unitSide === LeftRight.Left;
        let rightUnit = unitSide === LeftRight.Right;
        let unitDropdown = !hardCodedUnit && hasUnits ? <SelectUnit unit={this.value().unit} side={unitSide!} category={unitCategory!} units={units!} field={this.field()} ></SelectUnit> : null;
        let unitDisplay = hardCodedUnit && hasUnits ? <span className={`unit ${unitSide === LeftRight.Right ? 'right' : 'left'}`}>{hardCodedUnit}</span> : null;
        let numericField = getNumericField(this.field());
        return (
            <div className={fieldEditorClasses(this.field())}>
                { leftUnit ?  unitDropdown || unitDisplay : null}

                <NumericEditor value={this.value().value} field={numericField} context={createContext(numericField, this.context)} fieldState={this.props.fieldState} resources={this.props.resources}></NumericEditor>

                { rightUnit ?  unitDropdown || unitDisplay : null}
            </div>
        )
    }
}