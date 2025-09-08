import React, { useState } from "react";

export default function Register() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        userType: ""
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:7011/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...form })
            });
            const data = await res.json();
            if (res.ok) {
                setMessage("Account created!")
            } else {
                setMessage(`Registration failed: ${data.error}`)
            }
        } catch  (err) {
            setMessage(`Registration failed: Something went wrong.`)
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}> 
                <input name="firstName" placeholder="First Name" onChange={handleChange} /><br />
                <input name="lastName" placeholder="Last Name" onChange={handleChange} /><br />
                <input name="email" type="email" placeholder="Email" onChange={handleChange} /><br />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br />
                <select name="userType" onChange={handleChange}>
                <option value="beneficiary">Beneficiary</option>
                <option value="member">Member</option>
                </select><br />
                <button type="submit">Register</button>
            </form>
            <p>{message}</p>
        </div>
    )
}