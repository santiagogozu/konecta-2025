import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import {AuthContext} from "../context/AuthContext";
import Dashboard from "../pages/Dashboard";
import {MemoryRouter} from "react-router-dom";

// Función de mock para el contexto de autenticación
const mockAuthContext = (user, logoutFn = jest.fn()) => ({
  user,
  logout: logoutFn,
});

describe("Dashboard Component", () => {
  it('Muestra el botón "Gestionar Empleados" para usuarios administradores.', () => {
    const user = {correo: "admin@example.com", rol: "Administrador"};
    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContext(user)}>
          <Dashboard />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText("Gestionar Empleados")).toBeInTheDocument();
  });

  it('No muestra el botón "Gestionar Empleados" para usuarios no administradores.', () => {
    const user = {correo: "test@example.com", rol: "Usuario"};
    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContext(user)}>
          <Dashboard />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.queryByText("Gestionar Empleados")).not.toBeInTheDocument();
  });

  it('Muestra el botón "Ver Solicitudes".', () => {
    const user = {correo: "test@example.com", rol: "Usuario"};
    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContext(user)}>
          <Dashboard />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText("Ver Solicitudes")).toBeInTheDocument();
  });
});
