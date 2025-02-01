import {useEffect, useState, useContext} from "react";
import {Container, Table, Button, Modal, Form} from "react-bootstrap";
import {AuthContext} from "../context/AuthContext";
import Swal from "sweetalert2";
import {FaTrashAlt, FaPlusCircle} from "react-icons/fa"; // Íconos

function Requests() {
  const [requests, setRequests] = useState([]);
  const {user} = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [resumen, setResumen] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/solicitudes", {
      headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
    })
      .then((res) => res.json())
      .then((data) => {
        setRequests(data.data);
      })
      .catch((error) => {
        console.error("Error al obtener solicitudes:", error);
        setRequests([]);
      });
  }, []);

  const deleteRequest = (requestId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8080/solicitudes/${requestId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => {
            if (res.ok) {
              setRequests(
                requests.filter((request) => request.id !== requestId)
              );
              Swal.fire(
                "Eliminado",
                "La solicitud ha sido eliminada.",
                "success"
              );
            } else {
              Swal.fire("Error", "No se pudo eliminar la solicitud.", "error");
            }
          })
          .catch((error) => {
            console.error("Error al eliminar la solicitud:", error);
            Swal.fire(
              "Error",
              "Hubo un problema al eliminar la solicitud.",
              "error"
            );
          });
      }
    });
  };

  const handleCreateRequest = async (e) => {
    e.preventDefault();
    const empleadoId = user.empleadoId;
    const newRequest = {codigo, descripcion, resumen, empleadoId};

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
        setShowModal(false);
        setCodigo("");
        setDescripcion("");
        setResumen("");
        const updatedRequests = await response.json();
        setRequests([...requests, updatedRequests.data]);
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
      <h2 className="text-center text-primary mb-4">Solicitudes</h2>
      <Button
        variant="primary"
        className="mb-3 d-flex align-items-center"
        onClick={() => setShowModal(true)}
      >
        <FaPlusCircle className="me-2" />
        Crear Nueva Solicitud
      </Button>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Código</th>
            <th>Descripción</th>
            <th>Resumen</th>
            {user?.rol === "Administrador" && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.codigo}</td>
                <td>{request.descripcion}</td>
                <td>{request.resumen}</td>
                {user?.rol === "Administrador" && (
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => deleteRequest(request.id)}
                      className="d-flex align-items-center"
                    >
                      <FaTrashAlt className="me-2" />
                      Eliminar
                    </Button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={user?.rol === "Administrador" ? "5" : "4"}
                className="text-center"
              >
                No hay solicitudes disponibles
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Crear Nueva Solicitud</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateRequest}>
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

            <Button variant="primary" type="submit" className="w-100">
              Crear Solicitud
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Requests;
