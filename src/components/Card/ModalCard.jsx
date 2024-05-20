import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FcPlanner, FcCancel } from 'react-icons/fc';
import { CgProfile } from "react-icons/cg";
import { MdDeleteForever } from "react-icons/md";
import "./ModalCard.css";

//------------------------------------------------

function UserCard({ user, restoreUser, deleteUser }) {
    const [showProfile, setShowProfile] = useState(false);
    const [showAppointments, setShowAppointments] = useState(false);

    const handleCloseProfile = () => setShowProfile(false);
    const handleShowProfile = () => setShowProfile(true);

    const handleCloseAppointments = () => setShowAppointments(false);
    const handleShowAppointments = () => setShowAppointments(true);

    return (
        <>
            <div className="icons">
                {user.isActive ? (
                    <CgProfile className='icon' variant="primary" onClick={handleShowProfile} />
                ) : (
                    <FcCancel className='icon' variant="primary" onClick={handleShowProfile} />
                )}

                {user.clientDates.length > 0 && (
                    <FcPlanner className='icon' variant="primary" onClick={handleShowAppointments} />
                )}
            </div>

            <Modal show={showProfile} onHide={handleCloseProfile}>
                <Modal.Header closeButton>
                    <Modal.Title>{user.id} : {user.firstName} {user.lastName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <Card.Title>Email: {user.email}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                Phone: {user.phone}
                            </Card.Subtitle>
                            Status: {user.isActive ? "Activo" : "Inactivo"}
                            <Card.Text>
                            </Card.Text>
                            <Card.Link onClick={() => restoreUser(user.id)} href="admin">Restore Profile</Card.Link>
                            <Card.Link className='deleteProfile' onClick={() => deleteUser(user.id)} href="#">Delete Profile</Card.Link>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseProfile}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showAppointments} onHide={handleCloseAppointments}>
                <Modal.Header closeButton>
                    <Modal.Title>Citas de {user.firstName} {user.lastName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {user.clientDates.length > 0 ? (
                        user.clientDates.map((appointment) => (
                            <Card key={appointment.id}>
                                <Card.Body>
                                    <Card.Title>Cita ID: {appointment.id}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        Fecha: {new Date(appointment.appointmentDate).toLocaleString()}
                                    </Card.Subtitle>
                                    <Card.Subtitle>
                                        Tratamiento: {appointment.treatsmentId} <br />
                                        Estilista : {appointment.stylistId}
                                    </Card.Subtitle>
                                    <MdDeleteForever className='icon' />
                                </Card.Body>
                            </Card>
                        ))
                    ) : (
                        <p>No hay citas.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAppointments}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UserCard;
