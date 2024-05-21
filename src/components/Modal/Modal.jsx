import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { updateProfile } from '../../services/apiCalls';
import Password from '../ModalPassword/ModalPassword';
import { FcDataConfiguration } from "react-icons/fc";

//-----------------------------------------------------------

function Memodal(props) {

    const { profileData, inputHandler, token } = props
    const navigate = useNavigate()
    const [show, setShow] = useState(false)

    const closeModal = () => {
        navigate("/");
        setTimeout(() => {
            navigate("/Profile")
        });
        setShow(false);
    }

    const profileUpdate = async () => {

        await updateProfile(profileData, token);
        setTimeout(() => {
            navigate("/Profile")
            setShow(false);
        }, 2000)
    };

    return (
        <>
            <div
                className="modal show"
                style={{ display: 'block', position: 'initial' }}
            >
                <FcDataConfiguration className='icon' variant="primary" onClick={() => setShow(true)}>
                    modify profile
                </FcDataConfiguration>
                <Modal show={show} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Profile</Modal.Title>
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
                                    value={profileData.email}
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
                                value={profileData.firstName}
                                onChange={inputHandler}

                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationCustom02">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                placeholder="lastName"
                                value={profileData.lastName || ""}
                                onChange={inputHandler}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationCustom03">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                name="phone"
                                required
                                type="text"
                                placeholder="phone"
                                value={profileData.phone || ""}
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
                                profileUpdate()
                                navigate("/profile")
                            }}>Save changes</Button>
                            <Password
                                profileData={profileData}
                                inputHandler={inputHandler}
                                token={token} />
                    
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}
export default Memodal