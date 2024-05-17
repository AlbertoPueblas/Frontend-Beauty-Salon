import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { updateAppointment } from '../../services/apiCalls';
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

          try {
            const res = await bringAllStylists(token);
            setStylists(res.data.stylist);
            const resp = await bringAllTreatments(token);
            setTreatments(resp.data.treatsment);
          } catch (error) {
;
          }

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
                            <Form.Control
                                type="datetime-local"
                                name="appointmentDate"
                                value={modifiedAppointment.appointmentDate}
                                onChange={handleInputChange}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formBasicStylist">
                        <Form.Label>Estilista</Form.Label>
                        <Form.Select
                            name="stylistId"
                            value={modifiedAppointment.stylistId}
                            onChange={handleInputChange}
                        >
                            {stylists.map(stylist => (
                                <option key={stylist.id} value={stylist.id}>
                                    {stylist.firstName}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="formBasicTreatment">
                        <Form.Label>Tratamiento</Form.Label>
                        <Form.Select
                            name="treatmentId"
                            value={modifiedAppointment.treatsment}
                            onChange={handleInputChange}
                        >
                            {treatments.map(treatment => (
                                <option key={treatment.id} value={treatment.id}>
                                    {treatment.treatsment}
                                </option>
                            ))}
                        </Form.Select>
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
