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


function Header() {

  const userReduxData = useSelector(getUserData) || {}
  const token = userReduxData?.token
  const userType = userReduxData?.decoded?.userRole


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
          <Nav.Link href="/login">Login</Nav.Link>
          <NavDropdown title="Link" id="navbarScrollingDropdown">
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="/appointment">
              Appointment
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">
              Something else here
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="#" disabled>
            Link
          </Nav.Link>
        </Nav>
        <Button href='/home' onClick={ () => {logOutMe()}}>Log Out</Button>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default Header;
