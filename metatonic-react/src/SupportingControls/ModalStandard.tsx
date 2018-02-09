import * as React from "react";
import ModalBase from "./ModalBase";

export default class ModalStandard extends React.Component<{ isOpen: boolean }, { isOpen: boolean }> {
    render() {
        return (
            <ModalBase isOpen={this.state.isOpen}>

            </ModalBase>
        );
    }
}