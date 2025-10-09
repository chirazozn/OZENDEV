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
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import welcomeBg from "./assets/welcome-bg.jpg";
import ChatBox from "./ChatBox"; // ou "../components/ChatBox" selon ton dossier
import { FaComments } from 'react-icons/fa';


const Home = () => {
  const [showContent, setShowContent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [messageType, setMessageType] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [realisations, setRealisations] = useState([]);
  const [showChat, setShowChat] = useState(false);

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
    }, 2000);
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
         <HelmetProvider>
      <Helmet>
        <title>Innovazen - Solutions digitales en Algérie</title>
        <meta 
          name="description" 
          content="Innovazen conçoit des solutions digitales web et mobiles en Algérie. Sites web, applications mobiles, marketing digital..." 
        />
        <meta 
          name="keywords" 
          content="innovazen, développement web, algérie, site web, application mobile, digital, marketing" 
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      {/* ... le reste de ton app */}
    </HelmetProvider>
<header>
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
          <li><a href="#about">À propos</a></li>
          <li><a href="#realisations">Réalisations</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#location">Localisation</a></li>

        </ul>
       {/* Contact Icons */}
  <div className="contact-menuicons">
    <a href="tel:0555555555" title="Appeler">
      <FaPhone className="icon-menucontact" />
    </a>
    <a href="mailto:innovazen.contact1@gmail.com" title="Envoyer un e-mail">
      <FaEnvelope className="icon-menu-contact" />
    </a>
  </div>
</nav>

</header>

  {/* Hero Section */}
  <section 
  id="home" 
  className="hero-section"
  style={{
    backgroundImage: window.innerWidth <= 810 ? `url(${welcomeBg})` : "none",
    backgroundSize: "cover",backgroundColor:"white",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <div className="hero-content">
    <div className="hero-text">
      <h1>Bienvenue chez Innovazen</h1>
      <p>Nous concevons des solutions digitales intelligentes, évolutives et sécurisées</p>
      <p>Créons ensemble quelque chose de formidable.</p>
    </div>
    {window.innerWidth > 810 && (
      <div className="hero-image">
        <img src={welcomeBg} alt="Bienvenue" />
      </div>
    )}
  </div>
</section>



      {/* À propos */}
 {/* À propos */}
<section id="about" className="about-section">


  <motion.h2
          

  >
    À propos
  </motion.h2>
  
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.3
        }
      }
    }}
  >
    <motion.p
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }

      }}
    >
      Chez <strong>Innovazen</strong>, nous sommes des créateurs, développeurs et stratèges digitaux passionnés,
      dédiés à aider les entreprises à réussir dans l'ère numérique. Basée en Algérie, notre équipe propose
      des solutions web et mobiles intelligentes et adaptées à vos objectifs.
    </motion.p>
    
    <motion.p
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      }}
    >
      Que ce soit pour lancer un site personnalisé, créer une application mobile, ou renforcer votre marque
      via le marketing digital et le design graphique, Innovazen est votre partenaire technologique de confiance.
      Nous mettons l'accent sur l'innovation, la qualité et la collaboration à long terme.
    </motion.p>
    
    <motion.p
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      }}
    >
      Construisons ensemble votre avenir digital.
    </motion.p>
  </motion.div>
</section>




      <section id="realisations" className="nos-realisations">
      <div className="header">
        <h2>Nos Réalisations</h2>
        <button className="voir-tout-btn" onClick={() => navigate("/Realisation")}>
          Voir tout
        </button>
      </div>

      {(!realisations || realisations.length === 0) ? (
        <p>Aucune réalisation disponible pour le moment.</p>
      ) : (
        <div className="carousel">
          {realisations.map((item, index) => (
            <div key={index} className="carousel-item">
              <img
                src={item.image_url}
                alt={item.title || "Image réalisation"}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder-image.jpg";
                }}
              />
              <h3>{item.title || "Sans titre"}</h3>
              <p>{item.description || "Pas de description"}</p>
            </div>
          ))}
        </div>
      )}
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
    {/* Contact */}
