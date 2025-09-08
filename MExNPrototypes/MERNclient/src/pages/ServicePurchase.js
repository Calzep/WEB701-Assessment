import React, { useEffect, useState } from "react";

export default function ServicePurchases({ user }) {
    const token = localStorage.getItem("token")
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPurchases = async () => {
        try {
            const res = await fetch("http://localhost:7011/api/service-purchases", {
                headers: {
                "Authorization": `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (res.ok) {
                setPurchases(data);
            } else {
                console.error(data.error);
            }
        } catch (err) {
            console.error("Failed to fetch service purchases:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPurchases();
    }, []);

    const approvePurchase = async (purchaseId) => {
        try {
            const res = await fetch(`http://localhost:7011/api/service-purchase/${purchaseId}`, {
                method: "PUT",
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ status: "approved" })
            });
            const data = await res.json();
            if (res.ok) {
                fetchPurchases();
            } else {
                console.error(data.error);
            }
        } catch (err) {
            console.error("Failed to approve purchase:", err);
        }
    };

    if (!user || user.role !== "member") {
        return (
            <p>Access denied: this page is for members only.</p>
        );
    }
    if (loading) return <p>Loading purchases...</p>;

    return (
        <div className="ServicePurchasesContainer">
        <h2>Service Purchases</h2>
        {purchases.length === 0 ? (
            <p>There are no purchases at this time</p>
        ) : (
            <table className="ServicePurchaseTable">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Service</th>
                        <th>Token Cost</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {purchases.map((p) => (
                    <tr key={p._id}>
                        <td>{p.user.firstName} {p.user.lastName}</td>
                        <td>{p.service.name}</td>
                        <td>{p.temporalTokenCost}</td>
                        <td>{p.status}</td>
                        <td>
                        {p.status === "pending" && (
                            <button onClick={() => approvePurchase(p._id)}>Approve</button>
                        )}
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        )}
        </div>
    );
}
