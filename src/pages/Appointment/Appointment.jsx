import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import dayjs from "dayjs";
import 'react-day-picker/dist/style.css';
import './Appointment.css';
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { appointmentCreate, allStylist, bringAllTreatments } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { getUserData } from "../../app/slice/userSlice";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { FcOk } from "react-icons/fc";
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

//---------------------------------------------------------------------

export const Appointment = () => {
  const now = dayjs();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [treatments, setTreatments] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appCreate, setAppCreate] = useState({
    appointmentDate: "",
    stylistId: "",
    treatmentId: "",
  });

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


  const navigate = useNavigate();
  const myPassport = useSelector(getUserData);
  const token = myPassport.token;

  const manageDate = (date) => {
    if (dayjs(date).diff(now, "d") <= 0 || dayjs(date).day() === 0 || dayjs(date).day() === 6) {
      showToast("Fecha anterior a la actual o fin de semana");
      setSelectedDate(null);
      return;
    }
    setSelectedDate(dayjs(date));
  };

  const manageTime = (time) => {
    if (dayjs(time).hour() < 8 || dayjs(time).hour() > 20) {
      showToast("El horario es: 08:00h a 20:00h");
      return;
    }
    setSelectedTime(time);
  };

  const dateForMe = async () => {
    const selectedDateTime = getSelectedDateTime();
    if (!appCreate.stylistId || !appCreate.treatmentId || !selectedDateTime) {
      showToast("Por favor selecciona un estilista, un tratamiento y una fecha/hora.");
      return;
    }

    try {
      const res = await appointmentCreate({ ...appCreate, appointmentDate: selectedDateTime.toISOString() }, token);
      setTimeout(() => {
        navigate("/profile");
        showToast("Cita creada con éxito","rgb(122, 201, 43)");
      }, 2000);
    } catch (error) {
      showToast("Error al crear la cita");
    }
  };

  useEffect(() => {
    const fetchStylistAndJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await allStylist(token);
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Hora de la cita"
            value={selectedTime}
            onChange={manageTime}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <div className="result">
          <Form.Control as="select" name="treatmentId" onChange={inputHandlerDates} className="select">
            <option value="">Selecciona un tratamiento</option>
            {treatments.map((job) => (
              <option value={job.id} key={job.id}>{job.treatment} {job.price}€</option>
            ))}
          </Form.Control>
          <Form.Control as="select" name="stylistId" onChange={inputHandlerDates} className="select">
            <option value="">Selecciona un estilista</option>
            {stylists.map((art) => (
              <option value={art.id} key={art.id}>{art.firstName}</option>
            ))}
          </Form.Control>
          <FcOk className="btnOk" onClick={dateForMe}>Get Appointment</FcOk>
        </div>
      </div>
    </div>
  );
};
