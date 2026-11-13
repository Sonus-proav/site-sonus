import { Outlet } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

/**
 * Layout das rotas /admin-*: monta o AuthProvider (e portanto firebase/auth) SOMENTE aqui.
 * É carregado via React.lazy no App.tsx, então visitantes do site público nunca baixam o Auth.
 * Por ser uma rota-layout, o provider persiste na navegação login → dashboard.
 */
export default function AdminAuthLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
