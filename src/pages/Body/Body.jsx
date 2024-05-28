import { Navigate, Route, Routes } from "react-router-dom"
import { Register } from "../Register/Register"
import { Admin } from "../Admin/Admin";
import { Home } from "../Home/Home";
import { Menu } from "../Menu/Menu";
import { Profile } from "../Profile/Profile";
import { Appointment } from "../Appointment/Appointment"
import { Dates } from "../MeDates/MeDates"
import { AdminAppointment } from "../allAppointment/allAppointment";
import { Treatments } from "../Treatment/Treatment";
import { Stylist } from "../Stylist/Stylist";
import { Manager } from "../Manager/Manager";

//--------------------------------------------------------------

export const Body = () => {
    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/Admin" element={<Admin />} />
                <Route path="/stylist" element={<Stylist />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/appointment" element={<Appointment />} />
                <Route path="/allAppointment" element={<AdminAppointment />} />
                <Route path="/treatments" element={<Treatments />} />
                <Route path="/manager" element={<Manager />} />
                <Route path="/medates" element={<Dates />} />
            </Routes>
        </>
    )
}