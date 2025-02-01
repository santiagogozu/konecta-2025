import {createContext, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const decodeToken = (token) => {
    try {
      // Separamos el token en sus tres partes (header, payload, signature)
      const payload = token.split(".")[1];

      // Decodificamos la parte payload del token de base64
      const decodedPayload = JSON.parse(atob(payload));

      console.log("decodedPayload", decodedPayload);

      return decodedPayload; // Retornamos el payload decodificado
    } catch (error) {
      console.error("Error al decodificar el token", error);
      return null;
    }
  };

  // Verifica si hay un token en localStorage al cargar la app
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = decodeToken(token);
      if (decodedUser) {
        setUser(decodedUser);
      } else {
        logout(); // Si hay error al decodificar, cerramos sesión
      }
    }
  }, []);

  // Función de login
  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:8080/usuario/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({correo: email, password}),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token); // Guardamos el JWT
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

  // Función de logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/"; // Forzar redirección
  };

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}
