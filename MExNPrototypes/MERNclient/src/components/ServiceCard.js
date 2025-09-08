import React from "react";

export default function ServiceCard({ service, user }) {
    console.log(user);
    const handlePurchase = async () => {
        if (!user || user.role != "beneficiary") {
            alert("You must be logged in as a beneficiary purchase a service");
            return;
        }

        try {
            const res = await fetch("http://localhost:7011/api/service-purchase", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    serviceId: service._id,
                    userId: user.id
                })
            })
            const data = await res.json();
            if (res.ok) {
                alert("Service purchased")
            } else {
                alert(`Purchase failed: ${data.error}`);
            }
        } catch (err) {
            alert("Purchase failed: Something went wrong");
            console.error(err);
        }
    }
    return (
        <div className="ServiceCard">
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <p>Cost: {service.tokenCost} tokens</p>
            {user && user.role === "beneficiary" && (
                <button onClick={handlePurchase}>Purchase</button>
            )}
            {user && user.role === "member" && (
                <p>Login as a beneficiary to purchase</p>
            )}
            {!user && (
                <p>Login to purchase</p>
            )}
        </div>
    );
}