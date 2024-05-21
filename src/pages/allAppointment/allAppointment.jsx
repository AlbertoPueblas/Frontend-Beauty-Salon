import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { allAppointments } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { getUserData } from "../../app/slice/userSlice";
import dayjs from "dayjs";
import { FcFinePrint } from "react-icons/fc";
import { BiPencil } from "react-icons/bi";
import Pagination from 'react-bootstrap/Pagination';
import './allAppointment.css';

//--------------------------------------------------
export const AdminAppointment = () => {
    const [appointment, setAppointment] = useState([]);

    // Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 15;
    const userReduxData = useSelector(getUserData);
    const token = userReduxData.token;

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

    const placeholders = Array(itemsPerPage - appointment.length).fill({});

    const updateByAdmin = async (id) => {
        await updateForUser(id, token)
        setMsg("Update appointment successfully")
    } 
    return (
        <div className="table-responsive">
            <Table striped bordered hover className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Appointment Date</th>
                        <th>Stylist</th>
                        <th>Treatment</th>
                        <th>Client</th>
                        <th className="celda">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {appointment.map((date, index) => (
                        <tr key={index}>
                            <td>{date.id}</td>
                            <td>{dayjs(date.appointmentDate).format("dddd, MMMM D, YYYY h:mm A")}</td>
                            <td>{date.stylist?.firstName || '-'}</td>
                            <td>{date.treatment?.treatment || '-'}</td>
                            <td>Name: {date.client?.firstName || '-'} <br />
                            Phone: {date.client?.phone}</td>
                            <td className="status">
                                <FcFinePrint />
                                <BiPencil onClick={() => navigate("")} />
                            </td>
                        </tr>
                          ))}
                    {placeholders.map((_, index) => (
                      <tr key={`placeholder-${index}`}>
                            <td colSpan={6} className="placeholder-row"></td>
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
