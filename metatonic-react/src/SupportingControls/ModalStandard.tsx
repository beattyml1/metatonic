import * as React from "react";
import ModalBase from "./ModalBase";

export default class ModalStandard extends React.Component<{ isOpen: boolean, label: string }, { isOpen: boolean }> {
    render() {
        return (
            <ModalBase isOpen={this.state.isOpen}>
                <h1>{this.props.label}</h1>
                <button></button>
                {this.props.children}
            </ModalBase>
        );
    }
}