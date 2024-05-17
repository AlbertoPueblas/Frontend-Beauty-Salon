
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import { getUserData } from '../../app/slice/userSlice';
import { useEffect, useState } from 'react';
import { bringDates, meProfile } from '../../services/apiCalls';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

//--------------------------------------------------------

export const Dates = () => {
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
                <Col xs={12} md={4}>
                    <Image src="../../src/Images/iconoPerfil.jpeg" width={150} roundedCircle />
                </Col>
                <Col xs={12} md={8}>
                    <h2>Me Appointment</h2>
                    <Card className='card'>
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="validationCustomUsername">
                                    <Form.Label>ID</Form.Label>
                                    <InputGroup hasValidation>
                                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                        <Form.Control
                                            className="input"
                                            name="id"
                                            type="text"
                                            placeholder="ID"
                                            aria-describedby="inputGroupPrepend"
                                            required
                                            value={selectedDate.id}
                                            readOnly
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid ID.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="validationCustom01">
                                    <Form.Label>User</Form.Label>
                                    <Form.Control
                                        className="input"
                                        name="user"
                                        required
                                        type="text"
                                        placeholder="User"
                                        readOnly
                                        value={selectedDate.userId}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="validationCustom02">
                                    <Form.Label>Treatment ID</Form.Label>
                                    <Form.Control
                                        className="input"
                                        name="treatmentId"
                                        required
                                        type="text"
                                        placeholder="Treatment ID"
                                        readOnly
                                        value={selectedDate.treatsmentId}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="validationCustom03">
                                    <Form.Label>Stylist</Form.Label>
                                    <Form.Control
                                        className="input"
                                        name="stylist"
                                        required
                                        type="text"
                                        placeholder="Stylist"
                                        readOnly
                                        value={selectedDate.stylistId}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="mt-3">
                        {dates.map((date, index) => (
                            <Card key={index} className="mb-2" onClick={() => handleDateSelect(date)}>
                                <Card.Body>
                                    <Card.Title>Appointment on {date.appointmentDate}</Card.Title>
                                    <Card.Text>Stylist: {date.stylistId}</Card.Text>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
