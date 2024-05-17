import { Navigate, Route, Routes } from "react-router-dom"
import { Register } from "../Register/Register"
import { Login } from "../Login/Login";
import { Home } from "../Home/Home";
import { Menu } from "../Menu/Menu";
import { Profile } from "../Profile/Profile";
import { Appointment } from "../Appointment/Appointment"
import { Dates } from "../MeDates/MeDates"
// import { ModAppointment } from "../modAppointmen/modAppointment";
//--------------------------------------------------------------

export const Body = () => {
    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/appointment" element={<Appointment />} />
                {/* <Route path="/modAppointment" element={<ModAppointment />} /> */}
                <Route path="/medates" element={<Dates />} />

            </Routes>
        </>
    )
}