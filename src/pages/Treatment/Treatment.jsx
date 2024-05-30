import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { allTreatments, createTreatment, deleteTreatment, modifyTreatment } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { getUserData } from "../../app/slice/userSlice";
import { FcPlus } from "react-icons/fc";
import Pagination from 'react-bootstrap/Pagination';
import Create from "../../components/ModalCreate/ModalCreate";
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { FiSettings } from "react-icons/fi";
import Modify from "../../components/ModalModify/ModalModify";
import { MdOutlineDeleteForever } from "react-icons/md";
import "./Treatment.css"

//-------------------------------------------------------------------------------------

export const Treatments = () => {
    const [treatments, setTreatments] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [showModify, setShowModify] = useState(false);
    const [treatmentData, setTreatmentData] = useState({
        treatment: "",
        price: ""
    });

    const [deleteSuccess, setDeleteSuccess] = useState(false);

    const itemsPerPage = 15;

    // Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const userReduxData = useSelector(getUserData);
    const token = userReduxData.token;

    const showToast = (message, backgroundColor = "#f44336") => {
        Toastify({
            text: message,
            duration: 1000,
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
                setTreatments(res.data.treatment);
                setTotalPages(res.data.total_pages);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTreatments();
    }, [currentPage, token, deleteSuccess, treatmentData]);

    const handleShowCreate = () => {
        setTreatmentData({ treatment: "", price: "" });
        setShowCreate(true);
    };

    const handleShowModify = (treatment) => {
        setTreatmentData(treatment);
        setShowModify(true);
    };
    const handleDeleteSuccess = () => {
        setDeleteSuccess(!deleteSuccess);

    }

    const handleCloseCreate = () => setShowCreate(false);
    const handleCloseModify = () => setShowModify(false);

    const handleCreateTreatment = async () => {
        try {
            await createTreatment(treatmentData, token);
            showToast("El tratamiento ha sido creado", "#4caf50");
            setShowCreate(false);
            setTreatmentData({ treatment: "", price: "" });

            const res = await allTreatments(token, currentPage);
            setTreatments(res.data.treatment);
        } catch (error) {
            console.log(error);
            showToast("Fallo al crear el tratamiento");
        }
    };

    const handleModifyTreatment = async () => {

        try {
            await modifyTreatment(treatmentData, token);
            showToast("El tratamiento ha sido modificado", "#4caf50");
            setShowModify(false);

            const res = await allTreatments(token, currentPage);
            setTreatments(res.data.treatment);
        } catch (error) {
            console.log(error);
            showToast("Fallo al modificar el tratamiento");
        }
    };

    const handleDeleteTreatment = async (id) => {
        if (window.confirm("Estás seguro de borrar el tratamiento")) {
            try {
                await deleteTreatment(id, token);
                showToast("El tratamiento ha sido eliminado", "#4caf50");
                // Verificar si la página actual quedará vacía después de eliminar
                if (treatments.length === 1 && currentPage > 1) {
                    // Retroceder una página si la página actual quedará vacía
                    setCurrentPage(prevPage => prevPage - 1);
                }
            } catch (error) {
                console.error(error);
                showToast("Error al eliminar el tratamiento", "#f44336");
            }
        }
    };

    let placeholders = [];

    if (treatments.length < itemsPerPage) {

        //Crea el numero de filas necesarias para completar la tabla
        placeholders = Array(itemsPerPage - treatments.length).fill({})
    }

    // Paginación
    const handlePageChange = (page) => {
        setCurrentPage(page);
        setTotalPages(page)
    };

    return (
        <div className="table-responsive">
            <Table striped bordered hover className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Treatment</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {treatments.map((t) => (
                        <tr key={t.id}>
                            <td>{t.id}</td>
                            <td>{t.treatment}</td>
                            <td>{t.price} €</td>
                            <td className="status">
                                    <FcPlus className="cita" 
                                    onClick={handleShowCreate} />
                                    <FiSettings className="setings" 
                                    onClick={() => handleShowModify(t)} />
                                    <MdOutlineDeleteForever className="delete" 
                                    onClick={(e) => handleDeleteTreatment(t.id)} />
                            </td>
                        </tr>
                    ))}
                    {placeholders.map((_, index) => (
                        <tr key={`placeholder-${index}`}>
                            <td colSpan={6} className="placeholder-row2"></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Create
                show={showCreate}
                onHide={handleCloseCreate}
                treatmentData={treatmentData}
                setTreatmentData={setTreatmentData}
                onCreate={handleCreateTreatment}
            />
            <Modify
                show={showModify}
                onHide={handleCloseModify}
                treatmentData={treatmentData}
                setTreatmentData={setTreatmentData}
                onModify={handleModifyTreatment}
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
