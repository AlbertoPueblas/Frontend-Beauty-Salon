
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import { getUserData } from '../../app/slice/userSlice';
import { useEffect, useState } from 'react';
import { bringDates } from '../../services/apiCalls';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import dayjs from 'dayjs';
import { HiArchiveBoxXMark } from "react-icons/hi2";
import { HiOutlinePencil } from "react-icons/hi2";
import { FcEmptyTrash } from "react-icons/fc";
import "./MeDates.css"
import { FcPlus } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';

//--------------------------------------------------------

export const Dates = () => {

    const navigate = useNavigate();
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState({
        id: "",
        userId: "",
        appointmentDate: "",
        treatsmentId: "",
        stylistId: ""
    });

    const myPassport = useSelector(getUserData);
    const token = myPassport.token;

    useEffect(() => {
        const fetchDataAndProfile = async () => {
            const res = await bringDates(token);
            setDates(res.clientDates);
        };
        fetchDataAndProfile();
    }, [token]);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    return (
        <Container className="my-4">
            <Row>
                <Col xs={12} md={8}>
                            <FcPlus className='icon' onClick={() => {navigate("/appointment")}}/>
                    <h2>Me Appointment</h2>
                    <Card className='card'>
                        <Card.Body>
                            {dates.map((date, index) => (
                                <Card key={index} className="mb-2" onClick={() => handleDateSelect(date)}>
                                    <Card.Body>
                                        <div className='icon'>
                                            <HiArchiveBoxXMark className='icon' />
                                            <HiOutlinePencil className='icon' />
                                            <FcEmptyTrash className='icon' />
                                        </div>
                                        <Card.Title>Appointment</Card.Title>
                                        <Card>{dayjs(date.appointmentDate).format("dddd, MMMM D, YYYY h:mm A")}</Card>
                                        <Card.Title>Stylist</Card.Title>
                                        <Card name="stylist"> {date.stylistId}</Card>
                                        <Card.Title>Treatsment</Card.Title>
                                        <Card>{date.treatsmentId}</Card>
                                    </Card.Body>
                                </Card>
                            ))}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
