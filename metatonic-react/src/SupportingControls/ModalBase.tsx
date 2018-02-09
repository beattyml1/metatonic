import * as React from "react";

export default class ModalBase extends React.Component<{isOpen: boolean}, {isOpen: boolean}> {
    render() {
        // TODO: Figure out how to force react to accept the open property
        return (
            <dialog className="modal">
                {(this.props as any).children}
            </dialog>
        );
    }
}