import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Realisation.css'; // tu peux le styliser ici

const RealisationPage = () => {
  const [services, setServices] = useState([]);
  const [realisations, setRealisations] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/realisation/services')
      .then(res => setServices(res.data))
      .catch(err => console.error(err));
  }, []);

  const fetchRealisations = (id) => {
    setSelectedService(id);
    axios.get(`http://localhost:3001/api/realisation/realisations/${id}`)
      .then(res => setRealisations(res.data))
      .catch(err => console.error(err));
  };

  return (
    <div>
      {/* Menu identique à Home ici */}
      <header className="menu-bar"> {/* adapte à ton style Home */}
        <h1>Nos Réalisations</h1>
      </header>

      {/* Boutons de services */}
      <div className="service-buttons">
        {services.map(service => (
          <button
            key={service.id}
            className={selectedService === service.id ? 'active' : ''}
            onClick={() => fetchRealisations(service.id)}
          >
            {service.name}
          </button>
        ))}
      </div>

      {/* Affichage des réalisations */}
      <div className="realisations-grid">
        {realisations.map((item, index) => (
          <div key={index} className="realisation-card">
            <img src={`/${item.image}`} alt={item.titre} />
            <h3>{item.titre}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealisationPage;
