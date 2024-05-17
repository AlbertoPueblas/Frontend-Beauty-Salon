import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import { getUserData } from '../../app/slice/userSlice';
import { useEffect, useState } from 'react';
import { bringDates, bringAllStylists, bringAllTreatments } from '../../services/apiCalls';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import dayjs from 'dayjs';
import { HiArchiveBoxXMark, HiOutlinePencil } from "react-icons/hi2";
import { FcEmptyTrash, FcPlus } from "react-icons/fc";
import "./MeDates.css";
import { useNavigate } from 'react-router-dom';
import ModalDate from '../../components/ModalDate/ModalDate';

export const Dates = () => {
    const navigate = useNavigate();
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [stylists, setStylists] = useState([]);
    const [treatments, setTreatments] = useState([]);
    const myPassport = useSelector(getUserData);
    const token = myPassport.token;

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

    return (
        <Container className="my-4">
            <Row>
                <Col xs={12} md={8}>
                    <FcPlus className='icon' onClick={() => { navigate("/appointment") }} />
                    <h2>Me Appointment</h2>
                    <Card className='card'>
                        <Card.Body>
                            {dates && dates.map((date, index) => (
                                <Card key={index} className="mb-2" onClick={() => handleDateSelect(date)}>
                                    <Card.Body>
                                        <div className='icon'>
                                            <HiArchiveBoxXMark className='icon' />
                                            <HiOutlinePencil className='icon' onClick={(e) => { e.stopPropagation(); handleEditAppointment(date); }} />
                                            <FcEmptyTrash className='icon' />
                                        </div>
                                        <Card.Title>Id</Card.Title>
                                        <Card>{date.id}</Card>
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
