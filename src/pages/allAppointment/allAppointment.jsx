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

        // Muestra mensajes de error
        const showToast = (message) => {
            Toastify({
                text: message,
                duration: 3000, // Duración 3 seg
                close: true, // Mostrar botón de cierre
                gravity: "top", // Posición del toast
                position: "center", // Alineación del toast
                backgroundColor: "#f44336", // Color de fondo (rojo para errores)
                stopOnFocus: true, // Mantener el toast mientras esté enfocado
            }).showToast();
        }
    // Actualiza el estado
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await allAppointments(token, currentPage);
                setAppointment(res.data.appointment);
                setTotalPages(res.data.total_pages);
            } catch (error) {
                showToast(error);
            }
        };
        fetchAppointments();
    }, [currentPage, token]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
        
        //Crea el numero de filas necesarias para completar la tabla
       const placeholders = Array(itemsPerPage - appointment.length).fill({})

    const updateByAdmin = async (id) => {
        await updateForUser(id, token)
        showToast("Update appointment successfully")
    } 
    return (
        <div className="table-responsive">
            <Table striped bordered hover className="table">
                <thead>
                    <tr>
                        <th className="Id">ID</th>
                        <th>Appointment</th>
                        <th>Treatment</th>
                        <th>Stylist</th>
                        <th>Name</th>
                        <th className="celda"> Phone</th>
                        <th>options</th>
                    </tr>
                </thead>
                <tbody>
                    {appointment.map((date, index) => (
                        <tr className="rowAppointment" key={index}>
                            <td className="Id">{date.id}</td>
                            <td>{dayjs(date.appointmentDate).format("D MMM  YY - h:mm A")}</td>
                            <td width={250}>{date.treatment?.treatment || '-'}</td>
                            <td width={120}>{date.stylist?.firstName || '-'}</td>
                            <td width={200}>{date.client?.firstName || '-'}</td>
                            <td width={120}>{}{date.client?.phone}</td>
                            <td className="status">
                                <FcFinePrint />
                                <BiPencil onClick={() => navigate("")} />
                            </td>
                        </tr>
                          ))}
                          {/* Genera columnas vacias  */}
                    {placeholders.map((_, index) => (
                      <tr key={`placeholder-${index}`}>
                            <td colSpan={8} className="placeholder-row"></td>
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
