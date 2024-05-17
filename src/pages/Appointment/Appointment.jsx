import { useState } from "react";
import { DayPicker } from "react-day-picker";
import dayjs from "dayjs";
import 'react-day-picker/dist/style.css';
import './Appointment.css';
import { LocalizationProvider, StaticTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const Appointment = () => {
  const now = dayjs();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [msg, setMsg] = useState("");

  const manageDate = (date) => {
    if (dayjs(date).diff(now, "d") <= 0) {
      setMsg("No puedes seleccionar una fecha anterior a la actual");
      setSelectedDate(null);
      return;
    }
    setMsg("");
    setSelectedDate(dayjs(date));
  };

  const manageTime = (time) => {
    setSelectedTime(time);
  };

  const getSelectedDateTime = () => {
    if (selectedDate && selectedTime) {
      return selectedDate.hour(dayjs(selectedTime).hour()).minute(dayjs(selectedTime).minute());
    }
    return null;
  };

  const selectedDateTime = getSelectedDateTime();

  return (
    <div className="container">

      <div className="content">

          <DayPicker
            mode="single"
            selected={selectedDate ? selectedDate.toDate() : undefined}
            onSelect={manageDate}
          />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticTimePicker
                displayStaticWrapperAs="desktop"
                value={selectedTime}
                onChange={manageTime}
              />
            </LocalizationProvider>
      </div>
      {msg && <div className="message">{msg}</div>}
      {selectedDateTime && (
        <div className="result">
          <div>
            Selected Date: {selectedDateTime.format("dddd, MMMM D, YYYY h:mm A")}
          </div>
        </div>
      )}
    </div>
  );
};
