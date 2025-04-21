import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Realisation.css";

const Realisation = () => {
  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [realisations, setRealisations] = useState([]);

  // Charger tous les services au démarrage
  useEffect(() => {
    axios.get("https://ozendev-backend.onrender.com/api/services")
      .then(res => setServices(res.data))
      .catch(err => console.error("Erreur services :", err));
  }, []);

  // Charger les réalisations du service sélectionné
  useEffect(() => {
    if (selectedServiceId !== null) {
      axios.get(`https://ozendev-backend.onrender.com/api/services/${selectedServiceId}/realisations`)
        .then(res => setRealisations(res.data))
        .catch(err => console.error("Erreur réalisations :", err));
    }
  }, [selectedServiceId]);

  return (
    <div className="realisation-page">
      <div className="realisation-content">
        <h1>Nos Réalisations</h1>

        <div className="filter-btns">
          {services.map((service) => (
            <button
              key={service.id}
              className={selectedServiceId === service.id ? "active" : ""}
              onClick={() => setSelectedServiceId(service.id)}
            >
              {service.name}
            </button>
          ))}
        </div>

        <div className="realisation-list">
          {realisations.length === 0 ? (
            <p>Veuillez sélectionner un service pour voir ses réalisations.</p>
          ) : (
            realisations.map((r, index) => (
              <div className="realisation-card" key={index}>
                <img src={r.image} alt={r.titre} />
                <h3>{r.titre}</h3>
                <p>{r.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Realisation;
