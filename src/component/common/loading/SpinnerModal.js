import {Modal, Spinner} from "react-bootstrap";

const SpinnerModal = ({ show }) => {
    return (
        <Modal show={show} className={"d-flex flex mt-5 mx-auto"}>
            <Modal.Body>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Modal.Body>
        </Modal>
    );
};

export default SpinnerModal