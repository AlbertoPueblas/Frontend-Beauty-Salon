import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { allTreatments, createTreatment } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { getUserData } from "../../app/slice/userSlice";
import { FcPlus } from "react-icons/fc";
import Pagination from 'react-bootstrap/Pagination';
import Create from "../../components/ModalCreate/ModalCreate";
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { FiSettings } from "react-icons/fi";

//--------------------------------------------------
export const Treatments = () => {
    const [treatment, setTreatment] = useState([]);
    const [show, setShow] = useState(false);
    const [treatmentData, setTreatmentData] = useState({
        treatment: "",
        price: ""
    });

    // Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [modalMode, setModalMode] = useState("create")

    const userReduxData = useSelector(getUserData);
    const token = userReduxData.token;

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
        const fetchTreatments = async () => {
            try {
                const res = await allTreatments(token, currentPage);
                setTreatment(res.data.treatment);
                setTotalPages(res.data.total_pages);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTreatments();
    }, [currentPage, token]);

    const handleShow = (mode) =>{
        setModalMode(mode);
        setShow(true);
    } 
    const handleClose = () => setShow(false);

    const handleCreateTreatment = async () => {
        try {
            await createTreatment(treatmentData, token);
            showToast("Treatment has been created", "#4caf50");
            setShow(false);
            setTreatmentData({ name: "", price: "" });
            
            const res = await allTreatments(token, currentPage);
            setTreatment(res.data.treatment);
            console.log("hii",res.data,"token");
        } catch (error) {
            console.log(error);
            showToast("Failed to create treatment");
        }
    };

    const handleModifyTreatment = async () =>{
        try {
            await modifyTreatment(treatmentData, token);
            showToast("Treatment has been modified", "#4caf50");
            
        } catch (error) {
            showToast("error",error)
        }
    }

    // Paginación
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
                    {treatment.map((t) => (
                        <tr key={t.id}>
                            <td>{t.id}</td>
                            <td>{t.treatment}</td>
                            <td>{t.price} €</td>
                            <td className="status">
                                <FcPlus onClick={handleShow} />
                                <FiSettings  onclick={handleShow}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Create
                show={show}
                onHide={handleClose}
                treatmentData={treatmentData}
                setTreatmentData={setTreatmentData}
                onCreate={handleCreateTreatment}
            />

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
