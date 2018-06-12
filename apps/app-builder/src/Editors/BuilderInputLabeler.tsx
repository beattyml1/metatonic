import * as React from "react";
import {BaseEditorModel} from 'metatonic-core'
import InputBoxLabelContainer from 'metatonic-react/lib/src/LabeledFieldContainers/InputFieldLabelAndContainer'
import {fieldLabelClasses, fieldContainerClasses} from "metatonic-core";
import {LabeledEditorContainer} from "metatonic-react";
import {connect} from "react-redux";
import {editFieldForComponent} from "../actions/editField";

export class BuilderInputLabeler extends LabeledEditorContainer {
// <div className={`input-box-field-container ${fieldContainerClasses(this.field())}`}>
// <label htmlFor={this.uniqueId()} className={fieldLabelClasses(this.field())} id={`${this.uniqueId()}-label`}>
// {this.label()}
// </label>
// {this.content()}
// {this.renderValidationMessages()}
// </div>
    render() { return (
        <div onClick={this.edit} >
            <InputBoxLabelContainer {...this.props}>
                {this.props.children}
            </InputBoxLabelContainer>
        </div>
        );
    }
    edit = () => (this.props as any).onEdit(this)
}

export const BuilderInputLabelerBound = connect(
    (state) => ({ }),
    (dispatch) => ({ onEdit: editFieldForComponent} as any)
)(BuilderInputLabeler);