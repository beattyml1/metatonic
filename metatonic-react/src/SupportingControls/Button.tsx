import * as React from "react";
import {MouseEventHandler} from "react";
import {RequiredProps} from "metatonic-core";

export type OnClick = Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick">
export type Children = Pick<React.HTMLAttributes, "children">
export type RequiredChildren = RequiredProps<Children>
export type RequiredOnClick = RequiredProps<OnClick>
let x: RequiredChildren
x = { children: undefined }

export class Button extends React.Component<{} & React.ButtonHTMLAttributes <HTMLButtonElement>, {} > {
    btnClasses = 'btn'
    render() {
        return (
            <button {...this.props} type="button" className={this.props.className ? `${btnClasses} ${this.props.className}` : this.btnClasses }>
                {this.props.children}
            </button>
        );
    }
}