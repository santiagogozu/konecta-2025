// import {useEffect, useState, useContext} from "react";
// import {
//   Container,
//   Table,
//   Button,
//   Modal,
//   Form,
//   Pagination,
// } from "react-bootstrap";
// import {AuthContext} from "../context/AuthContext";
// import Swal from "sweetalert2";
// import employeeService from "../services/employeeService";

// function Employees() {
//   const [employees, setEmployees] = useState([]);
//   const {user} = useContext(AuthContext);
//   const [showModal, setShowModal] = useState(false);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const pageSize = 5;
//   const [fechaIngreso, setFechaIngreso] = useState("");
//   const [nombre, setNombre] = useState("");
//   const [salario, setSalario] = useState("");
//   const [correo, setCorreo] = useState("");
//   const [password, setPassword] = useState("");
//   const [rolId, setRolId] = useState("");

//   const fetchEmployees = async () => {
//     const data = await employeeService.getEmployees({
//       page: currentPage,
//       limit: pageSize,
//       search,
//     });
//     setEmployees(data.employees);
//     setTotalPages(data.totalPages);
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, [currentPage, search]);

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//     setCurrentPage(1);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleCreateEmployee = async (e) => {
//     e.preventDefault();
//     const newEmployee = {
//       fecha_ingreso: fechaIngreso,
//       nombre,
//       salario: parseFloat(salario),
//       correo,
//       password,
//       rolId: parseInt(rolId),
//     };
//     try {
//       const response = await fetch("http://localhost:8080/usuario/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify(newEmployee),
//       });

//       if (response.ok) {
//         Swal.fire("Éxito", "Usuario creado correctamente", "success");
//         setShowModal(false);
//         setFechaIngreso("");
//         setNombre("");
//         setSalario("");
//         setCorreo("");
//         setPassword("");
//         setRolId("");
//         fetchEmployees();
//       } else {
//         Swal.fire("Error", "No se pudo crear el usuario", "error");
//       }
//     } catch (error) {
//       console.error("Error al crear el usuario:", error);
//       Swal.fire("Error", "Hubo un problema al crear el usuario", "error");
//     }
//   };

//   return (
//     <Container>
//       <Container className="mt-5">
//         <h2>Empleados</h2>
//         <Form.Control
//           type="text"
//           placeholder="Buscar por nombre..."
//           value={search}
//           onChange={handleSearchChange}
//           className="mb-3"
//         />
//         {user?.rol === "Administrador" && (
//           <Button className="mb-3" onClick={() => setShowModal(true)}>
//             Crear Usuario
//           </Button>
//         )}
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Nombre</th>
//               <th>Fecha de Ingreso</th>
//               <th>Salario</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees.length > 0 ? (
//               employees.map((employee) => (
//                 <tr key={employee.id}>
//                   <td>{employee.id}</td>
//                   <td>{employee.nombre}</td>
//                   <td>
//                     {new Date(employee.fecha_ingreso).toLocaleDateString()}
//                   </td>
//                   <td>{employee.salario}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4">No hay empleados disponibles</td>
//               </tr>
//             )}
//           </tbody>
//         </Table>

//         <Pagination>
//           {[...Array(totalPages).keys()].map((num) => (
//             <Pagination.Item
//               key={num + 1}
//               active={num + 1 === currentPage}
//               onClick={() => handlePageChange(num + 1)}
//             >
//               {num + 1}
//             </Pagination.Item>
//           ))}
//         </Pagination>
//       </Container>
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Crear Nuevo Usuario</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleCreateEmployee}>
//             <Form.Group className="mb-3">
//               <Form.Label>Fecha de Ingreso</Form.Label>
//               <Form.Control
//                 type="date"
//                 value={fechaIngreso}
//                 onChange={(e) => setFechaIngreso(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Nombre</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Ingrese el nombre"
//                 value={nombre}
//                 onChange={(e) => setNombre(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Salario</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Ingrese el salario"
//                 value={salario}
//                 onChange={(e) => setSalario(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Correo</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Ingrese el correo"
//                 value={correo}
//                 onChange={(e) => setCorreo(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Contraseña</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="Ingrese la contraseña"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Rol</Form.Label>
//               <Form.Control
//                 as="select"
//                 value={rolId}
//                 onChange={(e) => setRolId(e.target.value)}
//                 required
//               >
//                 <option value="1">Empleado</option>
//                 <option value="2">Administrador</option>
//               </Form.Control>
//             </Form.Group>

