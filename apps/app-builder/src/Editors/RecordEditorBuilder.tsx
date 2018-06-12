import * as React from "react";
import {BaseEditorModel} from "metatonic-core/src/index";
import {BaseEditor} from "metatonic-react";
import {editorFor} from "metatonic-core";
import {connect} from "react-redux";
import {editFieldForComponent} from "../actions/editField";

export class RecordEditorBuilder extends BaseEditor<any, BaseEditorModel<any>, BaseEditorModel<any>, {}> {
    render() {
        return (

        );
    }
    edit = () => (this.props as any).onEdit(this)
}

export const RecordEditorBuilderBound = connect(
    (state) => ({ }),
    (dispatch) => ({ onEdit: editFieldForComponent} as any)
)(RecordEditorBuilder);

