import * as React from "react";

export default class ModalBase extends React.Component<{isOpen: boolean}, {isOpen: boolean}> {
    render() {
        return (
            <dialog open={this.props.isOpen} className="modal">
                {(this.props as any).children}
            </dialog>
        );
    }
}