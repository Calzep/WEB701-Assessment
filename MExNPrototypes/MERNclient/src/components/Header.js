import React from "react";
import { Link } from "react-router-dom";

export default function Header({ user, onLogout }) {
    return (
        <header>
            <h1> Nelson Disaster Response React Prototype</h1>
            <nav>
                <div className="LeftNav">
                    <Link to="/">Home</Link> |{" "}
                    <Link to="/login">Login</Link> |{" "}
                    <Link to="/Register">Register</Link> |{" "}
                    <Link to="/Services">Services</Link> |{" "}
                </div>
                <div className="RightNav">
                    {!user && (
                        <p>Not logged in</p>
                    )}
                    {user != null && (
                        <>
                            <p>Logged in as {user.firstName} {user.lastName}</p>
                            <Link to="/Account" >My Account</Link> |{" "}
                            <Link to="/" onClick={onLogout}>Logout</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}