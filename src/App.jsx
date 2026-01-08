// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contacts from "./pages/Contacts";

// Admin
import AdminLayout from "./sections-admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminSkills from "./pages/admin/AdminSkills";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminSkillGroups from "./pages/admin/AdminSkillGroups";

export default function App() {
  return (
    <BrowserRouter>
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
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="skills" element={<AdminSkills />} />
          <Route path="skill-groups" element={<AdminSkillGroups />} />
          <Route path="projects" element={<AdminProjects />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
