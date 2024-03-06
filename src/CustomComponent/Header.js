import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './header.css';

function Header() {
  return (
    <Navbar expand="lg" style={{backgroundColor: "#343a40"}}>
      <Container>
        <Navbar.Brand href="/home" id='text1'>Blog App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/create" id='text'>Create Blog</Nav.Link>
            <Nav.Link href="/bloglist" id='text'>Blog list</Nav.Link>
          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;