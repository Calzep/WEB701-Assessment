import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import Account from "./pages/Account";

export default function AppRouter({ user, onLogin, setUser }) {
  return (
    <Routes>
      <Route path="/" element={<Home user={user} />} />
      <Route path="/login" element={<Login onLogin={onLogin} />} />
      <Route path="/register" element={<Register user={user} />} />
      <Route path="/services" element={<Services user={user} />} />
      <Route path="/account" element={<Account user={user} setUser={setUser} />} />
    </Routes>
  );
}
