import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { MDBBtn,MDBIcon } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useContext,useState} from 'react';
import { UserContext } from '../../App';
import '../Header/Header.css'
import Offcanvas from 'react-bootstrap/Offcanvas'

function Header() {
  const[loggedInuser,setloggedInuser] = useContext(UserContext);
  const navigate = useNavigate();
 
  const signIn=()=>{
    navigate('/login');
  }
  
  return (


    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
          
      <Navbar.Brand as={Link} to='/'>Burj Al Arab</Navbar.Brand>
      
      <Navbar.Toggle className='navToggle' aria-controls="basic-navbar-nav"><i class="fas fa-bars"></i></Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to='/book'>Book</Nav.Link>
          <Nav.Link as={Link} to='/bookingslist'>My Bookings</Nav.Link>
          <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
        
          <Nav.Link>
          {!loggedInuser.name ?  <p style={{marginTop:'15px'}} onClick={signIn}><span><MDBIcon fas icon="user-circle" />  Login</span></p> : <p><span style={{color:'crimson',fontSize:'20px' ,fontWeight:'bold'}}><MDBIcon className='userIcon' fas icon="user-tie" />{loggedInuser.name} </span></p>}
     
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>


   
  );
}

export default Header;