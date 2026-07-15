import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">

      <div className="navbar-logo">
        💰 Smart Expense Tracker
      </div>

      <ul className="navbar-menu">

        <li>
          <Link
            to="/dashboard"
            className={location.pathname === "/dashboard" ? "active" : ""}
          >
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/expenses"
            className={location.pathname === "/expenses" ? "active" : ""}
          >
            Expenses
          </Link>
        </li>

        <li>
          <Link
            to="/reports"
            className={location.pathname === "/reports" ? "active" : ""}
          >
            Reports
          </Link>
        </li>

        <li>
          <Link
            to="/analytics"
            className={location.pathname === "/analytics" ? "active" : ""}
          >
            Analytics
          </Link>
        </li>

        <li>
          <Link
            to="/profile"
            className={location.pathname === "/profile" ? "active" : ""}
          >
            Profile
          </Link>
        </li>

        <li>
          <Link to="/login">
            Logout
          </Link>
        </li>

      </ul>

    </nav>
  );
}

export default Navbar;