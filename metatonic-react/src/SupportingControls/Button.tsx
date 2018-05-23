import * as React from "react";

export type ButtonStyle = 'button' | 'text-link' | 'icon';
export class Button extends React.Component<{ buttonStyle?: ButtonStyle } & React.ButtonHTMLAttributes<HTMLButtonElement>, {} > {
    render() {
        let classes = [this.props.buttonStyle, this.props.className].filter(_=>_);
        return (
            <button {...this.props} type="button" className={classes.join(' ')}>
                {this.props.children}
            </button>
        );
    }
}