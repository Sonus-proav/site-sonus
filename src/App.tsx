import React, { Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import { AppLayout } from "./components/layout/AppLayout"
import { AuthProvider } from "./contexts/AuthContext"
import { ProtectedRoute } from "./components/admin/ProtectedRoute"
import { ErrorBoundary } from "./components/ErrorBoundary"

// Lazy loading the pages to split the JS bundle
const Home = React.lazy(() => import("./pages/Home").then(module => ({ default: module.Home })))
const Projects = React.lazy(() => import("./pages/Projects").then(module => ({ default: module.Projects })))
const ProjectDetails = React.lazy(() => import("./pages/ProjectDetails").then(module => ({ default: module.ProjectDetails })))
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard").then(module => ({ default: module.AdminDashboard })))
const AdminLogin = React.lazy(() => import("./pages/AdminLogin").then(module => ({ default: module.AdminLogin })))
const QSysLanding = React.lazy(() => import("./pages/QSysLanding").then(module => ({ default: module.QSysLanding })))
const MeetingRoomsLanding = React.lazy(() => import("./pages/MeetingRoomsLanding").then(module => ({ default: module.MeetingRoomsLanding })))
const ThankYou = React.lazy(() => import("./pages/ThankYou").then(module => ({ default: module.ThankYou })))
const AuditoriosTeatros = React.lazy(() => import("./pages/AuditoriosTeatros").then(module => ({ default: module.AuditoriosTeatros })))
const IgrejasTemplos = React.lazy(() => import("./pages/IgrejasTemplos").then(module => ({ default: module.IgrejasTemplos })))

import { HelmetProvider } from "react-helmet-async"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { ScrollReset } from "./components/ScrollReset"

// Skeleton fallback that matches the site's background
const PageLoader = () => (
  <div className="min-h-screen bg-slate-50 dark:bg-black flex items-center justify-center transition-colors duration-300">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
)

function NotFoundRedirect() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate("/", { replace: true, state: { show404Toast: true } })
  }, [navigate])
  return null
}

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <ErrorBoundary>
          <ScrollReset />
          <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="projetos" element={<Projects />} />
              <Route path="projetos/:id" element={<ProjectDetails />} />
            </Route>
            <Route path="qsys" element={<QSysLanding />} />
            <Route path="salas-reuniao" element={<MeetingRoomsLanding />} />
            <Route path="auditorios-e-teatros" element={<AuditoriosTeatros />} />
            <Route path="igrejas-e-templos" element={<IgrejasTemplos />} />
            <Route path="obrigado" element={<ThankYou />} />
            
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route 
              path="/admin-dashboard-sonus" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFoundRedirect />} />
          </Routes>
          </Suspense>
        </ErrorBoundary>
      </AuthProvider>
    </HelmetProvider>
  )
}

export default App
