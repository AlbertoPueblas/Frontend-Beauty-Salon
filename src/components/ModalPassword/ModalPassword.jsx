import { useState } from 'react';
import { Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../services/apiCalls';

//------------------------------------------------------------------------------

function Password(props) {

    const { profileData, token } = props;
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const closeModal = () => {
        setShow(false);
    };

    const handlePasswordChange = async () => {
        setErrorMsg("");

        // Compara la nueva contraseña 
        if (newPassword !== confirmPassword) {
            setErrorMsg("New passwords do not match.");
            return;
        }

        if(!window.confirm("are you soure change password")) {
            return;
        }

        const updatedProfileData = {
            ...profileData,
            currentPassword,
            password: newPassword
        };

        try {
            await updateProfile(updatedProfileData, token);
            setShow(false);
            navigate("/Profile");
        } catch (error) {
            setErrorMsg("Error updating password. Please try again.");
            console.error("Error updating password:", error);
        }
    };
    return (
        <>
            <div
                className="modal show"
                style={{ display: 'block', position: 'initial' }}
            >
                <Button variant="primary" onClick={() => setShow(true)}>
                    Edit Password
                </Button>
                <Modal show={show} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Password</Modal.Title>
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
                                    readOnly

                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid email.
                                </Form.Control.Feedback>
                            </InputGroup>
                            <Form.Group controlId="validation01">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    placeholder="firstName"
                                    value={profileData.firstName}
                                    readOnly

                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Group>
                        <Form.Group controlId="validation02">
                            <Form.Label>Actual Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="currentPassword"
                                placeholder="Current password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}

                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validation03">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="newPassword"
                                placeholder="New password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validation04">
                            <Form.Label>Repeat new Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary"
                            onClick={closeModal}>Close</Button>
                        <Button variant="success"
                            onClick={() => {
                                handlePasswordChange(),
                                navigate("/profile")
                            }}>Save changes</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}
export default Password