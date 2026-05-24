import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Se não estiver logado, redireciona para a página secreta de login
    return <Navigate to="/admin-login" replace />;
  }

  return <>{children}</>;
}
