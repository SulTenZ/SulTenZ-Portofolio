// src/sections/Navbar.jsx
import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  return (
    <nav
      className={
        `fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-4 md:px-8 md:py-6 transition-colors duration-500
        ${scrolled ? "bg-background/90 shadow-lg backdrop-blur-md" : "bg-transparent"}`
      }
    >
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img
          src={logo}
          alt="SulTenZ Logo"
          className="h-10 w-auto md:h-12 object-contain"
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-4 md:gap-10">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-dmsans text-base md:text-lg hover:text-main transition ${isActive ? "text-secondary" : "text-white"}`
          }
          end
        >
          HOME
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `font-dmsans text-base md:text-lg hover:text-main transition ${isActive ? "text-secondary" : "text-white"}`
          }
        >
          PROJECT
        </NavLink>
        <NavLink
          to="/contacts"
          className={({ isActive }) =>
            `font-dmsans text-base md:text-lg hover:text-main transition ${isActive ? "text-secondary" : "text-white"}`
          }
        >
          CONTACT
        </NavLink>
      </div>

      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-6 h-6 space-y-1 z-60"
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            mobileMenuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            mobileMenuOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 w-1/2 h-screen bg-background transition-transform duration-300 z-50 ${
          mobileMenuOpen ? "transform translate-x-0" : "transform translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-start h-full space-y-8 pt-20">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-dmsans text-2xl hover:text-main transition ${isActive ? "text-secondary" : "text-white"}`
            }
            end
            onClick={() => setMobileMenuOpen(false)}
          >
            HOME
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `font-dmsans text-2xl hover:text-main transition ${isActive ? "text-secondary" : "text-white"}`
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            PROJECT
          </NavLink>
          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              `font-dmsans text-2xl hover:text-main transition ${isActive ? "text-secondary" : "text-white"}`
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            CONTACT
          </NavLink>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
}

export default Navbar;
