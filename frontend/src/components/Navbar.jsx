import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaWallet } from "react-icons/fa";
import "../styles/navbar.css";

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/income", label: "Income" },
    { to: "/expenses", label: "Expenses" },
    { to: "/reports", label: "Reports" },
    { to: "/analytics", label: "Analytics" },
    { to: "/profile", label: "Profile" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <FaWallet className="navbar-logo-icon" />
        Smart Expense Tracker
      </div>


      <button
        className="navbar-toggle"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <ul className={`navbar-menu ${menuOpen ? "open" : ""}`}>
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              onClick={closeMenu}
              className={location.pathname === link.to ? "active" : ""}
            >
              {link.label}
            </Link>
          </li>
        ))}

      </ul>
      <Link to="/login" onClick={closeMenu} className="navbar-logout" >
            <button>LOGOUT</button>
      </Link>
    </nav>
  );
}

export default Navbar;
