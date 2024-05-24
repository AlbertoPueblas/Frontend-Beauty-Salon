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

//----------------------------------------------------------------
function Header() {

  const userReduxData = useSelector(getUserData) || {}
  const token = userReduxData?.token
  const userType = userReduxData?.decoded?.userRole

  const navigate = useNavigate()

  const dispatch = useDispatch();
  const logOutMe = () => {
    dispatch(logout())
  }

  return (
    <Navbar expand="lg" className="navBar">
    <Container fluid>
      <Image src="../../src/Images/MP.jpeg" width={40}></Image>
      <Navbar.Brand href="#">MP Estilistas</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
          >
            <Nav.Link href="/home">Home</Nav.Link>
          {userType === 1 ? (
            <>
          <NavDropdown title="Actions" id="navbarScrollingDropdown">
            <NavDropdown.Item href="/admin">Users</NavDropdown.Item>
            <NavDropdown.Item href="/stylist">Stylist</NavDropdown.Item>
            <NavDropdown.Item href="/allAppointment">Appointment</NavDropdown.Item>
            <NavDropdown.Item href="/treatments">Treatment</NavDropdown.Item>
            <NavDropdown.Divider />
          {token && <Nav.Link href="/profile">Profile</Nav.Link>}

          </NavDropdown>
            <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            />
          <Button variant="outline-success">Search</Button>
        </Form> 
            </>

        ) : userType === 2 ? (
          <>
            <NavDropdown title="Actions" id="navbarScrollingDropdown">
            <NavDropdown.Item href="/admin">Users</NavDropdown.Item>
              <NavDropdown.Item href="/treatments">Treatment</NavDropdown.Item>
              <NavDropdown.Divider />
              {token && <Nav.Link href="/profile">Profile</Nav.Link>}
            </NavDropdown>
          </>
        ) : (
          <>
            {token && <Nav.Link href="/profile">Profile</Nav.Link>}
            {token && <Nav.Link href="appointment">Appointment</Nav.Link>}
          </>
        )}
      </Nav>
      {token && (
        <FcImport 
          className='exit' 
          onClick={() => {
            logOutMe();
            navigate("/home");
          }}
        >
          Log Out
        </FcImport>
      )}
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
}

export default Header;
