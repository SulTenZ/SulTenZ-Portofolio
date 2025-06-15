// src/sections/Navbar.jsx
import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Reset state saat navigasi halaman (misal kembali ke top)
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20); // Ubah threshold sesuai selera
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  return (
    <nav
      className={
        `fixed top-0 left-0 w-full z-20 flex items-center justify-between px-8 py-6 transition-colors duration-500
        ${scrolled ? "bg-background/90 shadow-lg backdrop-blur-md" : "bg-transparent"}`
      }
    >
      <Link to="/" className="text-white font-jakarta font-bold text-2xl tracking-tight">
        SUL<span className="text-main">TENZ</span>
      </Link>
      <div className="flex gap-10">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-dmsans hover:text-main transition ${isActive ? "text-secondary" : "text-white"}`
          }
          end
        >
          HOME
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `font-dmsans hover:text-main transition ${isActive ? "text-secondary" : "text-white"}`
          }
        >
          PROJECT
        </NavLink>
        <NavLink
          to="/contacts"
          className={({ isActive }) =>
            `font-dmsans hover:text-main transition ${isActive ? "text-secondary" : "text-white"}`
          }
        >
          CONTACT
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
