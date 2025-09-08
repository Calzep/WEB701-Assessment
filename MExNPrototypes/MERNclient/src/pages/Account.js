import React, { useEffect, useState } from "react";

export default function Account({ user, setUser }) {
    const [balance, setBalance] = useState(0);

    // Fetch latest user info from backend
    const fetchUser = async () => {
        if (!user) return;
        try {
            const res = await fetch(`http://localhost:7011/api/user/${user.id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            const data = await res.json();
            if (res.ok) {
                setBalance(data.tokens);
                setUser(data);
            } else {
                console.error(data.error);
            }
        } catch (err) {
            console.error("Failed to fetch user:", err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const addTokens = async () => {
        try {
            const res = await fetch(`http://localhost:7011/api/user/add-tokens`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ amount: 10 })
            });
            const data = await res.json();
            if (res.ok) {
                setBalance(data.tokens);
                setUser(data);
                fetchUser();
            } else {
                console.error(data.error);
            }
        } catch (err) {
            console.error("Failed to add tokens:", err);
        }
    };

    if (!user) return <p>Please log in to view your account.</p>;

    return (
        <div className="AccountContainer">
            <h2>Account</h2>
            <p>Email: {user.email}</p>
            <p>First name: {user.firstName}</p>
            <p>Last name: {user.lastName}</p>
            <p>Token balance: {balance}</p>
            <button onClick={addTokens}>Add 10 Tokens</button>
        </div>
    );
}
