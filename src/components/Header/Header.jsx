import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Header.css"
import { getUserData, logout } from '../../app/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'react-bootstrap/Image';
import { FcImport } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { IoPersonOutline, IoHomeOutline, IoCalendarOutline, IoImageOutline } from "react-icons/io5";
import Toastify from 'toastify-js';

//----------------------------------------------------------------
function Header() {

  const userReduxData = useSelector(getUserData) || {}
  const token = userReduxData?.token
  const userType = userReduxData?.decoded?.userRole

  const navigate = useNavigate()

  const showToast = (message, backgroundColor = "#f44336") => {
    Toastify({
        text: message,
        duration: 3000, // Duración 1 seg
        close: true, // Mostrar botón de cierre
        gravity: "top", // Posición del toast
        position: "center", // Alineación del toast
        backgroundColor: backgroundColor, // Color de fondo
        stopOnFocus: true, // Mantener el toast mientras esté enfocado
    }).showToast();
}

  const dispatch = useDispatch();
  const logOutMe = () => {
    dispatch(logout())
    showToast("You have been logged out, come back soon","rgb(6, 108, 204)")
  }

  return (
    <Navbar expand="lg" className="navBar">
      <Container fluid>
        <Image src="../../src/Images/MP.jpeg" width={40}></Image>
        <Navbar.Brand href="#"><h2>MP</h2></Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}
        {/* <Navbar.Collapse id="navbarScroll"> */}
        {/* <Nav.Link href="/home">Home</Nav.Link> */}
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          {userType === 1 ? (
            <>
              <NavDropdown title="Actions" id="navbarScrollingDropdown" className='actions' >
                <NavDropdown.Item href="/admin">Users</NavDropdown.Item>
                <NavDropdown.Item href="/stylist">Stylist</NavDropdown.Item>
                <NavDropdown.Item href="/allAppointment">Appointment</NavDropdown.Item>
                <NavDropdown.Item href="/treatments">Treatment</NavDropdown.Item>
                <NavDropdown.Divider />
                {token && <Nav.Link href="/profile">Profile</Nav.Link>}
              </NavDropdown>
            </>

          ) : userType === 2 ? (
            <>
              <NavDropdown title="Manager" >
                <NavDropdown.Item href="/manager">Users</NavDropdown.Item>
                <NavDropdown.Item href="/treatments">Treatment</NavDropdown.Item>
                <NavDropdown.Divider />
                {token && <Nav.Link href="/profile" className='actions'>Profile</Nav.Link>}
              </NavDropdown>
            </>
          ) : (
            <>
              <div className='iconDiv'>

                <IoHomeOutline className='iconNav' onClick={() => { navigate("/home") }} />
                {token && (
                  <IoCalendarOutline
                    className='iconNav'
                    onClick={() => {
                      navigate("/appointment");
                    }} />
                )}
                  {<IoImageOutline
                  className='iconNav'
                  onClick={() => {
                    navigate("/menu");
                  }} />}
                {token && <IoPersonOutline
                  className='iconNav'
                  onClick={() => {
                    navigate("/profile");
                  }}
                />}
              </div>
            </>
          )}
        </Nav>
        {token && (
          <FcImport
            className='exit'
            onClick={() => {
              logOutMe();
              navigate("/home");
            }} />
        )}
        {/* </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
}

export default Header;
