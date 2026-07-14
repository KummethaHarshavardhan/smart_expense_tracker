import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>Smart Expense Tracker</h2>
      </div>

      <ul className="navbar-menu">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/profile">Profile</Link>
        </li>

        <li>
          <Link to="/login">Logout</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;