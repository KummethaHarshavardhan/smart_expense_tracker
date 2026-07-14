import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h3>Menu</h3>

      <ul className="sidebar-menu">
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>

        <li>
          <NavLink to="/expenses">Expenses</NavLink>
        </li>

        <li>
          <NavLink to="/add-expense">Add Expense</NavLink>
        </li>

        <li>
          <NavLink to="/reports">Reports</NavLink>
        </li>

        <li>
          <NavLink to="/analytics">Analytics</NavLink>
        </li>

        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;