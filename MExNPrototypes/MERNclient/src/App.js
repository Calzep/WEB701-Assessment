import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AppRouter from "./AppRouter";
import Header from "./components/Header";
import { jwtDecode } from "jwt-decode";
import './App.css';

function App() {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token")
    return token ? jwtDecode(token) : null
  });
  
  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setUser(jwtDecode(token));
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <Router>
      <Header user={user} onLogout={handleLogout} />
      <AppRouter user={user} onLogin={handleLogin} setUser={setUser} />
    </Router>
  );
}

export default App;
