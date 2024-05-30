import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import {
    getUsersByStylist,
    deleteAppointmentByAdmin,
} from "../../services/apiCalls";
import "./Manager.css"
import { useSelector } from "react-redux";
import { getUserData } from "../../app/slice/userSlice";
import "toastify-js/src/toastify.css";
import Toastify from 'toastify-js';
import Pagination from 'react-bootstrap/Pagination';
import dayjs from "dayjs";

//--------------------------------------------------

export const Manager = () => {
    const [appointments, setAppointments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const itemsPerPage = 10;

    const userReduxData = useSelector(getUserData);
    const token = userReduxData.token;
    const userType = userReduxData.decoded.userRole;
    const stylistId = userReduxData.decoded.userRole;

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
        const fetchAppointments = async () => {
            try {
                const res = await getUsersByStylist(token, currentPage); 
                const sortedAppointments = res.data.appointment.sort((a, b) => // orden de fecha
                    new Date(a.appointmentDate) - new Date(b.appointmentDate)
                );
                setAppointments(sortedAppointments);
                setTotalPages(res.data.total_pages || 1); 
            } catch (error) {
                showToast(error);
            }
        };
        fetchAppointments();
    }, [currentPage, token]);

    const delAppointment = async (id) => {
        if (window.confirm("Are you sure delete this appointment?")) {
            try {
                await deleteAppointmentByAdmin(id, token);
                showToast("Appointment has been deleted", "#4caf50");
                setAppointments(appointments.filter(app => app.id !== id));
            } catch (error) {
                showToast("Error deleting appointment");
            }
        }
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    let placeholders = [];
    if (appointments.length < itemsPerPage) {
        placeholders = Array(itemsPerPage - appointments.length).fill({});
    }

    return (
        <div className="table-responsive">
            <h5>All Users</h5>
            <Table striped bordered hover className="table">
                <thead>
                    <tr>
                        <th>Client Name</th>
                        <th>Phone</th>
                        <th>Appointment Date</th>
                        <th>Treatment</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.length > 0 && appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.client.firstName}</td>
                            <td>{appointment.client.phone}</td>
                            <td>{dayjs(appointment.appointmentDate).format("D MMM YY - h:mm A")}</td>
                            {/* <td>{appointment.id}</td> */}
                            <td>{appointment.treatment.treatment}</td> 
                        </tr>
                    ))}
                    {placeholders.map((_, index) => (
                        <tr key={`placeholder-${index}`}>
                            <td colSpan={5} className="placeholder-row"></td>
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
