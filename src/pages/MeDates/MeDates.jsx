import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import { getUserData } from '../../app/slice/userSlice';
import { useEffect, useState } from 'react';
import { bringDates, allStylist, bringAllTreatments, deleteDate } from '../../services/apiCalls';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import dayjs from 'dayjs';
import { HiOutlinePencil } from "react-icons/hi2";
import { FcEmptyTrash, FcPlus } from "react-icons/fc";
import "./MeDates.css";
import { useNavigate } from 'react-router-dom';
import ModalDate from '../../components/ModalDate/ModalDate';
import { FcDownLeft } from "react-icons/fc";
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

//---------------------------------------------------------------------

export const Dates = () => {
    const navigate = useNavigate();
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedAppointment, setSelectedAppointment] = useState();
    const [stylists, setStylists] = useState([]);
    const [treatments, setTreatments] = useState([]);
    const myPassport = useSelector(getUserData);
    const token = myPassport.token;

    const showToast = (message, backgroundColor = "#f44336") => {
        Toastify({
            text: message,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            backgroundColor: backgroundColor,
            stopOnFocus: true,
        }).showToast();
    };

    useEffect(() => {
        const fetchData = async () => {
            const resDates = await bringDates(token);
            setDates(resDates.clientDates);
            
            const resStylists = await allStylist(token);
            setStylists(resStylists.data.stylists);
        
            const resTreatments = await bringAllTreatments(token);
            setTreatments(resTreatments.data.treatment || []);
        };
        fetchData();
    }, [token]);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const handleEditAppointment = (appointment) => {
        setSelectedAppointment(appointment);
    };

    const deleteAppointment = async (id) => {
        const confirmation = window.confirm("¿Estás seguro de que deseas eliminar esta cita?");
        if (confirmation) {
            const res = await deleteDate(id, token);
            if (res) {
                const updatedDates = dates.filter(date => date.id !== id);
                setDates(updatedDates);
                showToast("Cita eliminada con éxito", "rgb(122, 201, 43)");
                if (updatedDates.length === 0) {
                    navigate("/profile");
                }
            } else {
                showToast("Error al eliminar la cita");
            }
        }
    };

    return (
        <Container className="container">
            <Row className="justify-content-center">
                <Col xs={12} md={8}>
                    <h3 className="text-center">Appointments</h3>
                    <Card className='card'>
                        <Card.Body>
                            {dates && dates.map((date, index) => (
                                <Card key={index} className="mb-2" onClick={() => handleDateSelect(date)}>
                                    <Card.Body>
                                        <div className='icon'>
                                            <FcPlus className='icon' onClick={() => { navigate("/appointment") }} />
                                            <HiOutlinePencil className='icon' onClick={(e) => { e.stopPropagation(); handleEditAppointment(date); }} />
                                            <FcEmptyTrash className='icon' onClick={(e) => { e.stopPropagation(); deleteAppointment(date.id) }} />
                                            <FcDownLeft className='icon' onClick={() => navigate("/profile")} />
                                        </div>
                                        <Card.Title>appointment</Card.Title>
                                        <Card>{dayjs(date.appointmentDate).format("dddd, MMMM D, YYYY h:mm A")}</Card>
                                        <Card.Title>Stylist</Card.Title>
                                        <Card>{date.stylist?.firstName}</Card>
                                        <Card.Title>Treatment</Card.Title>
                                        <Card>{date.treatment?.treatment}</Card>
                                    </Card.Body>
                                </Card>
                            ))}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {selectedAppointment && (
                <ModalDate
                    appointmentData={selectedAppointment}
                    token={token}
                    onUpdateAppointment={async () => {
                        const resDates = await bringDates(token);
                        setDates(resDates.clientDates);
                    }}
                    onClose={() => setSelectedAppointment(null)}
                    stylists={stylists}
                    treatments={treatments}
                />
            )}
        </Container>
    );
};
