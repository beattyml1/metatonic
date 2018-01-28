import * as React from "react";
import InputFieldLabelAndContainer, {default as InputBoxLabelContainer} from "LabeledFieldContainers/InputFieldLabelAndContainer";
import {BaseEditor} from "./BaseEditor";
import {NumericEditor} from "./NumericEditor";
import {
    getNumericField,
    editorFor,
    SchemaField,
    createContext,
    UnitCategory,
    Unit,
    QuantityType,
    QuantityEditorProperties,
    LeftRight,
    UnitCategoryData,
    Quantity
} from "metatonic-core/src/index";

export class SelectUnit extends React.Component<{ category: UnitCategoryData, side: LeftRight, unit?: string }, void> {
    render() {
        return (
            <select
                className={`unit ${this.props.side === LeftRight.Right ? 'right' : 'left'}`}
                value={this.props.unit}
            >
                {this.props.category.units.map(unit =>
                    <option value={unit.key}>{unit.abbreviation}</option>
                )}
            </select>
        );
    }
}

@editorFor("numeric", InputBoxLabelContainer, { isDefault: true })
export class QuantityEditor extends BaseEditor<Quantity, QuantityType, QuantityEditorProperties, void> {
    render() {
        let hardCodedUnit = this.type().unitSource.unit;
        let unitCategory = this.type().unitSource.unitCategory;
        let hasUnits = !!unitCategory;
        let unitSide = hasUnits ? unitCategory!.side : null;
        let leftUnit = unitSide === LeftRight.Left;
        let rightUnit = unitSide === LeftRight.Right;
        let unitDropdown = !hardCodedUnit && hasUnits ? <SelectUnit unit={this.value().unit} side={unitSide!} category={unitCategory!} ></SelectUnit> : null;
        let unitDisplay = hardCodedUnit && hasUnits ? <span className={`unit ${unitSide === LeftRight.Right ? 'right' : 'left'}`}>{hardCodedUnit}</span> : null;
        let numericField = getNumericField(this.field());
        return (
            <div className="quantity-editor-container">
                { leftUnit ?  unitDropdown || unitDisplay : null}

                <NumericEditor value={this.value().value} field={numericField} context={createContext(numericField, this.context)} fieldState={this.props.fieldState}></NumericEditor>

                { rightUnit ?  unitDropdown || unitDisplay : null}
            </div>
        )
    }
}

export class LabeledQuantityEditor  extends React.Component<QuantityEditorProperties, void> {
    render() {
        return <InputFieldLabelAndContainer {...this.props} >
            <QuantityEditor {...this.props}/>
        </InputFieldLabelAndContainer>
    }
}