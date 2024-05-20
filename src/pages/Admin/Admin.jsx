import { useEffect, useState } from "react";
import "./Admin.css";
import Table from 'react-bootstrap/Table';
import { allAppointments, allUsers, deleteUser, resetUser } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { getUserData } from "../../app/slice/userSlice";
import UserCard from "../../components/Card/ModalCard";

//--------------------------------------------------
export const Admin = () => {
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [appointment, setAppointment] = useState([])

    const userReduxData = useSelector(getUserData);
    const token = userReduxData.token;
    const userType = userReduxData.decoded.userRole;
  
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await allUsers(token);
                setUsers(response.data.users);
                console.log(response.data.users);
                const res = await allAppointments(token);
                setAppointment(res.data.clientDates);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUsers();
    }, [token]);

    const restoreUser = async (id) => {
        try {
            console.log("token",id ,token);
            const response = await resetUser(id, token);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const deletePermanent = async (id) => {
        try{
            console.log("token",id ,token);
        const res = await deleteUser(id, token)
        console.log(res);
        } catch (error) {
            console.log(error);
        }
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
                    </tr>
                        <th className="celda">options</th>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td className="status">
                                <UserCard user={user}
                                restoreUser={restoreUser}
                                deleteUser={deletePermanent} /></td>
                        </tr>
                        ))}
                </tbody>
            </Table>
        </div>
    );
};
