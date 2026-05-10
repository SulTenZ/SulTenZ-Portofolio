// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import { lazy, Suspense } from "react";
import Home from "./pages/Home";
import CursorOrbs from "./components-ui/CursorOrbs";

const Projects = lazy(() => import("./pages/Projects"));
const Contacts = lazy(() => import("./pages/Contacts"));
const Certificates = lazy(() => import("./pages/Certificates"));

// Admin
import AdminLayout from "./sections-admin/AdminLayout";
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminSkills = lazy(() => import("./pages/admin/AdminSkills"));
const AdminProjects = lazy(() => import("./pages/admin/AdminProjects"));
const AdminCertificates = lazy(() => import("./pages/admin/AdminCertificates"));
const AdminSkillGroups = lazy(() => import("./pages/admin/AdminSkillGroups"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
import { AuthProvider, useAuth } from "./context/AuthContext";
import { LoadingProvider } from "./context/LoadingContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return children;
};

const PublicLayout = ({ children }) => {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 relative">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return (
      <Routes>
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
          <Route path="certificates" element={<AdminCertificates />} />
        </Route>
      </Routes>
    );
  }

  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -15 }
  };

  return (
    <PublicLayout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={{ duration: 0.4 }}><Home /></motion.div>} />
          <Route path="/projects" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={{ duration: 0.4 }}><Projects /></motion.div>} />
          <Route path="/contacts" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={{ duration: 0.4 }}><Contacts /></motion.div>} />
          <Route path="/certificates" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={{ duration: 0.4 }}><Certificates /></motion.div>} />
        </Routes>
      </AnimatePresence>
    </PublicLayout>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <LoadingProvider>
        <BrowserRouter>
          <CursorOrbs />
          <Suspense fallback={<div className="min-h-screen bg-background w-full" />}>
            <AnimatedRoutes />
          </Suspense>
        </BrowserRouter>
      </LoadingProvider>
    </AuthProvider>
  );
}