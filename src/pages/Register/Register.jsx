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

export const Register = () => {

    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    const [credentials, setCredentials] = useState({
        firstName: "",
        email: "",
        password: ""
    })

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            await register(navigate("/Home"));
        }
        setValidated(true);
    };

    const register = async () => {
        try {
            const res = await newRegister(credentials)

            if (res.data) {
                setTimeout(() => {
                    navigate("/Home");
                }, 2000);
            }
        } catch (error) {
            console.error("not register", error)
        }
    }

    const inputHandler = (e) => {
        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <Container className="my-4">
            <Card className='card'>
                <Card.Body>
                    <Card.Title>Register</Card.Title>
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
                </Card.Body>
            </Card>
        </Container>
    );
}

