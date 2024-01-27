import {Alert, Button, Modal, ModalHeader} from "react-bootstrap";

const ErrorModal = ({ show, onHide, message }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header className={"bg-danger text-white"} closeButton>
                <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert variant={"danger"}>
                    {message}
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"secondary"} onClick={onHide}>
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ErrorModal