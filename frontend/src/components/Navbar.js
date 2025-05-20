import { useEffect, useState, useRef } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../assets/logo.png'; // Asegúrate de que el logo exista en src/assets
import '../styles/App.css'; // Asegúrate de importar los estilos

function AppNavbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current && window.scrollY > 60) {
        setShowNavbar(false); // Oculta al bajar
      } else {
        setShowNavbar(true); // Muestra al subir
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className={`navbar shadow ${showNavbar ? 'navbar-show' : 'navbar-hide'}`}
    >
      <Container>
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

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/quotations">Quotations</Nav.Link>
            <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
            <Nav.Link as={Link} to="/inventory">Inventory</Nav.Link>
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
