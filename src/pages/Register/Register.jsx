import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { newRegister } from "../../services/apiCalls"
import Image from 'react-bootstrap/Image';
import Toastify from 'toastify-js';

//------------------------------------------------------------------------------

export const Register = () => {

    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    const [credentials, setCredentials] = useState({
        firstName: "",
        email: "",
        password: ""
    })

    // Muestra mensajes de error
    const showToast = (message) => {
        Toastify({
            text: message,
            duration: 3000, // Duración 3 seg
            close: true, // Mostrar botón de cierre
            gravity: "top", // Posición del toast
            position: "center", // Alineación del toast
            backgroundColor: "#f44336", // Color de fondo (rojo para errores)
            stopOnFocus: true, // Mantener el toast mientras esté enfocado
        }).showToast();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            await register();
        }
        setValidated(true);
    };

    const register = async () => {
        try {
            const res = await newRegister(credentials);

            if (res.data && res.data.email) {
                showToast("Registro exitoso. Redirigiendo a login...");
                setTimeout(() => {
                    navigate("/home");
                }, 1000);
            } else {
                showToast(res.data.message || "Registro fallido");
                setTimeout(() => {
                    navigate("/home")
                }, 1000)
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message === "Email already exists") {
                showToast("Error al registrar, prueba de nuevo");
            } else {
                showToast("El correo electrónico ya está registrado");
            }
            showToast("Error al registrar");
        }
    };

    const inputHandler = (e) => {
        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <>
            <Container className="my-4">
                <Card className='card'>
                    <h4>Register</h4>
                    <Card.Body>
                        <Row>
                            <Col xs={12} md={4}>
                                <Image src="../../src/Images/MP.jpeg" width={200} roundedCircle />
                            </Col>
                            <Col xs={12} md={8}>
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} sm="12" md="4" controlId="validationCustom01">
                                            <Form.Label>First name</Form.Label>
                                            <Form.Control
                                                name="firstName"
                                                required
                                                type="text"
                                                placeholder="First name"
                                                value={credentials.firstName}
                                                onChange={inputHandler}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} sm="12" md="4" controlId="validationCustomUsername">
                                            <Form.Label>Email</Form.Label>
                                            <InputGroup hasValidation>
                                                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                                <Form.Control
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
                                        <Form.Group as={Col} sm="12" md="4" controlId="validationCustom02">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                name="password"
                                                required
                                                type="password"
                                                placeholder="Password"
                                                value={credentials.password}
                                                onChange={inputHandler}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Form.Group className="mb-3">
                                        <Form.Check
                                            required
                                            label="Agree to terms and conditions"
                                            feedback="You must agree before submitting."
                                            feedbackType="invalid"
                                        />
                                    </Form.Group>
                                    <Button type="submit">Register me</Button>
                                </Form>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