<section id="contact" className="contact-section">
  <motion.h2
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6 }}
  >
    Contact
  </motion.h2>
  
  <motion.p
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, delay: 0.2 }}
  >
    Vous avez un projet ou besoin de support ? Nous serions ravis d'échanger avec vous !
  </motion.p>
  
  <motion.div 
    className="contact-icons"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, delay: 0.3 }}
  >
    <motion.a 
      href="tel:0555555555" 
      title="Appeler"
      whileHover={{ scale: 1.2, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
    >
      <FaPhone className="icon-contact" />
    </motion.a>
    <motion.a 
      href="mailto:innovazen.contact1@gmail.com" 
      title="Envoyer un e-mail"
      whileHover={{ scale: 1.2, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
    >
      <FaEnvelope className="icon-contact" />
    </motion.a>
  </motion.div>

  <motion.div 
    className="contact-container"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.7, delay: 0.4 }}
  >
    <motion.img 
      src={contactImg} 
      alt="Contact" 
      className="contact-img"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.5 }}
    />
    
    <motion.form 
      className="contact-form" 
      onSubmit={handleSubmit}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <motion.input
  type="text"
  placeholder="Votre nom"
  value={nom}
  onChange={(e) => {
    const value = e.target.value;
    // ✅ autorise seulement lettres (a-z, A-Z), espaces et accents
    if (/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/.test(value)) {
      setNom(value);
    }
  }}
  required
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.4, delay: 0.6 }}
  whileFocus={{ scale: 1.02 }}
/>

      <motion.input
        type="email"
        placeholder="Votre email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.7 }}
        whileFocus={{ scale: 1.02 }}
      />
      <motion.textarea
        rows="5"
        placeholder="Votre message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.8 }}
        whileFocus={{ scale: 1.02 }}
      ></motion.textarea>
      <motion.button 
        type="submit"
        whileHover={{ scale: 1.05, backgroundColor: "#0056b3" }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.9 }}
      >
        Envoyer le message
      </motion.button>
      {success && (
        <motion.p 
          className={`feedback-message ${messageType === 'success' ? 'success' : 'error'}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {success}
        </motion.p>
      )}
    </motion.form>
  </motion.div>
</section>

      {/* Localisation */}
      <section className="location-section" id="location">
        <h2>Retrouvez-nous sur la carte</h2>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.856062959847!2d3.0361534745119085!3d36.72601797187994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fad94be504659%3A0x83fcc76c94502114!2sResidence%20LALA%20MALIKA!5e0!3m2!1sfr!2sdz!4v1744656840711!5m2!1sfr!2sdz"
            allowFullScreen=""
            loading="lazy"
            title="Localisation Innovazen"
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





      
{/* --- Bulle flottante du chat --- */}


<div className="chat-floating">
  {!showChat && (
    <div
      className="chat-bubble"
      onClick={() => setShowChat(true)}
      style={{
        backgroundColor: '#002244',
        width: 65,
        height: 65,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
        color: '#fff',
        fontSize: 28,
        animation: 'float 3s ease-in-out infinite',
      }}
    >
      <FaComments size={28} /> {/* ← icône ChatBox */}
    </div>
  )}

  {/* Chat ouvert */}
  {showChat && (
    <div className="chatbox-container">
   
      {/* Header avec le X */}
      <div className="chatbox-header">
        <span>Innovabot 💡</span>
        <button className="close-chat" onClick={() => setShowChat(false)}>✖</button>
      </div>


      {/* ChatBox */}
      <ChatBox />
    </div>
  )}
</div>


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
          <p><strong>Email :</strong> contact@Innovazen.com</p>
        </div>

        <p>Boîte de développement : innovazen © 2025</p>
      
      </footer>
    </div>
  );
};

export default Home;
