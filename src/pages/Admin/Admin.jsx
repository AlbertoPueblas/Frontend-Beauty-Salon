import { useEffect, useState } from "react";
import "./Admin.css";
import Table from 'react-bootstrap/Table';
import { allAppointments, allUsers, deleteAppointmentByAdmin, deleteUser, resetUser } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { getUserData } from "../../app/slice/userSlice";
import UserCard from "../../components/Card/ModalCard";
import Pagination from 'react-bootstrap/Pagination';

//--------------------------------------------------
export const Admin = () => {
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [appointment, setAppointment] = useState([])

    //Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const userReduxData = useSelector(getUserData);
    const token = userReduxData.token;
    const userType = userReduxData.decoded.userRole;
  
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await allUsers(token, currentPage);
                setUsers(res.data.users);
                setTotalPages(res.data.total_pages);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUsers();
    }, [currentPage, token]);

    const restoreUser = async (id) => {
        try {
            console.log("token",id ,token);
            const response = await resetUser(id, token);
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

    const delAppointment = async (id) => {
        try{
            console.log("token",id, token);
        const res = await deleteAppointmentByAdmin(id, token)
        console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    
    //Paginacion
    const handlePageChange = (page) => {
        setCurrentPage(page);
      };

    return (
        <div className="table-responsive">
            <Table striped bordered hover className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
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
                            <td className="status">
                                <UserCard user={user}
                                restoreUser={restoreUser}
                                deleteUser={deletePermanent}
                                deleteAppointmentByAdmin={delAppointment} /></td>
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
