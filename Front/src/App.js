import {lazy, Suspense} from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Employees = lazy(() => import("./pages/Employees"));
const Requests = lazy(() => import("./pages/Requests"));
const CreateRequests = lazy(() => import("./pages/CreateRequests"));

function App() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="employees"
            element={
              <PrivateRoute>
                <Employees />
              </PrivateRoute>
            }
          />
          <Route
            path="crear-solicitud"
            element={
              <PrivateRoute>
                <CreateRequests />
              </PrivateRoute>
            }
          />

          <Route
            path="requests"
            element={
              <PrivateRoute>
                <Requests />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
