import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FcPlanner, FcCancel } from 'react-icons/fc';
import { CgProfile } from "react-icons/cg";
import { MdDeleteForever } from "react-icons/md";
import "./ModalCard.css";
import { getUserData } from '../../app/slice/userSlice';
import { useSelector } from 'react-redux';
import { getUsersByStylist } from '../../services/apiCalls';

//------------------------------------------------

function UserCard({ user, restoreUser, deleteUser,
    desactiveUser, onStateUserSuccess, deleteAppointmentByAdmin,
}) {
    const [showProfile, setShowProfile] = useState(false);
    const [showAppointments, setShowAppointments] = useState(false);
    const [profileData, setProfileData] = useState(user)
    const userReduxData = useSelector(getUserData) || {}

    const [appointment, setAppointment ] = useState([])
    const token = userReduxData?.token
    const userType = userReduxData?.decoded?.userRole

    const handleCloseProfile = () => setShowProfile(false);
    const handleShowProfile = () => {
        setProfileData(user)
        setShowProfile(true);
    };

    const handleCloseAppointments = () => setShowAppointments(false);
    const handleShowAppointments = () => setShowAppointments(true);



    const handleDeactivate = (userId) => {
        desactiveUser(userId);
        setProfileData(prevData => ({
            ...prevData,
            isActive: false
        }));
        onStateUserSuccess();
    };


    const handleRestore = (userId) => {
        restoreUser(userId);
        setProfileData(prevData => ({
            ...prevData,
            isActive: true
        }));
        onStateUserSuccess();
    };

    const handleDeleteAppointment = (appointmentId) => {
        deleteAppointmentByAdmin(appointmentId);
        setProfileData(prevData => ({
            ...prevData,

        }))
        onStateUserSuccess();
    }


    const handleDeleteConfirmation = (userId) => {
        const confirmDelete = window.confirm('¿Estás seguro de que quieres borrar este perfil?');

        if (confirmDelete) {
            deleteUser(userId)
        }
        onStateUserSuccess();
    };

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

                {user.stylist.length > 0 && (
                    <FcPlanner className='icon' variant="primary" onClick={handleShowAppointments} />
                )}
            </div>

            <Modal show={showProfile} onHide={handleCloseProfile} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{profileData.id} : {profileData.firstName} {profileData.lastName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <Card.Title>Email: {profileData.email}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                Phone: {profileData.phone}
                            </Card.Subtitle>
                            Status: {user.isActive ? "Activo" : "Inactivo"}
                            <Card.Text>
                            </Card.Text>

                            {userType === 1 && user.isActive && (
                                <Card.Link className='desActive' onClick={() => handleDeactivate(profileData.id)}>Desactive Profile</Card.Link>
                            )}

                            {userType === 1 && !user.isActive && (
                                <Card.Link className='active' onClick={() => handleRestore(profileData.id)}>Restore Profile</Card.Link>
                            )}

                            {userType === 1 && (
                                <Card.Link className='deleteProfile' onClick={() => handleDeleteConfirmation(profileData.id)}>Delete Profile</Card.Link>
                            )}

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
                                    </Card.Subtitle>
                                    <Card.Subtitle>
                                        Treatment: {appointment.treatment ? appointment.treatment.treatment : '-'} <br />
                                        Stylist : {appointment.stylist ? appointment.stylist.firstName : "-"}
                                    </Card.Subtitle>
                                    <MdDeleteForever className='icon'
                                        onClick={() => handleDeleteAppointment(appointment.id)} />
                                </Card.Body>
                            </Card>
                        ))

                    ) : (
                        <p>No hay citas.</p>
                    )}
                    {user.stylist.length > 0 ? (
                        user.stylist.map((dates) => (
                            <Card key={dates.id}>
                                <Card.Body>
                                    <Card.Title>ID: {dates.id}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        Date: {new Date(dates.appointmentDate).toLocaleString()}
                                    </Card.Subtitle>
                                    <Card.Subtitle>
                                        Trateatment: {dates.treatmentId} <br />
                                        Client : {dates.userId}
                                    </Card.Subtitle>
                                    <MdDeleteForever className='icon'
                                        onClick={() => handleDeleteAppointment(dates.id)} />
                                </Card.Body>
                            </Card>
                        ))
                    ) : (
                        <p></p>
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
