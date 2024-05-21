import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { allTreatments } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { getUserData } from "../../app/slice/userSlice";
import { FcFinePrint, FcPlus } from "react-icons/fc";
import { BiPencil } from "react-icons/bi";
import Pagination from 'react-bootstrap/Pagination';


//--------------------------------------------------
export const Treatments = () => {
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [treatment, setTreatment] = useState([])

    //Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const userReduxData = useSelector(getUserData);
    const token = userReduxData.token;
    const userType = userReduxData.decoded.userRole;

    useEffect(() => {
        const fetchAppointments = async () => {
            try {

                const res = await allTreatments(token, currentPage);
                setTreatment(res.data.treatment);
                setTotalPages(res.data.total_pages);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAppointments();
    }, [currentPage, token]);

    //paginacion
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    return (
        <div className="table-responsive">
            <Table striped bordered hover className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name treatment</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {treatment.map((date) => (
                        <tr key={date.id}>
                            <td>{date.id}</td>
                            <td>{date.treatment}</td>
                            <td>{date.price} €</td>
                            <td className="status">
                                <FcPlus />
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
