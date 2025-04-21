import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaLinkedin, FaPhone, FaEnvelope ,FaMapMarkerAlt } from 'react-icons/fa';
import './Home.css';
import videoIntro from './assets/intro.mp4';
import logo from './assets/logo.png';
import { Link } from 'react-router-dom'; // Importer Link pour le routage
import { useLocation } from 'react-router-dom';
import hamburgerIcon from './assets/hamburger-icon.png';
import contactImg from './assets/contact.jpg';


const Home = () => {
  const [showContent, setShowContent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [services, setServices] = useState([]);
  const location = useLocation();
  const [messageType, setMessageType] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [realisations, setRealisations] = useState([]);


  useEffect(() => {
    console.log('Appel API réalisations...');
    fetch('https://ozendev-backend.onrender.com/api/realisations')
      .then(res => {
        console.log('Statut réponse:', res.status);
        return res.json();
      })
      .then(data => {
        console.log('Données reçues:', data);
        setRealisations(data);
      })
      .catch(err => {
        console.error('Erreur lors du chargement des réalisations:', err);
        // Vous pourriez ajouter un état pour afficher un message d'erreur
        // setRealisationError("Impossible de charger les réalisations. Veuillez réessayer plus tard.");
      });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!isValidEmail(email)) {
      setError("Adresse email invalide.");
      setSuccess('');
      return;
    }
    
  
    try {
      const response = await fetch('https://ozendev-backend.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nom, email, message }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setSuccess("Message envoyé avec succès !");
        setMessageType("success");
                setNom('');
        setEmail('');
        setMessage('');
      } else {
        setSuccess("Erreur lors de l'envoi du message.");
        setMessageType("error");
              }
    } catch (error) {
      console.error("Erreur:", error);
      setSuccess("Erreur serveur.");
      setMessageType("error");
          }
  };
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);
  
  const isValidEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);  };
  
  
useEffect(() => {
  const searchParams = new URLSearchParams(location.search);
  const skipIntro = searchParams.get('skipIntro');

  if (skipIntro === 'true') {
    setShowContent(true);
  } else {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 4000);
    return () => clearTimeout(timer);
  }
}, [location.search]);



useEffect(() => {
  if (location.hash) {
    const section = document.querySelector(location.hash);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}, [location]);

  useEffect(() => {
    fetch('https://ozendev-backend.onrender.com/api/services')
      .then(res => res.json())
      .then(data => {
        console.log('Services reçus :', data); // <-- ajoute ceci
        setServices(data);
      })
      .catch(err => console.error('Erreur lors du chargement des services:', err));
  }, []);
  
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (!showContent) {
    return (
      <div className="video-container">
        <video 
  src={videoIntro} 
  autoPlay 
  muted 
  playsInline 
  preload="auto" 
  onEnded={() => setShowContent(true)} 
/>
      </div>
    );
  }

  
  

  return (
    <div className="main-container">
      {/* Menu */}
      <nav className="navbar">
        <img src={logo} alt="Logo" className="logo" />
        <div className="hamburger" onClick={toggleMenu}>
          {!menuOpen ? (
            <img src={hamburgerIcon} alt="Menu" className="hamburger-img" />
          ) : (
            <div className="close-btn">✕</div>
          )}
        </div>

        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><a href="#home">Accueil</a></li>
          <li><a href="#about">À propos</a></li>
          <li><a href="#realisations">Réalisations</a></li>
          <li><a href="#services">Nos Services</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#location">Localisation</a></li>

        </ul>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-overlay">
          <h1>Bienvenue chez Inova Dev</h1>
          <p>Nous concevons des solutions digitales intelligentes, évolutives et sécurisées</p>
          <p>Créons ensemble quelque chose de formidable.</p>
        </div>
      </section>

      {/* À propos */}
      <section id="about" className="about-section">
        <h2>À propos</h2>
        <p>
          Chez <strong>Inova Dev</strong>, nous sommes des créateurs, développeurs et stratèges digitaux passionnés,
          dédiés à aider les entreprises à réussir dans l’ère numérique. Basée en Algérie, notre équipe propose
          des solutions web et mobiles intelligentes et adaptées à vos objectifs.
        </p>
        <p>
          Que ce soit pour lancer un site personnalisé, créer une application mobile, ou renforcer votre marque
          via le marketing digital et le design graphique, Inova Dev est votre partenaire technologique de confiance.
          Nous mettons l'accent sur l'innovation, la qualité et la collaboration à long terme.
        </p>
        <p>
          Construisons ensemble votre avenir digital.
        </p>
      </section>




      <section id="realisations" className="realisations-section">
  <h2>Nos Réalisations</h2>
  
  {/* Afficher un message si aucune réalisation */}
  {(!realisations || realisations.length === 0) && (
    <p>Aucune réalisation disponible pour le moment.</p>
  )}
  
  <div className="realisations-grid">
    {realisations && realisations.length > 0 && realisations.map((service, serviceIndex) => (
      service.realisation && Array.isArray(service.realisation) && service.realisation.map((item, itemIndex) => (
        <motion.div
          className="realisation-card"
          key={`${serviceIndex}-${itemIndex}`}
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={`https://ozendev-backend.onrender.com/${item.image}`}
            alt={item.titre || "Réalisation"}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/placeholder-image.jpg"; // Remplacez par une image par défaut
            }}
          />
          <h3>{item.titre || "Sans titre"}</h3>
          <p>{item.description || "Pas de description disponible"}</p>
        </motion.div>
      ))
    ))}
  </div>
