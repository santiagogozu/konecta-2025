import {createContext, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const decodeToken = (token) => {
    try {
      const payload = token.split(".")[1];

      const decodedPayload = JSON.parse(atob(payload));

      console.log("decodedPayload", decodedPayload);

      return decodedPayload;
    } catch (error) {
      console.error("Error al decodificar el token", error);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = decodeToken(token);
      if (decodedUser) {
        setUser(decodedUser);
      } else {
        logout();
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:8080/usuario/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({correo: email, password}),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        const decodedUser = decodeToken(data.token);
        setUser(decodedUser);
        navigate("/dashboard");
      } else {
        alert(data.message || "Error en la autenticación");
      }
    } catch (error) {
      console.error("Error al iniciar sesión", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}
