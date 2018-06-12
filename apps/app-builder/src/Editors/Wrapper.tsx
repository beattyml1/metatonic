import * as React from "react";
import {BaseEditorModel} from 'metatonic-core'
import {BaseFieldContextComponent} from "metatonic-react";
import {connect} from "react-redux";
import {editFieldForComponent} from "../actions/editField";

export class Wrapper extends BaseFieldContextComponent<any, any> {
    render() { return (
        <div onClick={this.edit} >
        {this.props.children}
        </div>
    );
    }
    edit = (e) => { this.props.onEdit(this); e.stopPropagation(); }
}

export function wrap (EditorComponentClass: any) {
    return (props: BaseEditorModel<any>) => <Wrapper {...props}>
            <EditorComponentClass {...props}>
            {props['children']}
            </EditorComponentClass>
        </Wrapper>
}

export function bind(component: any) {
    return connect(
        (state) => ({ }),
        (dispatch) => ({ onEdit: comp => { dispatch(editFieldForComponent(comp)) } } as any)
    )(component)
}

export function wrapAndBind(component: any) { return bind(wrap(component)) };