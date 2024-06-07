import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux';

export const NavbarCrud = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
    window.location.reload();
  };
  
  const total = useAppSelector((state) => state.cart.totalCount);
  const usuarioActivo = localStorage.getItem("usuario");
  return (
    <>
      <Navbar expand="lg" style={{ backgroundColor: '#007bff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Container fluid style={{ padding: '10px 20px' }}>
          <Navbar.Brand
            className="text-white d-flex align-items-center mx-auto"
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}
          >
            <Link
              to="/homeHendrix"
              className="text-white mx-2"
              style={{
                textDecoration: 'none',
                padding: '5px 10px',
                borderRadius: '5px',
                transition: 'background-color 0.3s',
                backgroundColor: '#0056b3',
                marginRight: '10px'
              }}
            >
              HOME
            </Link>
            <span style={{ padding: '0 10px' }}>-</span>
            <Link
              to="/listProducts"
              className="text-white mx-2"
              style={{
                textDecoration: 'none',
                padding: '5px 10px',
                borderRadius: '5px',
                transition: 'background-color 0.3s',
                backgroundColor: '#0056b3',
                marginRight: '10px'
              }}
            >
              LIST PRODUCTS
            </Link>
            <span style={{ padding: '0 10px' }}>-</span>
            <Link
              to="/maps"
              className="text-white mx-2"
              style={{
                textDecoration: 'none',
                padding: '5px 10px',
                borderRadius: '5px',
                transition: 'background-color 0.3s',
                backgroundColor: '#0056b3',
                marginRight: '10px'
              }}
            >
              MAPS
            </Link>
            <span style={{ padding: '0 10px' }}>-</span>
            <Link
              to="/productos"
              className="text-white mx-2"
              style={{
                textDecoration: 'none',
                padding: '5px 10px',
                borderRadius: '5px',
                transition: 'background-color 0.3s',
                backgroundColor: '#0056b3',
                marginRight: '10px'
              }}
            >
              PRODUCTOS
            </Link>
            {usuarioActivo === "Admin" || usuarioActivo === "Operador" ? (
  <>
    <span style={{ padding: '0 10px' }}>-</span>
    <Link
      to="/charts"
      className="text-white mx-2"
      style={{
        textDecoration: 'none',
        padding: '5px 10px',
        borderRadius: '5px',
        transition: 'background-color 0.3s',
        backgroundColor: '#0056b3',
        marginRight: '10px'
      }}
    >
      CHARTS
    </Link>
  </>
) : (
  ""
)}
            
          </Navbar.Brand>
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll />

          <div className="d-flex align-items-center">
            <Link
              className="btn btn-primary position-relative rounded-pill"
              to="/cart"
              style={{
                padding: '10px 20px',
                marginRight: '10px',
                position: 'relative',
                transition: 'background-color 0.3s'
              }}
            >
              <span className="material-symbols-outlined m-1 mt-0">shopping_cart</span>

              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {isNaN(total) ? 0 : total}
                <span className="visually-hidden">products in cart</span>
              </span>
            </Link>

           

            <button
              className="btn btn-danger rounded-pill"
              onClick={handleLogout}
              style={{ borderRadius: '30px', transition: 'background-color 0.3s, color 0.3s', padding: '10px 20px' }}
            >
              Cerrar sesión
            </button>
          </div>
        </Container>
      </Navbar>
    </>
  );
}
