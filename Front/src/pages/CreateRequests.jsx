import {useState} from "react";
import {Container, Form, Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

function CreateRequest() {
  const [codigo, setCodigo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [resumen, setResumen] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRequest = {
      codigo,
      descripcion,
      resumen,
    };

    try {
      const response = await fetch("http://localhost:8080/solicitudes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newRequest),
      });

      if (response.ok) {
        Swal.fire("Éxito", "Solicitud creada correctamente", "success");
        navigate("/requests");
      } else {
        Swal.fire("Error", "No se pudo crear la solicitud", "error");
      }
    } catch (error) {
      console.error("Error al crear la solicitud:", error);
      Swal.fire("Error", "Hubo un problema al crear la solicitud", "error");
    }
  };

  return (
    <Container className="mt-5">
      <h2>Crear Nueva Solicitud</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Código</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el código"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Ingrese la descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Resumen</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Ingrese un resumen"
            value={resumen}
            onChange={(e) => setResumen(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Crear Solicitud
        </Button>
      </Form>
    </Container>
  );
}

export default CreateRequest;
