import {useState, useContext} from "react";
import {
  Container,
  Form,
  Button,
  Card,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import {AuthContext} from "../context/AuthContext";
import {FaEnvelope, FaLock} from "react-icons/fa"; // Iconos

function Login() {
  const {login} = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex justify-content-center align-items-center bg-dark"
    >
      <Row className="w-100">
        <Col xs={12} sm={10} md={6} lg={4} className="mx-auto">
          <Card
            className="p-4 shadow rounded"
            style={{backgroundColor: "#f8f9fa"}}
          >
            <Card.Body>
              <h2 className="text-center mb-4 text-primary">Iniciar Sesión</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaEnvelope />
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      placeholder="Ingresa tu email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group controlId="password" className="mt-3">
                  <Form.Label>Contraseña</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaLock />
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      placeholder="Ingresa tu contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </InputGroup>
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mt-4">
                  Iniciar Sesión
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
