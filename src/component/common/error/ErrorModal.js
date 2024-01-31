import {Alert, Button, Modal, ModalHeader} from "react-bootstrap";

const ErrorModal = ({ show, onHide, message }) => {
    return (
        <Modal className={" align-items-center"} show={show} onHide={onHide}>
            <Modal.Header className={"fs-5 bg-danger text-white"} closeButton>
                <Modal.Title className={"fs-3"}>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert className={"fs-5"} variant={"danger"}>
                    {message}
                </Alert>
            </Modal.Body>
            <Modal.Footer className={"border-top-0"}>
                <Button className={"fs-5 bg-black fw-semibold"} variant={"secondary"} onClick={onHide}>
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ErrorModal