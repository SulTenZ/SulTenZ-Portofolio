// src/sections-admin/Sidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const itemClass = ({ isActive }) =>
  [
    "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
    "backdrop-blur-sm",
    isActive
      ? "bg-white/60 text-gray-900 shadow-sm ring-1 ring-white/60"
      : "text-gray-800/80 hover:bg-white/40 hover:text-gray-900",
  ].join(" ");

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-white/30 backdrop-blur-xl border-r border-white/40 shadow-lg flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-extrabold tracking-tight text-gray-900">Admin Panel</h1>
      </div>

      <nav className="px-3 py-2 space-y-1 flex-1">
        <NavLink to="/admin" end className={itemClass}>Dashboard</NavLink>
        <NavLink to="/admin/skill-groups" className={itemClass}>Skill Groups</NavLink>
        <NavLink to="/admin/skills" className={itemClass}>Skills</NavLink>
        <NavLink to="/admin/projects" className={itemClass}>Projects</NavLink>
      </nav>

      <div className="p-4 border-t border-white/40">
        <button
          onClick={handleLogout}
          className="w-full text-left block rounded-lg px-3 py-2 text-sm font-medium transition-colors text-red-600 hover:bg-red-50"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}