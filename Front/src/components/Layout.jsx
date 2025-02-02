import {useContext, useState} from "react";
import {Container, Navbar, Nav, Button, Col} from "react-bootstrap";
import {AuthContext} from "../context/AuthContext";
import {Link, Outlet, useLocation} from "react-router-dom";
import {FaHome, FaUsers, FaClipboardList, FaBars} from "react-icons/fa";

function Layout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const {user, logout} = useContext(AuthContext);

  const menuItems =
    user?.rol === "Administrador"
      ? [
          {path: "/dashboard", title: "Dashboard", icon: <FaHome />},
          {path: "/employees", title: "Empleados", icon: <FaUsers />},
          {path: "/requests", title: "Solicitudes", icon: <FaClipboardList />},
        ]
      : [
          {path: "/dashboard", title: "Dashboard", icon: <FaHome />},
          {path: "/requests", title: "Solicitudes", icon: <FaClipboardList />},
        ];

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/employees": "Empleados",
    "/requests": "Solicitudes",
  };

  return (
    <Container fluid className="vh-100 d-flex p-0">
      <Col
        md={3}
        lg={2}
        className={`bg-light p-3 shadow-sm d-flex flex-column ${
          sidebarOpen ? "" : "d-none d-md-block"
        }`}
        style={{borderRight: "2px solid #ddd"}}
      >
        <h4 className="text-center mb-4">Menú</h4>
        <Nav className="flex-column">
          {menuItems.map(({path, title, icon}) => (
            <Nav.Item key={path}>
              <Nav.Link
                as={Link}
                to={path}
                className={`d-flex align-items-center p-3 rounded shadow-sm mb-2 gap-2 ${
                  location.pathname === path
                    ? "bg-primary text-white"
                    : "text-dark"
                }`}
                style={{transition: "0.3s", fontSize: "1.1rem"}}
              >
                {icon} {title}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </Col>

      <Col className="d-flex flex-column p-0">
        <Navbar bg="light" className="px-4 shadow-sm d-flex align-items-center">
          <Button
            variant="outline-dark"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="me-3 d-md-none"
          >
            <FaBars />
          </Button>
          <h4 className="flex-grow-1">
            {pageTitles[location.pathname] || "Bienvenido"}
          </h4>
          <Button variant="danger" onClick={logout}>
            Cerrar Sesión
          </Button>
        </Navbar>
        <Container fluid className="p-4">
          <Outlet />
        </Container>
      </Col>
    </Container>
  );
}

export default Layout;
