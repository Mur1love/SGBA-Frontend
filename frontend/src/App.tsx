import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth, type Role } from "./context/AuthContext";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Programas from "./pages/aluno/Programas";
import Candidatura from "./pages/aluno/Candidatura";
import MinhasSubmissoes from "./pages/aluno/MinhasSubmissoes";
import Perfil from "./pages/Perfil";
import Guias from "./pages/aluno/Guias";
import GerSubmissoes from "./pages/gerenciador/Submissoes";
import Avaliar from "./pages/gerenciador/Avaliar";
import GerProgramas from "./pages/gerenciador/Programas";
import GerEditais from "./pages/gerenciador/Editais";
import Relatorios from "./pages/gerenciador/Relatorios";

function RequireRole({ role, children }: { role: Role; children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) return <Navigate to={user.role === "aluno" ? "/aluno/programas" : "/gerenciador/painel"} replace />;
  return <>{children}</>;
}

function Home() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={user.role === "aluno" ? "/aluno/programas" : "/gerenciador/painel"} replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route
          element={
            <RequireRole role="aluno">
              <Layout />
            </RequireRole>
          }
        >
          <Route path="/aluno/programas" element={<Programas />} />
          <Route path="/aluno/candidatura" element={<Candidatura />} />
          <Route path="/aluno/candidatura/:programaId" element={<Candidatura />} />
          <Route path="/aluno/submissoes" element={<MinhasSubmissoes />} />
          <Route path="/aluno/guias" element={<Guias />} />
          <Route path="/aluno/perfil" element={<Perfil />} />
        </Route>
        <Route
          element={
            <RequireRole role="gerenciador">
              <Layout />
            </RequireRole>
          }
        >
          <Route path="/gerenciador/painel" element={<GerSubmissoes />} />
          <Route path="/gerenciador/submissoes" element={<GerSubmissoes />} />
          <Route path="/gerenciador/avaliar/:id" element={<Avaliar />} />
          <Route path="/gerenciador/programas" element={<GerProgramas />} />
          <Route path="/gerenciador/editais" element={<GerEditais />} />
          <Route path="/gerenciador/relatorios" element={<Relatorios />} />
          <Route path="/gerenciador/perfil" element={<Perfil />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
