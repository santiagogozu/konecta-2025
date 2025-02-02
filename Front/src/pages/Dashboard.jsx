import React, {useContext} from "react";
import {Container, Button, Row, Col} from "react-bootstrap";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {FaUsers, FaClipboardList, FaSignOutAlt} from "react-icons/fa";

function Dashboard() {
  const {user, logout} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRedirect = (path) => {
    navigate(path);
  };

  return (
    <Container className="mt-5">
      <Row className="text-center">
        <Col>
          <h1 className="mb-3">Panel de Administración</h1>
          <p>
            Bienvenido, <strong>{user?.correo}</strong> ({user?.rol})
          </p>
        </Col>
      </Row>

      <Row className="text-center">
        <Col>
          {user?.rol === "Administrador" && (
            <Button
              variant="primary"
              onClick={() => handleRedirect("/employees")}
              className="mb-3"
              style={{
                width: "300px",
                height: "80px",
                fontSize: "1.2rem",
                padding: "20px",
              }}
            >
              <FaUsers className="me-2" style={{fontSize: "1.5rem"}} />
              Gestionar Empleados
            </Button>
          )}
          <Button
            variant="info"
            onClick={() => handleRedirect("/requests")}
            className="mb-3 ms-3"
            style={{
              width: "300px",
              height: "80px",
              fontSize: "1.2rem",
              padding: "20px",
            }}
          >
            <FaClipboardList className="me-2" style={{fontSize: "1.5rem"}} />
            Ver Solicitudes
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
