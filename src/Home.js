import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';
import './Home.css';
import videoIntro from './assets/intro.mp4';
import logo from './assets/logo.png';
import marketingImg from './assets/marketing.jpg';
import webImg from './assets/web.jpg';
import mobileImg from './assets/mobile.jpg';
import designImg from './assets/design.jpg';
import hamburgerIcon from './assets/hamburger-icon.png';
import contactImg from './assets/contact.jpg';

const Home = () => {
  const [showContent, setShowContent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
//LL
  const services = [
    { title: 'Marketing Digital', image: marketingImg },
    { title: 'Création de Sites Web', image: webImg },
    { title: 'Applications Mobiles', image: mobileImg },
    { title: 'Design Graphique', image: designImg }
  ];

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

      {/* Services */}
      <section id="services" className="services-section">
        <h2>Nos Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              className="service-card"
              key={index}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.6 }}
            >
              <img src={service.image} alt={service.title} />
              <h3>{service.title}</h3>
              <button>En savoir plus</button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact-section">
        <h2>Contact</h2>
        <p>Vous avez un projet ou besoin de support ? Nous serions ravis d’échanger avec vous !</p>

        <div className="contact-container">
          <img src={contactImg} alt="Contact" className="contact-img" />
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Votre nom" required />
            <input type="email" placeholder="Votre email" required />
            <textarea rows="5" placeholder="Votre message" required></textarea>
            <button type="submit">Envoyer le message</button>
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
