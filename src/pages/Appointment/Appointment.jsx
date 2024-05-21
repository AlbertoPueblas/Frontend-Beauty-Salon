import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import dayjs from "dayjs";
import 'react-day-picker/dist/style.css';
import './Appointment.css';
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { appointmentCreate, bringAllStylists, bringAllTreatments } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { getUserData } from "../../app/slice/userSlice";
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import { FcOk } from "react-icons/fc";
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

//--------------------------------------------------------------------------

export const Appointment = () => {
  const now = dayjs();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [msg, setMsg] = useState("");
  const [msgV, setMsgV] = useState("");

  const [treatments, setTreatments] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appCreate, setAppCreate] = useState({
    appointmentDate: "",
    stylistId: "",
    treatmentId: "",
  });

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

const showToastVariant = (message) => {
  Toastify({
      text: message,
      duration: 3000, 
      close: true, 
      gravity: "top",
      backgroundColor: "rgb(122, 201, 43)",
      stopOnFocus: true,
  }).showToastVariant();
}

  const navigate = useNavigate()
  const myPassport = useSelector(getUserData);
  const token = myPassport.token;
  
  //Control de dias 
  const manageDate = (date) => {
    if (dayjs(date).diff(now, "d") <= 0 && dayjs(date).day() === 0 || dayjs(date).day() === 6) {
      showToast("Fecha anterior a la actual o fin de semana");
      setSelectedDate(null);
      return;
    }
    // showToast("");
    setSelectedDate(dayjs(date));
  };
  //Control de horas
  const manageTime = (time) => {
    if(dayjs(time).hour() < 8 || dayjs(time).hour() < 20)
      showToast("El horario es: 08:00h a 20:00h")
    setSelectedTime(time);
  };
  
  const dateForMe = async () => {
    if (!appCreate.stylistId || !appCreate.treatmentId || !selectedDateTime) {
      showToast("Por favor selecciona un estilista, un tratamiento y una fecha/hora.");
      return;
    }

    try {
      const res = await appointmentCreate({ ...appCreate, appointmentDate: selectedDateTime.toISOString() }, token);
      setTimeout(() => {
        navigate("/profile");
        showToastVariant("Cita creada con éxito")
      }, 2000)
    } catch (error) {
      showToast("Error al crear la cita");
    }
  };

  useEffect(() => {
    const fetchStylistAndJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await bringAllStylists(token);
        setStylists(res.data.stylists);
        const resp = await bringAllTreatments(token);
        setTreatments(resp.data.treatment);
      } catch (error) {
        setError("Error al traer datos");
      }
      setLoading(false);
    };
    fetchStylistAndJobs();
  }, [token]);

  const inputHandlerDates = (e) => {
    setAppCreate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };


  const getSelectedDateTime = () => {
    if (selectedDate && selectedTime) {
      return selectedDate.hour(dayjs(selectedTime).hour()).minute(dayjs(selectedTime).minute());
    }
    return null;
  };

  const selectedDateTime = getSelectedDateTime();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <div className="content">
        <DayPicker
          mode="single"
          selected={selectedDate ? selectedDate.toDate() : undefined}
          onSelect={manageDate}
        />
        <LocalizationProvider label="Mobile variant" dateAdapter={AdapterDayjs}>
        <TimePicker defaultValue={dayjs('2022-04-17T15:30')}
            displayStaticWrapperAs="desktop"
            value={selectedTime}
            onChange={manageTime}
          />
        </LocalizationProvider>
        <div className="result">
          <Form.Control as="select" name="treatmentId" onChange={inputHandlerDates} className="select">
            <option value="">Select Treatment</option>
            {treatments.map((job) => (
              <option value={job.id} key={job.id}>{job.treatment} {job.price}€</option>
            ))}
          </Form.Control>
          <Form.Control
          as="select"
          name="stylistId" onChange={inputHandlerDates} className="select">
            <option value="">Select Stylist</option>
            {stylists.map((art) => (
              <option value={art.id} key={art.id}>{art.firstName}</option>
            ))}
          </Form.Control>
          <div>
            </div>
          <FcOk className="btnOk" onClick={dateForMe}>Get Appointment</FcOk>
          </div>
        </div>
    </div>
  );
};
