import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Password from '../ModalPassword/ModalPassword';
import { newStylist } from '../../services/apiCalls';
import { FcPlus } from "react-icons/fc";
import { getUserData } from '../../app/slice/userSlice';
import { useSelector } from 'react-redux';

//-----------------------------------------------------------

function ModalCreateStylist({ onStateUserSuccess }) {

    const userReduxData = useSelector(getUserData);
    const token = userReduxData.token;

    const [credentials, setCredentials] = useState({
        firstName: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const [show, setShow] = useState(false)

    const closeModal = () => {
        setShow(false);
    }

    const createStylist = async () => {

        await newStylist(credentials, token);
        setTimeout(() => {
            navigate("/stylist")
            setShow(false);
        }, 2000)
        onStateUserSuccess()
    };

    const inputHandler = (e) => {
        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <>
            <div
                className="modal show"
                style={{ display: 'block', position: 'initial' }}
            >
                <FcPlus className='icon' variant="primary" onClick={() => setShow(true)}>
                    Create Stylist
                </FcPlus>
                <Modal show={show} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Stylist</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group controlId="validationCustomUsername" >
                            <Form.Label>Email</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    value={credentials.email}
                                    onChange={inputHandler}

                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid email.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="validationCustom01">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                placeholder="firstName"
                                value={credentials.firstName}
                                onChange={inputHandler}

                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationCustom02">
                            <Form.Label>Last Name</Form.Label>
                            {/* <Form.Control
                                type="text"
                                name="lastName"
                                placeholder="lastName"
                                value={credentials.lastName || ""}
                                onChange={inputHandler}
                            /> */}
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationCustom03">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                name="password"
                                required
                                type="password"
                                placeholder="password"
                                value={credentials.password}
                                onChange={inputHandler}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary"
                            onClick={closeModal}>Close</Button>
                        <Button variant="success"
                            onClick={() => {
                                createStylist()
                            }}>Create Stylist</Button>
                            <Password
                                credentials={credentials}
                                inputHandler={inputHandler}

                                 />
                    
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}
export default ModalCreateStylist