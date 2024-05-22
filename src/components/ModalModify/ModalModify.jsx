import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import { getUserData } from '../../app/slice/userSlice';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

//------------------------------------------------------------------------------

function Modify({ show, onHide, treatmentData, setTreatmentData, onChange}) {
    const myPassport = useSelector(getUserData);
    const token = myPassport.token;

    const showToast = (message) => {
        Toastify({
            text: message,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            backgroundColor: "#f44336",
            stopOnFocus: true,
        }).showToast();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        // Actualiza el estado con el valor del input
        setTreatmentData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Modify Treatment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formTreatmentName">
                        <Form.Label>Treatment Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter treatment name"
                            name="treatment"
                            value={treatmentData.treatment}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formTreatmentPrice">
                        <Form.Label>Treatment Price</Form.Label>
                        <Form.Control
                            type = "number"
                            placeholder="Enter treatment price"
                            name="price"
                            value={treatmentData.price}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={onChange}>
                    Save Treatment
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Modify;
