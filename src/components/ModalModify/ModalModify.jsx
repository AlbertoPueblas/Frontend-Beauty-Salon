import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import { getUserData } from '../../app/slice/userSlice';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

//------------------------------------------------------------------

function Modify({ show, onHide, treatmentData, setTreatmentData, onModify }) {
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

    const handleInput = (e) => {
        const { name, value } = e.target;
        setTreatmentData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Modificar Tratamiento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formTreatmentName">
                        <Form.Label>Nombre del Tratamiento</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Introduce el nombre del tratamiento"
                            name="treatment"
                            value={treatmentData.treatment}
                            onChange={handleInput}
                        />
                    </Form.Group>
                    <Form.Group controlId="formTreatmentPrice">
                        <Form.Label>Precio del Tratamiento</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Introduce el precio del tratamiento"
                            name="price"
                            value={treatmentData.price}
                            onChange={handleInput}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={onModify}>
                    Guardar Tratamiento
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Modify;
