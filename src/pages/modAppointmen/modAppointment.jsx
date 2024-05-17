// import { useEffect, useState } from "react";
// import { DayPicker } from "react-day-picker";
// import dayjs from "dayjs";
// import 'react-day-picker/dist/style.css';
// import './modAppointment.css';
// import { LocalizationProvider, StaticTimePicker } from "@mui/x-date-pickers";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { Button, Card } from "react-bootstrap";
// import { bringAllStylist, bringAllTreatsment, updateAppointment } from "../../services/apiCalls";
// import { useSelector } from "react-redux";
// import { getUserData } from "../../app/slice/userSlice";
// import { useLocation, useNavigate } from "react-router-dom";
// import Alert from 'react-bootstrap/Alert';

// export const ModAppointment = (date) => {

//     const [ appointmentDate, stylistId ] = date

//     const now = dayjs();
//     const [selectedDate, setSelectedDate] = useState(null);
//     const [selectedTime, setSelectedTime] = useState(null);
//     const [msg, setMsg] = useState("");
//     const [treatments, setTreatments] = useState([]);
//     const [stylists, setStylists] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [appModify, setAppModify] = useState({
//         id: "",
//         appointmentDate: "",
//         stylistId: "",
//         treatmentId: "",
//     });

//     const navigate = useNavigate();
//     const myPassport = useSelector(getUserData);
//     const token = myPassport.token;

//     const location = useLocation();

//     useEffect(() => {
//         const fetchStylistAndTreatments = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const stylistResponse = await bringAllStylist(token);
//                 setStylists(stylistResponse.data.stylist);
//                 const treatmentsResponse = await bringAllTreatsment(token);
//                 setTreatments(treatmentsResponse.data.treatsment);
//             } catch (error) {
//                 setError("Error al traer datos");
//             }
//             setLoading(false);
//         };
//         fetchStylistAndTreatments();
//     }, [token]);

//     useEffect(() => {
//         if (appointmentData) {
//             // Si hay datos de cita, inicializa el estado con esos datos
//             setAppModify({
//                 id: appointmentData.id,
//                 appointmentDate: appointmentData.appointmentDate,
//                 stylistId: appointmentData.stylistId,
//                 treatmentId: appointmentData.treatmentId,
//             });
//         }
//     }, [appointmentData]);

//     const manageDate = (date) => {
//         if (dayjs(date).diff(now, "d") <= 0) {
//             setMsg("No puedes seleccionar una fecha anterior a la actual");
//             setSelectedDate(null);
//         } else {
//             setMsg("");
//             setSelectedDate(dayjs(date));
//         }
//     };

//     const inputHandlerDates = (e) => {
//         console.log(e.target.name,e.target.value);
//         setAppModify((prevState) => ({
//             ...prevState,
//             [e.target.name]: e.target.value,
//         }));
//     };

//     const manageTime = (time) => {
//         setSelectedTime(time);
//     };

//     const getSelectedDateTime = () => {
//         if (selectedDate && selectedTime) {
//             return selectedDate.hour(dayjs(selectedTime).hour()).minute(dayjs(selectedTime).minute());
//         }
//         return null;
//     };

//     const selectedDateTime = getSelectedDateTime();

//     if (loading) {
//         return <div>Cargando...</div>;
//     }

//     if (error) {
//         return <div>{error}</div>;
//     }

//     const modifyAppointment = async () => {
//         await updateAppointment(appModify, token);
//     };

//     return (
//         <div className="container">
//             {selectedDateTime && (
//                 <Alert variant="success">
//                     Selected Date: {selectedDateTime.format("dddd, MMMM D, YYYY h:mm A")}
//                 </Alert>
//             )}
//             {msg && <Alert variant="danger">{msg}</Alert>}
//             <div className="content">
//                 <DayPicker
//                     mode="single"
//                     selected={selectedDate ? selectedDate.toDate() : undefined}
//                     onSelect={manageDate}
//                 />
//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <StaticTimePicker
//                         displayStaticWrapperAs="desktop"
//                         value={selectedTime}
//                         onChange={manageTime}
//                     />
//                 </LocalizationProvider>
//                 <Card.Title>Id</Card.Title>
//                 <Card>{appModify.id}</Card>
//             </div>
//             <Button onClick={modifyAppointment}>Modificar Cita</Button>
//             {selectedDateTime && (
//                 <div className="result">
//                     <select name="treatmentId" onChange={inputHandlerDates} className="select">
//                         <option value="">Selecciona un Tratamiento</option>
//                         {treatments && treatments.map((treatment) => (
//                             <option value={treatment.id} key={treatment.id}>{treatment.treatsment}</option>
//                         ))}
//                     </select>
//                     <select name="stylistId" onChange={inputHandlerDates} className="select">
//                         <option value="">Selecciona un Estilista</option>
//                         {stylists && stylists.map((stylist) => (
//                             <option value={stylist.id} key={stylist.id}>{stylist.firstName}</option>
//                         ))}
//                     </select>
//                 </div>
//             )}
//         </div>
//     );
// };
