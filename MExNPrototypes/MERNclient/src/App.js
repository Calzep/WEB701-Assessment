import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AppRouter from "./AppRouter";
import Header from "./components/Header";
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <AppRouter />
    </Router>
  );
}

export default App;
