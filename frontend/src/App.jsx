import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [page, setPage] = useState("login");

  useEffect(() => {
    const savedPage = localStorage.getItem("page");
    if (savedPage) {
      setPage(savedPage);
    }
  }, []);

  return (
    <div>
      {page === "login" && <Login />}
      {page === "register" && <Register />}
      {page === "dashboard" && <Dashboard />}

      <div className="text-center mt-4">
        {page === "login" && (
          <button
            className="text-blue-500"
            onClick={() => setPage("register")}
          >
            Go to Register
          </button>
        )}

        {page === "register" && (
          <button
            className="text-blue-500"
            onClick={() => setPage("login")}
          >
            Go to Login
          </button>
        )}
      </div>
    </div>
  );
}

export default App;