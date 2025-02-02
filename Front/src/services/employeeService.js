const API_URL = "http://localhost:8080/empleados";

const employeeService = {
  getEmployees: async (page = 1, limit = 5, search = "") => {
    try {
      const response = await fetch(
        `${API_URL}?page=${page.page}&limit=${
          page.limit
        }&search=${encodeURIComponent(page.search)}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener empleados");
      }

      const data = await response.json();
      console.log("data", data);

      return {
        employees: data.employees || [],
        totalPages: data.totalPages || 1,
        currentPage: data.currentPage || 1,
      };
    } catch (error) {
      console.error("Error en getEmployees:", error);
      return {employees: [], totalPages: 1, currentPage: 1};
    }
  },

  createEmployee: async (employeeData) => {
    try {
      const response = await fetch(`${API_URL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        throw new Error("Error al crear empleado");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en createEmployee:", error);
      return null;
    }
  },

  deleteEmployee: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return response.ok;
    } catch (error) {
      console.error("Error en deleteEmployee:", error);
      return false;
    }
  },
};

export default employeeService;
