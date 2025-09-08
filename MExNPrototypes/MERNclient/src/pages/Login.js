import React, { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:7011/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok) {
                setMessage("Login successful!");
                localStorage.setItem("token, data.token");
            } else {
                setMessage(`Login failed: ${data.error}`)
            }
        } catch (err) {
            setMessage(`Login failed: Something went wrong, please try again.`)
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <input type="password" placeholder="your password" value={password} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <button type="submit">Login</button>
            </form>
            <p>{message}</p>
        </div>
    )
}