//             <Button variant="primary" type="submit">
//               Crear Usuario
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// }

// export default Employees;

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
import {FaPlusCircle, FaTrashAlt} from "react-icons/fa"; // Íconos
import employeeService from "../services/employeeService";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const {user} = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [nombre, setNombre] = useState("");
  const [salario, setSalario] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [rolId, setRolId] = useState("");

  const fetchEmployees = async () => {
    const data = await employeeService.getEmployees({
      page: currentPage,
      limit: pageSize,
      search,
    });
    setEmployees(data.employees);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    fetchEmployees();
  }, [currentPage, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleCreateEmployee = async (e) => {
    e.preventDefault();
    const newEmployee = {
      fecha_ingreso: fechaIngreso,
      nombre,
      salario: parseFloat(salario),
      correo,
      password,
      rolId: parseInt(rolId),
    };
    try {
      const response = await fetch("http://localhost:8080/usuario/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newEmployee),
      });

      if (response.ok) {
        Swal.fire("Éxito", "Usuario creado correctamente", "success");
        setShowModal(false);
        setFechaIngreso("");
        setNombre("");
        setSalario("");
        setCorreo("");
        setPassword("");
        setRolId("");
        fetchEmployees();
      } else {
        Swal.fire("Error", "No se pudo crear el usuario", "error");
      }
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      Swal.fire("Error", "Hubo un problema al crear el usuario", "error");
    }
  };

  const deleteEmployee = (employeeId) => {
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
        fetch(`http://localhost:8080/usuario/${employeeId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => {
            if (res.ok) {
              setEmployees(
                employees.filter((employee) => employee.id !== employeeId)
              );
              Swal.fire(
                "Eliminado",
                "El empleado ha sido eliminado.",
                "success"
              );
            } else {
              Swal.fire("Error", "No se pudo eliminar el empleado.", "error");
            }
          })
          .catch((error) => {
            console.error("Error al eliminar el empleado:", error);
            Swal.fire(
              "Error",
              "Hubo un problema al eliminar el empleado.",
              "error"
            );
          });
      }
    });
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center text-primary mb-4">Empleados</h2>
      <Form.Control
        type="text"
        placeholder="Buscar por nombre..."
        value={search}
        onChange={handleSearchChange}
        className="mb-3"
      />
      {user?.rol === "Administrador" && (
        <Button
          variant="success"
          className="mb-3 d-flex align-items-center"
          onClick={() => setShowModal(true)}
        >
          <FaPlusCircle className="me-2" />
          Crear Usuario
        </Button>
      )}
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Fecha de Ingreso</th>
            <th>Salario</th>
            {user?.rol === "Administrador" && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.nombre}</td>
                <td>{new Date(employee.fecha_ingreso).toLocaleDateString()}</td>
                <td>{employee.salario}</td>
                {user?.rol === "Administrador" && (
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => deleteEmployee(employee.id)}
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
                No hay empleados disponibles
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
          <Modal.Title>Crear Nuevo Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateEmployee}>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Ingreso</Form.Label>
              <Form.Control
                type="date"
                value={fechaIngreso}
                onChange={(e) => setFechaIngreso(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Salario</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese el salario"
                value={salario}
                onChange={(e) => setSalario(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese el correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese la contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rol</Form.Label>
              <Form.Control
                as="select"
                value={rolId}
                onChange={(e) => setRolId(e.target.value)}
                required
              >
                <option value="1">Empleado</option>
                <option value="2">Administrador</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Crear Usuario
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Employees;
