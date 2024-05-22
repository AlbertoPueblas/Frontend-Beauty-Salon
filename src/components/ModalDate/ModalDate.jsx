import "./ModalDate.css"
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { updateAppointment, bringAllStylists, bringAllTreatments } from '../../services/apiCalls';
import { useNavigate } from 'react-router-dom';
import dayjs from "dayjs";

//---------------------------------------------------------
function ModalDate({ appointmentData, token, onUpdateAppointment, onClose, stylists, treatments }) {
    const [modifiedAppointment, setModifiedAppointment] = useState({
        ...appointmentData,
        appointmentDate: new Date(appointmentData.appointmentDate).toISOString().slice(0, 16),
        stylistId: appointmentData.stylist ? appointmentData.stylist.id : null,
        treatmentId: appointmentData.treatment ? appointmentData.treatment.id : null,
    });

    const navigate = useNavigate();

    useEffect(() => {
        setModifiedAppointment({
            //Se encarga de asociar el id con el nombre para renderizar el nombre asociado a la id.
            ...appointmentData,
            appointmentData: new Date(appointmentData.appointmentDate).toISOString().slice(0, 16),
            stylistId: appointmentData.stylist ? appointmentData.stylist.id : null,
            treatmentId: appointmentData.treatment ? appointmentData.treatment.id : null,
        });
    }, [appointmentData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = name === 'treatmentId' 
        || name === 'stylistId' ? Number(value) : value;// Cambia el valor a number
        setModifiedAppointment(prevState => ({
            ...prevState,
            [name]: parsedValue
        }));
    };

    const handleUpdate = async () => {
        try {
            await updateAppointment(modifiedAppointment, token);
            onUpdateAppointment();
            onClose();
        } catch (error) {
            console.error("Error al actualizar la cita:", error);
        }
    };

    return (
        <Modal show={true} onHide={onClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Modificar Cita</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicAppointment">
                        <Form.Label>Fecha y hora de la cita</Form.Label>
                        <InputGroup>
                            <input className='inputCalendario'
                                type="datetime-local"
                                name="appointmentDate"
                                value={dayjs(modifiedAppointment.appointmentDate).format("YYYY-MM-DDTHH:mm")}
                                onChange={handleInputChange}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formBasicStylist">
                        <Form.Label>Estilista</Form.Label>
                        <Form.Control
                            as="select"
                            name="stylistId"
                            value={modifiedAppointment.stylistId}
                            onChange={handleInputChange}
                        >
                            <option value="">Selecciona un estilista</option>
                            {stylists.map(stylist => (
                                <option key={stylist.id} value={stylist.id}>
                                    {stylist.firstName}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicTreatment">
                        <Form.Label>Tratamiento</Form.Label>
                        <Form.Control
                            as="select"
                            name="treatmentId"
                            value={modifiedAppointment.treatmentId}
                            onChange={handleInputChange}
                        >
                            <option value="">Selecciona un tratamiento</option>
                            {treatments.map(treatment => (
                                <option key={treatment.id} value={treatment.id}>
                                    {treatment.treatment} - {treatment.price} €
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleUpdate}>
                    Guardar cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDate;
