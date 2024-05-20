import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { allAppointments, deleteUser, resetUser } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { getUserData } from "../../app/slice/userSlice";
import dayjs from "dayjs";
import { FcFinePrint } from "react-icons/fc";
import { BiPencil } from "react-icons/bi";
import Pagination from 'react-bootstrap/Pagination';

//--------------------------------------------------
export const AdminAppointment = () => {
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
        const fetchAppointments = async () => {
            try {

                const res = await allAppointments(token, currentPage);
                setAppointment(res.data.appointment);
                setTotalPages(res.data.total_pages);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAppointments();
    }, [currentPage, token]);

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
                        <th>Stylist</th>
                        <th>Treatment</th>
                        <th>User Id</th>
                        <th className="celda">options</th>
                    </tr>
                </thead>
                <tbody>
                    {appointment.map((date) => (
                        <tr key={date.id}>
                            <td>{date.id}</td>
                            <td>{dayjs(date.appointmentDate)
                                .format("dddd, MMMM D, YYYY h:mm A")}</td>
                            <td>{date.stylistId}</td>
                            <td>{date.treatsmentId}</td>
                            <td>{date.userId}</td>
                            <td className="status">
                                <FcFinePrint />
                                <BiPencil />
                            </td>
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
