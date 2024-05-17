import "./ModalDate.css"
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { updateAppointment, bringAllStylists, bringAllTreatments } from '../../services/apiCalls'; // Importa las funciones necesarias desde tus servicios
import { useNavigate } from 'react-router-dom';

function ModalDate({ appointmentData, token, onUpdateAppointment, onClose }) {
    const [modifiedAppointment, setModifiedAppointment] = useState({
        ...appointmentData,
        appointmentDate: new Date(appointmentData.appointmentDate).toISOString().slice(0, 16)
    });
    const navigate = useNavigate();
    const [treatments, setTreatments] = useState([]);
    const [stylists, setStylists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setModifiedAppointment({
            ...appointmentData,
            appointmentDate: new Date(appointmentData.appointmentDate).toISOString().slice(0, 16)
        });
    }, [appointmentData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setModifiedAppointment({
            ...modifiedAppointment,
            [name]: value
        });
    };

    const handleUpdate = async () => {
        try {
            await updateAppointment(modifiedAppointment, token);
            onUpdateAppointment(); // Actualiza la cita en el estado del componente padre
            onClose(); // Cierra el modal después de la actualización
        } catch (error) {
            console.error("Error al actualizar la cita:", error);
        }
    };

    useEffect(() => {
        const fetchStylistAndJobs = async () => {
                const res = await bringAllStylists(token);
                setStylists(res.data.stylists);
                const resp = await bringAllTreatments(token);
        };
        fetchStylistAndJobs();
    }, [token]);

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
                placeholder="date"

                                value={modifiedAppointment.appointmentDate}
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
                            name="treatsmentId"
                            value={modifiedAppointment.treatsmentId}
                            onChange={handleInputChange}
                        >
                            <option value="">Selecciona un tratamiento</option>
                            {treatments.map(treatment => (
                                <option key={treatment.id} value={treatment.id}>
                                    {treatment.treatsment}
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

