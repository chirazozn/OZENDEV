import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Realisation.css';
import logo from './assets/logo.png';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion'; // Make sure to import motion from framer-motion
import { FaFacebook, FaInstagram, FaLinkedin, FaPhone, FaEnvelope ,FaMapMarkerAlt } from 'react-icons/fa';

const RealisationPage = () => {
  const [services, setServices] = useState([]);
  const [realisations, setRealisations] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const { idd } = useParams(); // Get the service ID from the URL

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

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
    <div className="tt">
      {/* Menu */}
      <motion.nav 
        className="navbar"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
<a href="/?skipIntro=true#home">
  <img src={logo} alt="Logo" className="logo" />
</a>        <li className="nav-link"><a href="/?skipIntro=true#home">Retour</a></li>
      </motion.nav>

      <motion.div 
        className="titre"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        <h1>Nos Réalisations</h1>
      </motion.div>
   
      {/* Boutons de services */}
      <motion.div 
        className="service-buttons"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {services.map((service, index) => (
          <motion.button
            key={service.id}
            className={selectedService === service.id ? 'active' : ''}
            onClick={() => fetchRealisations(service.id)}
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            custom={index}
          >
            {service.name}
          </motion.button>
        ))}
      </motion.div>

      {/* Affichage des réalisations */}
      <motion.div 
        className="realisations-grid"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {realisations.map((item, index) => (
          <motion.div 
            key={index} 
            className="realisation-card"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { 
                opacity: 1, 
                y: 0, 
                transition: { 
                  duration: 0.6, 
                  delay: index * 0.1 
                } 
              }
            }}
            whileHover={{ 
              y: -10, 
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.3 }
            }}
          >
            <img src={`/${item.image}`} alt={item.titre} />
            <h3>{item.titre}</h3>
            <p>{item.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <footer className="footer">
              <p>Suivez-nous sur</p>
              <div className="social-icons">
                <a href="#"><FaFacebook /></a>
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaLinkedin /></a>
              </div>
      
              <div className="contact-info">
                <p><strong>Adresse :</strong> alger-said hamdine </p>
                <p><strong>Téléphone 1 :</strong> +213 456 789</p>
                <p><strong>Téléphone 2 :</strong> +213 987 654</p>
          <p><strong>Email :</strong> Contact@innovazen.dev</p>
              </div>
      
              <p>Boîte de développement : innovazen © 2025</p>
            
            </footer>
    </div>
  );
};

export default RealisationPage;