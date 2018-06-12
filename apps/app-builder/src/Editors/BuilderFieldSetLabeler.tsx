import * as React from "react";
import {BaseEditorModel,fieldLabelClasses,fieldContainerClasses} from 'metatonic-core'
import FieldSet from 'metatonic-react/lib/src/LabeledFieldContainers/FieldSet'
import {LabeledEditorContainer} from "metatonic-react";
import {connect} from "react-redux";
import {editFieldForComponent} from "../actions/editField";
import {AppBuilderActions} from "../types/Types";

export class BuilderFieldSetLabeler extends LabeledEditorContainer<BaseEditorModel<any> &  {onAddField}, {}>  {
    render() { return (
        <fieldset className={`field-set-field-container ${fieldContainerClasses(this.field())}`}>
            <legend className={fieldLabelClasses(this.field())}  id={`${this.uniqueId()}-label`}>
                {this.label()}
                <button type={"button"} onClick={this.add} style={{float: "right", display: "none"}}>Add Field</button>
            </legend>
            {this.content()}
            {this.renderValidationMessages()}
        </fieldset>
        );
    }
    add = (e) => {
        this.props.onAddField(this.props.context.fieldLocator)
        e.stopPropagation();
    }
}

export const BuilderFieldSetLabelerBound = connect(
    state => ({}),
    dispatch => ({ onAddField: fieldLocator => dispatch({ type: AppBuilderActions.AddField, payload: {fieldLocator}})})
)(BuilderFieldSetLabeler);