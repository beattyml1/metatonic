import * as React from "react";
import {Button, ButtonStyle} from "./Button";
import {hasValue} from "metatonic-core";

export class ButtonGroup extends React.Component<{
    actions: { label: string, onClick: (e) => boolean | undefined | void }[],
    buttonStyle?: ButtonStyle
}, {}> {
    render() {
        let separator = <span className={['button-separator', this.props.buttonStyle].filter(hasValue).join(' ')}/>;
        let buttonGroupStyle = this.props.buttonStyle ? `${this.props.buttonStyle}-group` : '';
        return (
            <span className={['button-group', buttonGroupStyle].filter(hasValue).join(' ')}>{this.props.actions.reduce((elements, action, index, actions) => [
                    ...elements,
                    <Button type={"button"} buttonStyle={this.props.buttonStyle} className={"row-action-button"} onClick={action.onClick}>{action.label}</Button>,
                    ...(index < actions.length - 1 ? [separator] : [])
                ], []
            )}</span>
        );
    }
}