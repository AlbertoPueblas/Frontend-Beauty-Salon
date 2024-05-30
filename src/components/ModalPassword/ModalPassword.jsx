import { useState, useEffect } from 'react';
import { Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../services/apiCalls';
import "./ModalPassword.css";

//------------------------------------------------------------------------------

function ModalPassword(props) {

    const { profileData, token, show, onHide } = props;
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const showToast = (message) => {
        Toastify({
            text: message,
            duration: 1000, // Duración 1 seg
            close: true, // Mostrar botón de cierre
            gravity: "top", // Posición del toast
            position: "center", // Alineación del toast
            backgroundColor: "#f44336", // Color de fondo (rojo para errores)
            stopOnFocus: true, // Mantener el toast mientras esté enfocado
        }).showToast();
    };

    useEffect(() => {
        if (show) {
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }
    }, [show]);

    const closeModal = () => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        onHide();
    };

    const handlePasswordChange = async () => {
        if (newPassword !== confirmPassword) {
            showToast("New passwords do not match.");
            return;
        }

        if (!window.confirm("Are you sure you want to change the password?")) {
            closeModal();
            return;
        }

        const updatedProfileData = {
            ...profileData,
            currentPassword,
            password: newPassword
        };

        try {
            await updateProfile(updatedProfileData, token);
            closeModal();
            navigate("/Profile");
        } catch (error) {
            showToast("Error updating password. Please try again.");
        }
    };

    return (
        <Modal show={show} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="validationCustomUsernames">
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
                </Form.Group>
                <Form.Group controlId="validations01">
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
                <Form.Group controlId="validations02">
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
                <Form.Group controlId="validations03">
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
                <Form.Group controlId="validations04">
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
                <Button variant="secondary" onClick={closeModal}>Close</Button>
                <Button variant="success" onClick={handlePasswordChange}>Save changes</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalPassword;
