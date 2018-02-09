import * as React from "react";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';
import {RecordEditor} from "../Editors/RecordEditor";

export default class EditorModal extends React.Component<{ onCancel?: () => void, onFinished?: () => void}, {isOpen: boolean}> {
    state = {
        isOpen: false
    };

    openModal = () => {
        this.setState({
            isOpen: true
        });
    };

    hideModal = () => {
        this.setState({
            isOpen: false
        });
    };

    cancel = () => {
        this.hideModal();
        if (this.props.onCancel) this.props.onCancel();
    }

    done = () => {
        this.hideModal();
        if (this.props.onFinished) this.props.onFinished();
    }

    render() {
        return (
            <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
                <ModalHeader>
                    <ModalClose onClick={this.hideModal}/>
                    <ModalTitle>Modal title</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    {(this.props as any).children}
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-default' onClick={this.cancel}>
                        Cancel
                    </button>
                    <button className='btn btn-primary' onClick={this.done}>
                        Done
                    </button>
                </ModalFooter>
            </Modal>
        );
    }
}