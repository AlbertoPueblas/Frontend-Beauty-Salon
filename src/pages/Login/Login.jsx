import "./Login.css"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { useState } from "react";
import { loginCall } from "../../services/apiCalls";
import Image from 'react-bootstrap/Image';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../app/slice/userSlice";
import { decodeToken } from "react-jwt";


//---------------------------------------------------------------------------------

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [validated, setValidated] = useState(false);
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            await loginMe(navigate("/profile"));
        }
        setValidated(true);
    };

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const inputHandler = (e) => {
        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const loginMe = async () => {
        const res = await loginCall(credentials);

        if (res.data.token) {
            const uDecoded = decodeToken(res.data.token);

            const passport = {
                token: res.data.token,
                decoded: uDecoded,
            };
            dispatch(login(passport))

            setTimeout(() => {
                navigate("/profile")
            }, 1000);
        }
    }

    return (
        <>
           <Container className="my-4">
                <Card className='card'>
                    <Card.Body>
                        <Row className="mb-3">
                            <Col xs={12} md={4}>
                                <Image src="../../src/Images/iconoPerfil.jpeg" width={200} roundedCircle />
                            </Col>
                            <Col xs={12} md={8}>
                                <h1>Login</h1>
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                                                value={credentials.email}
                                                onChange={inputHandler}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid email.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId="validationCustom02">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            className="input"
                                            name="password"
                                            required
                                            type="password"
                                            placeholder="Password"
                                            value={credentials.password}
                                            onChange={inputHandler}
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Button type="submit">Login me</Button>
                                </Form>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}