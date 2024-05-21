import "./ModalAlert.css"
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { desactiveProfile } from '../../services/apiCalls';
import { useSelector } from 'react-redux';
import { getUserData } from '../../app/slice/userSlice';
import { FcDeleteDatabase, FcOk } from "react-icons/fc";;

//------------------------------------------------------------------------

function Delete( profileData) {

    const myPassport = useSelector(getUserData)
    const token = myPassport.token;

    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const closeModal = () => {
        navigate("/");
        setTimeout(() => {
            navigate("/home")
        });
        setShow(false);
    }

    const deleteProfile = async () => {
        try {
            setTimeout(() => {
                // Redirecciona al usuario
                navigate("/Home");
            },1000)
    
            // Espera un momento antes de realizar la llamada a la API
            setTimeout(async () => {
                try {

                    // Realiza la llamada a desactiveProfile
                    const res = await desactiveProfile(profileData, token);
    
                    // Verifica si la respuesta es correcta
                    if (res.status !== 200) {
                        setMsg("Failed to delete profile");
                    }
                } catch (error) {
                    console.error("Error deleting profile:", error);
                    setMsg("Error deleting profile");
                }
            }, 2000);
        } catch (error) {
            console.error("Error during the process:", error);
            setMsg("Error during the process");
    
            // Realiza el redireccionamiento después de manejar el error
            setTimeout(() => {
                navigate("/Home");
            }, 1000);
        }
    };

    const handleDeleteClick = () => {
        if (window.confirm("Are you sure you want to delete your profile?")) {
            setShow(true);
        }
    };

    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <FcDeleteDatabase className="iconOk" variant="primary" onClick={handleDeleteClick}>
            </FcDeleteDatabase>
            <Modal show={show} onHide={closeModal}>
                <Modal.Header className="modalShow" closeButton>
                    <Modal.Title>Delete Successfully</Modal.Title>
                </Modal.Header>

                <Modal.Body className="modalShow">
                    <h5>Your user has been deactivated, to restore it contact the administrator</h5>
                    <FcOk variant="primary" className="iconOk" onClick={() => {
                        deleteProfile(),
                        closeModal()
                        }} >Acept</FcOk>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Delete;