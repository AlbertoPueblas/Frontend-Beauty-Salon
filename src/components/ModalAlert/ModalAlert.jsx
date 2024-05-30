import "./ModalAlert.css"
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { desactiveProfile } from '../../services/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, logout } from '../../app/slice/userSlice';
import { FcDeleteDatabase, FcOk } from "react-icons/fc";;
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { IoPersonRemove } from "react-icons/io5";

//------------------------------------------------------------------------

function Delete(profileData) {

    const myPassport = useSelector(getUserData)
    const token = myPassport.token;

    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    // Muestra mensajes de error
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
    }

    const closeModal = () => {
        navigate("/");
        setTimeout(() => {
            navigate("/home")
        });
        setShow(false);
    }

    const dispatch = useDispatch();
    const logOutMe = () => {
        dispatch(logout())
    }
    const deleteProfile = async () => {
        try {
            setTimeout(() => {
                // Redirecciona al usuario
                navigate("/Home");
                logOutMe()
            }, 1000)

            // Espera un momento antes de realizar la llamada a la API
            setTimeout(async () => {
                try {

                    // Realiza la llamada a desactiveProfile
                    const res = await desactiveProfile(profileData, token);

                    // Verifica si la respuesta es correcta
                    if (res.status === 200) {
                        showToast("Failed to delete profile");
                    }
                } catch (error) {
                    showToast("Error deleting profile");
                }
            }, 2000);
        } catch (error) {
            showToast("Error during the process");

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
            <IoPersonRemove className="iconOk" variant="primary" onClick={handleDeleteClick}>
            </IoPersonRemove>
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