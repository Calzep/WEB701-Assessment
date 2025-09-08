import React, { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";

export default function Services() {
    const [services, setServices] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("http://localhost:7011/api/services")
            .then(res => res.json())
            .then(data => setServices(data))
            .catch(err => console.error(`Failed to fetch services: ${err}`));

        setUser(JSON.parse(localStorage.getItem("user") ?? null))

    }, []);

    return (
        <div className="ServicesContainer">
            <h2>Services</h2>
            {services.length === 0 ? (
                <p>There are no services available at this time</p>
            ) : (
                services.map(service => (
                    <ServiceCard 
                        key={service._id}
                        service={service}
                        user={user}
                    />
                ))
            )}
        </div>
    );
}