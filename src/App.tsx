import React, { Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import { AppLayout } from "./components/layout/AppLayout"
import { AuthProvider } from "./contexts/AuthContext"
import { ProtectedRoute } from "./components/admin/ProtectedRoute"

// Lazy loading the pages to split the JS bundle
const Home = React.lazy(() => import("./pages/Home").then(module => ({ default: module.Home })))
const Projects = React.lazy(() => import("./pages/Projects").then(module => ({ default: module.Projects })))
const ProjectDetails = React.lazy(() => import("./pages/ProjectDetails").then(module => ({ default: module.ProjectDetails })))
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard").then(module => ({ default: module.AdminDashboard })))
const AdminLogin = React.lazy(() => import("./pages/AdminLogin").then(module => ({ default: module.AdminLogin })))

// Skeleton fallback that matches the site's background
const PageLoader = () => (
  <div className="min-h-screen bg-slate-50 dark:bg-black flex items-center justify-center transition-colors duration-300">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
)

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<PageLoader />}>
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
      </Suspense>
    </AuthProvider>
  )
}

export default App
