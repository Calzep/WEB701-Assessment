import React from "react";

export default function ServiceCard({ service }) {
    return (
        <div className="serviceCard">
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <p>Cost: {service.tokenCost} tokens</p>
        </div>
    );
}