</section>


      {/* Services */}
      <section id="services" className="services-section">
        <h2>Nos Services</h2>
        <div className="services-grid">
        {Array.isArray(services) && services.map((service, index) => (
            <motion.div
              className="service-card"
              key={index}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.6 }}
            >
<img src={`https://ozendev-backend.onrender.com/${service.image_url}`} alt={service.title} />
<h3>{service.name}</h3>

<a href={`/services/${service.id}`}>
  <button>En savoir plus</button>
</a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact-section">
        <h2>Contact</h2>
        <p>Vous avez un projet ou besoin de support ? Nous serions ravis d’échanger avec vous !</p>
      
      
      
      
        <div className="contact-icons">
  <a href="tel:0770716047" title="Appeler">
    <FaPhone className="icon-contact" />
  </a>
  <a href="mailto:inovadev.contact1@gmail.com" title="Envoyer un e-mail">
    <FaEnvelope className="icon-contact" />
  </a>
</div>


        <div className="contact-container">
          <img src={contactImg} alt="Contact" className="contact-img" />
<form className="contact-form" onSubmit={handleSubmit}>
  <input
    type="text"
    placeholder="Votre nom"
    value={nom}
    onChange={(e) => setNom(e.target.value)}
    required
  />
  <input
    type="email"
    placeholder="Votre email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />
  <textarea
    rows="5"
    placeholder="Votre message"
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    required
  ></textarea>
  <button type="submit">Envoyer le message</button>
  {success && (
  <p className={`feedback-message ${messageType === 'success' ? 'success' : 'error'}`}>
    {success}
  </p>
)}
</form>


        </div>
      </section>

      {/* Localisation */}
      <section className="location-section" id="location">
        <h2>Retrouvez-nous sur la carte</h2>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.856062959847!2d3.0361534745119085!3d36.72601797187994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fad94be504659%3A0x83fcc76c94502114!2sResidence%20LALA%20MALIKA!5e0!3m2!1sfr!2sdz!4v1744656840711!5m2!1sfr!2sdz"
            allowFullScreen=""
            loading="lazy"
            title="Localisation Inova Dev"
          ></iframe>
        </div>
        <button className="follow-btn">
          <a
            href="https://www.google.com/maps/place/Residence+LALA+MALIKA/@36.7260179,3.0361535,17z"
            target="_blank"
            rel="noopener noreferrer"
            className="follow-btn"
          >
            <FaMapMarkerAlt style={{ marginRight: '8px' }} />
            Suivre notre emplacement
          </a>
        </button>
      </section>

      {/* Pied de page */}
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
          <p><strong>Email :</strong> contact@inovadev.com</p>
        </div>

        <p>Boîte de développement : Inova Dev © 2025</p>
      
      </footer>
    </div>
  );
};

export default Home;
