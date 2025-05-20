import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../assets/logo.png'; 

function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        {/* Brand: Logo + Title */}
        <Navbar.Brand as={Link} to="/dashboard" className="d-flex align-items-center">
          <img
            src={logo}
            alt="WellAging Logo"
            style={{ width: '40px', height: '40px', marginRight: '10px' }}
          />
          <span style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
            WellAging Dashboard
          </span>
        </Navbar.Brand>

        {/* Toggle for mobile */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Links */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/quotations">Quotations</Nav.Link>
            <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
            <Nav.Link as={Link} to="/inventory">Inventory</Nav.Link>

            {/* Profile Icon (just for visual now) */}
            <FaUserCircle
              size={26}
              style={{ color: 'white', marginLeft: '20px', cursor: 'pointer' }}
              title="User"
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
