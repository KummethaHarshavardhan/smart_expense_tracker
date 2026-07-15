import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaPlusCircle,
  FaMoneyBillWave,
  FaWallet,
  FaChartPie,
  FaChartLine,
  FaUserCircle,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h3>Navigation</h3>

      <ul className="sidebar-menu">

        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/add-expense"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaPlusCircle />
            <span>Add Expense</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/add-income"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaMoneyBillWave />
            <span>Add Income</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/expenses"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaWallet />
            <span>Expenses</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/income"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaMoneyBillWave />
            <span>Income</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/reports"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaChartPie />
            <span>Reports</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/analytics"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaChartLine />
            <span>Analytics</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaUserCircle />
            <span>Profile</span>
          </NavLink>
        </li>

      </ul>
    </aside>
  );
}

export default Sidebar;