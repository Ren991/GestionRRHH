import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import { ProtectedRoute } from "../auth/ProtectedRoute";
import CrearVacantePage from "../features/vacantes/pages/CrearVacantePage";
import VacantesListPage from "../features/vacantes/pages/VacantesListPage";
import MainLayout from "../components/layout/MainLayout";
import { PublicRoute } from "../auth/PublicRoute";
import EditVacantePage from "../features/vacantes/pages/EditVacantePage";
import VacantePublicPage from "../features/vacantes/pages/VacantePublicPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ROOT */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* VACANTE PÚBLICA (CANDIDATO) */}
        <Route
          path="/vacantes/:id"
          element={<VacantePublicPage />}
        />
        {/* LOGIN (sin navbar) */}

        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* LISTADO VACANTES */}
        <Route
          path="/admin/vacantes"
          element={
            <ProtectedRoute>
              <MainLayout>
                <VacantesListPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/vacantes/edit/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <EditVacantePage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        {/* CREAR VACANTE */}
        <Route
          path="/admin/vacantes/create"
          element={
            <ProtectedRoute>
              <MainLayout>
                <CrearVacantePage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}