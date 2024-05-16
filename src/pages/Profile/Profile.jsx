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
// import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Modal from '../../components/Modal/Modal';
import Memodal from '../../components/Modal/Modal';

//--------------------------------------------------------

export const Profile = () => {

    const [profileData, setProfileData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    });
    const [userData, setUserData] = useState([]);

    const myPassport = useSelector(getUserData)
    const token = myPassport.token;

    useEffect(() => {
        const fetchDataAndProfile = async () => {
            const myProfileData = await meProfile(token);
            setProfileData(myProfileData);
            const res = await bringDates(token);
            setUserData(res.clientDates);
        };
        fetchDataAndProfile();
    }, [token]);

    const inputHandler = (e) => {
        setProfileData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,

        }));
    };

    return (
        <>
            <Container className="my-4">
                <Card className='card'>
                    <Card.Body>
                        <Row className="mb-3">
                            <Col xs={12} md={4}>
                                <Image src="../../src/Images/iconoPerfil.jpeg" width={150} roundedCircle />
                                    <>
                                        <Memodal
                                            profileData={profileData}
                                            inputHandler={inputHandler}
                                            token={token} />
                                    </>
                            </Col>
                            <Col xs={12} md={8}>
                                <h2>Me Profile</h2>
                                <Form >
                                    <Form.Group controlId="validationCustomUsername" >
                                        <Form.Label>Email</Form.Label>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                            <Form.Control
                                                className="input"
                                                name="email"
                                                type="email"
                                                placeholder="Email"
                                                aria-describedby="inputGroupPrepend"
                                                required
                                                value={profileData.email}
                                                onChange={inputHandler}
                                                readOnly
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid email.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId="validationCustom01">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            className="input"
                                            name="firstName"
                                            required
                                            type="text"
                                            placeholder="firstName"
                                            readOnly
                                            value={profileData.firstName}
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="validationCustom02">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            className="input"
                                            name="lastName"
                                            required
                                            type="text"
                                            placeholder="lastName"
                                            readOnly
                                            value={profileData.lastName || ""}
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="validationCustom03">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control
                                            className="input"
                                            name="phone"
                                            required
                                            type="text"
                                            placeholder="phone"
                                            readOnly
                                            value={profileData.phone || ""}
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>

                                </Form>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}