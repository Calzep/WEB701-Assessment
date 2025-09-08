import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <h1> Nelson Disaster Response React Prototype</h1>
            <nav>
                <Link to="/">Home</Link> |{" "}
                <Link to="/login">Login</Link> |{" "}
                <Link to="/Register">Register</Link> |{" "}
                <Link to="/Services">Services</Link> |{" "}
            </nav>
        </header>
    );
}