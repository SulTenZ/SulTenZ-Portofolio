// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import { lazy, Suspense } from "react";
import Home from "./pages/Home";

const Projects = lazy(() => import("./pages/Projects"));
const Contacts = lazy(() => import("./pages/Contacts"));

// Admin
import AdminLayout from "./sections-admin/AdminLayout";
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminSkills = lazy(() => import("./pages/admin/AdminSkills"));
const AdminProjects = lazy(() => import("./pages/admin/AdminProjects"));
const AdminSkillGroups = lazy(() => import("./pages/admin/AdminSkillGroups"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
import { AuthProvider, useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-background w-full" />}>
        <Routes>
          {/* public */}
          <Route
            path="/"
            element={
              <div className="bg-background min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1 relative">
                  <Home />
                </main>
                <Footer />
              </div>
            }
          />
          <Route
            path="/projects"
            element={
              <div className="bg-background min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1 relative">
                  <Projects />
                </main>
                <Footer />
              </div>
            }
          />
          <Route
            path="/contacts"
            element={
              <div className="bg-background min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1 relative">
                  <Contacts />
                </main>
                <Footer />
              </div>
            }
          />

          {/* admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="skills" element={<AdminSkills />} />
            <Route path="skill-groups" element={<AdminSkillGroups />} />
            <Route path="projects" element={<AdminProjects />} />
          </Route>
        </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}