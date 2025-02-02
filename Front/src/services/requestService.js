const API_URL = "http://localhost:8080/solicitudes";

const fetchRequests = async (page = 1, limit = 5, search = "") => {
  console.log("PAGE --------------", page);
  const response = await fetch(
    `${API_URL}?page=${page.page}&limit=${
      page.limit
    }&search=${encodeURIComponent(page.search)}`,
    {
      headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
    }
  );
  if (!response.ok) {
    throw new Error("Error al obtener las solicitudes");
  }
  const data = await response.json();
  return data;
};

const deleteRequest = async (requestId, token) => {
  const response = await fetch(`${API_URL}/${requestId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Error al eliminar la solicitud");
  }
  return response.ok;
};

const createRequest = async (newRequest, token) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newRequest),
  });
  if (!response.ok) {
    throw new Error("Error al crear la solicitud");
  }
  return response.ok;
};

export {fetchRequests, deleteRequest, createRequest};
