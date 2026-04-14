import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import { ProtectedRoute } from "../auth/ProtectedRoute";
// (lo vamos a crear en el próximo paso)

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ROOT */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* LOGIN */}
        <Route path="/login" element={<LoginPage />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* CREAR VACANTE */}
        <Route
          path="/admin/vacantes/create"
          element={
            <ProtectedRoute>
{/*               <CrearVacantePage />
 */}            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}