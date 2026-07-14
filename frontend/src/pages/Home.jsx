import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <h1>Smart Expense Tracker</h1>

      <p>
        Track your daily expenses, manage your budget, and gain insights into
        your spending habits.
      </p>

      <div className="home-buttons">
        <Link to="/login">
          <button>Login</button>
        </Link>

        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;