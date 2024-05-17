import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import { getUserData } from '../../app/slice/userSlice';
import { useEffect, useState } from 'react';
import { bringDates, bringAllStylists, bringAllTreatments, deleteDate } from '../../services/apiCalls';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import dayjs from 'dayjs';
import { HiArchiveBoxXMark, HiOutlinePencil } from "react-icons/hi2";
import { FcEmptyTrash, FcPlus } from "react-icons/fc";
import "./MeDates.css";
import { useNavigate } from 'react-router-dom';
import ModalDate from '../../components/ModalDate/ModalDate';
import { Alert } from 'react-bootstrap';

//---------------------------------------------------------------------------------------------------

export const Dates = () => {
    const navigate = useNavigate();
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [stylists, setStylists] = useState([]);
    const [treatments, setTreatments] = useState([]);
    const myPassport = useSelector(getUserData);
    const token = myPassport.token;
    const [msg, setMsg] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            const resDates = await bringDates(token);
            setDates(resDates.clientDates);
            const resStylists = await bringAllStylists(token);
            setStylists(resStylists.stylists);
            const resTreatments = await bringAllTreatments(token);
            setTreatments(resTreatments.treatments);
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
        const res = await deleteDate(id, token)
        setMsg("Delete appointment successfully")
        setTimeout(() => {
            navigate("/profile")
        },2000)

    }

    return (
        <Container className="my-4">
            <Row>
            {msg && <Alert variant="success">{msg}</Alert>}
                <Col xs={12} md={8}>
                    <h2>Me Appointment</h2>
                    <Card className='card'>
                        <Card.Body>
                            {dates && dates.map((date, index) => (
                                <Card key={index} className="mb-2" onClick={() => handleDateSelect(date)}>
                                    <Card.Body>
                                        <div className='icon'>
                                            <FcPlus className='icon' onClick={() => { navigate("/appointment") }} />
                                            <HiOutlinePencil className='icon' onClick={(e) => { e.stopPropagation(); handleEditAppointment(date); }} />
                                            <FcEmptyTrash className='icon' onClick={() => { 
                                                deleteAppointment(date.id) }} />
                                        </div>
                                        <Card.Title>Appointment</Card.Title>
                                        <Card>{dayjs(date.appointmentDate).format("dddd, MMMM D, YYYY h:mm A")}</Card>
                                        <Card.Title>Stylist</Card.Title>
                                        <Card>{date.stylistId}</Card>
                                        <Card.Title>Treatment</Card.Title>
                                        <Card>{date.treatsmentId}</Card>
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
                        const res = await bringDates(token);
                        if (res && res.clientDates) {
                            setDates(res.clientDates);
                        }
                    }}
                    onClose={() => setSelectedAppointment(null)}
                    stylists={stylists}
                    treatments={treatments}
                />
            )}
        </Container>
    );
};
