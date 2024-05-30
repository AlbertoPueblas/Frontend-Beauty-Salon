import "./Home.css"
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
import { Link } from 'react-router-dom';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

//---------------------------------------------------------------------------------

export const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [validated, setValidated] = useState(false);
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const [isValid, setIsValid] = useState({
        email: null,
        password: null,
    });

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            event.preventDefault()
            await loginMe();
        }
        setValidated(true);
    };

    const inputHandler = (e) => {
        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const loginMe = async () => {
        try {
            const res = await loginCall(credentials);

            if (res.data && res.data.token) {
                const uDecoded = decodeToken(res.data.token);

                const passport = {
                    token: res.data.token,
                    decoded: uDecoded,
                };
                dispatch(login(passport))

                setTimeout(() => {
                    const userRole = passport.decoded.userRole
                    if ( userRole === 1 ) {
                        navigate("/admin")

                    } else if( userRole === 2 ) {
                        navigate("/manager")
                    } else if ( userRole === 3 ) {
                        navigate("/menu")
                    }
                }, 1000);
            } else if (res.data && res.data.user && !res.data.user.isActive) {
                showToast("Tu cuenta no esta activa contacta con el administrador")
            } else {
                showToast("Error al iniciar sesion")
            }
        } catch (error) {
            showToast("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
        }
    }

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

    return (
        <>
            <Container className="my-4">
                <Card className='card'>
                    <Card.Body>
                        <Row className="mb-3">
                            <Col xs={12} md={4}>
                                <Image src="./Images/iconoPerfil.jpeg" width={200} roundedCircle />
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
                                                isValid={isValid.email}
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
                                            isValid={isValid.password}
                                        />
                                        <h6>Aún no estas registrado? Registrate <Link to="/register">aqui</Link></h6>
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Button
                                        title={"login!"}
                                        className={"Button"}
                                        onClick={loginMe}>Login</Button>
                                </Form>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}