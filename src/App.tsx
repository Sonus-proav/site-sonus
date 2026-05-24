import { Routes, Route } from "react-router-dom"
import { AppLayout } from "./components/layout/AppLayout"
import { Home } from "./pages/Home"
import { Projects } from "./pages/Projects"
import { ProjectDetails } from "./pages/ProjectDetails"
import { AdminDashboard } from "./pages/AdminDashboard"
import { AdminLogin } from "./pages/AdminLogin"
import { AuthProvider } from "./contexts/AuthContext"
import { ProtectedRoute } from "./components/admin/ProtectedRoute"

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="projetos" element={<Projects />} />
          <Route path="projetos/:id" element={<ProjectDetails />} />
        </Route>
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route 
          path="/admin-dashboard-sonus" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </AuthProvider>
  )
}

export default App
