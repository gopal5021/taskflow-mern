import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <Router>
      <Routes>

        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/register" />} />

        {/* AUTH */}
        <Route path="/register" element={<Register />} />
        
        <Route 
          path="/login" 
          element={<Login setToken={setToken} />} 
        />

        {/* PROTECTED */}
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />

      </Routes>
    </Router>
  );
}

export default App;