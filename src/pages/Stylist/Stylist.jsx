import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { 
    deleteAppointmentByAdmin, 
    deleteUser, 
    resetUser, 
    desactiveUser, 
    allStylist
} from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { getUserData } from "../../app/slice/userSlice";
import UserCard from "../../components/Card/ModalCard";
import "toastify-js/src/toastify.css";
import Toastify from 'toastify-js';
import ModalCreateStylist from "../../components/ModalCreateStylist/ModalCreateStylist";

//--------------------------------------------------

export const Stylist = () => {

    const [users, setUsers] = useState([]);
    const [stylists, setStylists] = useState([]);
    const [show, setShow] = useState(false);
    const [stateUser, setStateUser] = useState (false)
    const [stateDate, setStateDate] = useState (false)
    //Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const userReduxData = useSelector(getUserData);
    const token = userReduxData.token;
    const userType = userReduxData.decoded.userRole;

    const showToast = (message, backgroundColor = "#f44336") => {
        Toastify({
            text: message,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            backgroundColor: backgroundColor,
            stopOnFocus: true,
        }).showToast();
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await allStylist(token, currentPage);
                setUsers(res.data.stylists);
                console.log(res.data.stylists);
                // setTotalPages(res.data.total_pages);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUsers();
    }, [currentPage, token, stateUser]);

    //Actualiza el estado del usuario
    const handleStateUserSuccessfully = () => {
        setStateUser(!stateUser) 
    }

    // const handleRestore = (userId) => {
    //     resetUser(userId);
    //     setProfileData(prevData => ({
    //         ...prevData,
    //         isActive: true
    //     }));
    //     onStateUserSuccess();
    // };


    // const handleDeactivate = (userId) => {
    //     desactiveUser(userId);
    //     setProfileData(prevData => ({
    //         ...prevData,
    //         isActive: false
    //     }));
    //     onStateUserSuccess();
    // };

    const restoreProfile = async (id) => {
        try {
            showToast("Profile restored", "#4caf50")
            const response = await resetUser(id, token);
        } catch (error) {
            showToast("Error to restore")
        }
    }

    const desactiveProfile = async (id) => {
        try {
            const response = await desactiveUser(id, token);
            showToast("Profile disabled")

        } catch (error) {
            showToast("Error to disable")
        }
    }

    const deletePermanent = async (id) => {
        try {
            const res = await deleteUser(id, token)
            showToast("Delete completed", "#4caf50")
        } catch (error) {
            showToast("Error to delete profile")
        }
    }

    const delAppointment = async (id) => {
        if(window.confirm("Are you sure delete this appointment?")) {
            try {
                const res = await deleteAppointmentByAdmin(id, token)
                showToast("appointment has delete", "#4caf50")

            } catch (error) {
                showToast("Error to delete appointment")

            }
        }
    }
    const handleShowAppointments = (stylist) => {
        setShow(true); 
        const orderArray = stylist.sort((a,b) => a.firstName.localCompare(b.firstName));
        setStylists(orderArray);
    }
    return (
        <div className="table-responsive">
                <h4>Styilist 
                    <ModalCreateStylist
                    onStateUserSuccess={handleStateUserSuccessfully} /></h4>
            <Table striped bordered hover className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th className="celda">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td className="status">
                                <UserCard user={user}
                                    restoreUser={restoreProfile}
                                    desactiveUser={desactiveProfile}
                                    deleteUser={deletePermanent}
                                    onStateUserSuccess={handleStateUserSuccessfully}
                                    deleteAppointmentByAdmin={delAppointment} 
                                    handleShowAppointments={() => handleShowAppointments(user.stylist.length > 0)}
                                    /></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};
