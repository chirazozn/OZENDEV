import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Realisation.css'; // tu peux le styliser ici
import logo from './assets/logo.png';
import { useParams } from 'react-router-dom';

const RealisationPage = () => {
  const [services, setServices] = useState([]);
  const [realisations, setRealisations] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const { idd } = useParams(); // Get the service ID from the URL

  useEffect(() => {
    axios.get('https://ozendev-backend.onrender.com/api/realisation/services')
      .then(res => setServices(res.data))
      .catch(err => console.error(err));
  }, []);
  const fetchRealisations = (id) => {
    setSelectedService(id); // update active button style
    fetch(`https://ozendev-backend.onrender.com/api/realisation/services/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.realisation)) {
          setRealisations(data.realisation);
        } else if (Array.isArray(data)) {
          setRealisations(data); // fallback in case backend returns array directly
        } else {
          console.error('Unexpected data format:', data);
          setRealisations([]);
        }
      })
      .catch((err) => console.error('Error fetching realisations:', err));
  };
  
  useEffect(() => {
    if (idd) {
      fetchRealisations(idd);
      setSelectedService(Number(idd)); // pour que le bon bouton soit activé aussi
    }
  }, [idd]);
  
  return (
    
    <div>

        {/* Menu */}
        <nav className="navbar">
        <img src={logo} alt="Logo" className="logo" />
<li className="nav-link"><a href="/?skipIntro=true#home">Retour</a></li>
      </nav>

<div   className='titre'>         <h1>Nos Réalisations</h1>
</div>
   

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
