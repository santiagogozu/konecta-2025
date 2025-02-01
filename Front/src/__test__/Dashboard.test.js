import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import {AuthContext} from "../context/AuthContext";
import Dashboard from "../pages/Dashboard";
import {MemoryRouter} from "react-router-dom";

const mockAuthContext = (user, logoutFn = jest.fn()) => ({
  user,
  logout: logoutFn,
});

describe("Dashboard Component", () => {
  it("Muestra el mensaje de bienvenida con la información del usuario.", () => {
    const user = {correo: "test@example.com", rol: "Usuario"};
    const logoutMock = jest.fn();
    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContext(user, logoutMock)}>
          <Dashboard />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(
      screen.getByText(`Bienvenido, ${user.correo} (${user.rol})`)
    ).toBeInTheDocument();
  });

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

  it('Muestra los botones "Ver Solicitudes" y "Cerrar Sesión"', () => {
    const user = {correo: "test@example.com", rol: "Usuario"};
    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContext(user)}>
          <Dashboard />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText("Ver Solicitudes")).toBeInTheDocument();
    expect(screen.getByText("Cerrar Sesión")).toBeInTheDocument();
  });
});
