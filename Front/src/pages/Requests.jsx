import {useEffect, useState, useContext} from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  Pagination,
} from "react-bootstrap";
import {AuthContext} from "../context/AuthContext";
import Swal from "sweetalert2";
import {FaTrashAlt, FaPlusCircle} from "react-icons/fa";
import {
  fetchRequests,
  deleteRequest,
  createRequest,
} from "../services/requestService"; // Importamos los servicios

function Requests() {
  const [requests, setRequests] = useState([]);
  const {user} = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [resumen, setResumen] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  const fetchAllRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await fetchRequests({
        page: currentPage,
        limit: pageSize,
        search,
        token,
      });
      console.log("Data ", data);
      setRequests(data.requests);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching requests:", error);
      Swal.fire("Error", "Hubo un problema al cargar las solicitudes", "error");
    }
  };

  useEffect(() => {
    fetchAllRequests();
  }, [currentPage, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleDeleteRequest = async (requestId) => {
    try {
      const token = localStorage.getItem("token");
      const isDeleted = await deleteRequest(requestId, token);
      if (isDeleted) {
        fetchAllRequests();
        Swal.fire("Eliminado", "La solicitud ha sido eliminada.", "success");
      }
    } catch (error) {
      console.error("Error deleting request:", error);
      Swal.fire("Error", "No se pudo eliminar la solicitud", "error");
    }
  };

  const handleCreateRequest = async (e) => {
    e.preventDefault();
    const empleadoId = user.empleadoId;
    const newRequest = {codigo, descripcion, resumen, empleadoId};

    try {
      const token = localStorage.getItem("token");
      const isCreated = await createRequest(newRequest, token);
      if (isCreated) {
        Swal.fire("Éxito", "Solicitud creada correctamente", "success");
        setShowModal(false);
        setCodigo("");
        setDescripcion("");
        setResumen("");
        fetchAllRequests();
      }
    } catch (error) {
      console.error("Error creating request:", error);
      Swal.fire("Error", "Hubo un problema al crear la solicitud", "error");
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center text-primary mb-4">Solicitudes</h2>
      <Form.Control
        type="text"
        placeholder="Buscar por código..."
        value={search}
        onChange={handleSearchChange}
        className="mb-3"
      />
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
                      onClick={() => handleDeleteRequest(request.id)}
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

      <Pagination>
        {[...Array(totalPages).keys()].map((num) => (
          <Pagination.Item
            key={num + 1}
            active={num + 1 === currentPage}
            onClick={() => setCurrentPage(num + 1)}
          >
            {num + 1}
          </Pagination.Item>
        ))}
      </Pagination>

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
