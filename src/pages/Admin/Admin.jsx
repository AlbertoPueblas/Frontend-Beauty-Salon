import { useEffect, useState } from "react";
import "./Admin.css";
import Table from 'react-bootstrap/Table';
import { allUsers, 
    deleteAppointmentByAdmin, 
    deleteUser, 
    resetUser, 
    desactiveUser, 
} from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { getUserData } from "../../app/slice/userSlice";
import UserCard from "../../components/Card/ModalCard";
import "toastify-js/src/toastify.css";
import Toastify from 'toastify-js';
import Pagination from 'react-bootstrap/Pagination';

//--------------------------------------------------

export const Admin = () => {

    const [users, setUsers] = useState([]);
    const [stateUser, setStateUser] = useState (false)
    const [stateDate, setStateDate] = useState (false)
    //Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    
    const itemsPerPage = 12;

    const userReduxData = useSelector(getUserData);
    const token = userReduxData.token;
    const userType = userReduxData.decoded.userRole;
    const stylistId = userReduxData.decoded.UserRole;

    const [filterUser, setFilterUser] = useState([])

    const showToast = (message, backgroundColor = "#f44336") => {
        Toastify({
            text: message,
            duration: 800,
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
                const res = await allUsers(token, currentPage);
                let fetchedUsers = res.data.users;
                setUsers(fetchedUsers);
                setFilterUser(res.data.users)
                console.log(res.data.users);
                setTotalPages(res.data.total_pages);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUsers();
    }, [currentPage, token, stateUser, userType, stylistId]);

    //Actualiza el estado del usuario
    const handleStateUserSuccessfully = () => {
        setStateUser(!stateUser) 
    }

    const restoreProfile = async (id) => {
        if (userType !== 1) {
            showToast("Unauthorized action", "#f44336");
            return;
        }
        try {
            showToast("Profile restored", "#4caf50")
            const response = await resetUser(id, token);
        } catch (error) {
            showToast("Error to restore")
        }
    }

    const desactiveProfile = async (id) => {
        if (userType !== 1) {
            showToast("Unauthorized action", "#f44336");
            return;
        }
        try {
            showToast("Profile disabled")
            const response = await desactiveUser(id, token);

        } catch (error) {
            showToast("Error to disable")
        }
    }

    const deletePermanent = async (id) => {
            if (userType !== 1) {
        showToast("Unauthorized action", "#f44336");
        return;
    }
        try {
            showToast("Delete completed", "#4caf50")
            const res = await deleteUser(id, token)

            if(users.length === 1 && currentPage - 1) {
                setCurrentPage(currentPage - 1)
            }
        } catch (error) {
            showToast("Error to delete profile")
        }
    }

    const delAppointment = async (id) => {
        if(window.confirm("Are you sure delete this appointment?")) {
            try {
                showToast("appointment has delete", "#4caf50")
                const res = await deleteAppointmentByAdmin(id, token)

            } catch (error) {
                showToast("Error to delete appointment")

            }
        }
    }
        
    //Paginacion
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    let placeholders = [];
    //Crea el numero de filas necesarias para completar la tabla
    if (users.length < itemsPerPage) {

        placeholders = Array(itemsPerPage - users.length).fill({})
    }

    return (
        <div className="table-responsive">
            <Table striped bordered hover className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
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
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td className="status">
                                <UserCard user={user}
                                    restoreUser={restoreProfile}
                                    desactiveUser={desactiveProfile}
                                    deleteUser={deletePermanent}
                                    onStateUserSuccess={handleStateUserSuccessfully}
                                    deleteAppointmentByAdmin={delAppointment} 
                                    /></td>
                        </tr>
                    ))}
                    {placeholders.map((_, index) => (
                        <tr key={`placeholder-${index}`}>
                            <td colSpan={6} className="placeholder-row1"></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="pagination">
                <Pagination>
                    <Pagination.Prev
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    />
                    {[...Array(totalPages)].map((_, index) => (
                        <Pagination.Item
                            key={index + 1}
                            active={index + 1 === currentPage}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    />
                </Pagination>
            </div>
        </div>
    );
};
