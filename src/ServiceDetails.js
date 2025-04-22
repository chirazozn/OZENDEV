import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';
import './ServiceDetails.css';
import { useParams ,useNavigate} from 'react-router-dom';
import logo from './assets/logo.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ServiceDetails = () => {
  const { id } = useParams(); // Get the service ID from URL parameters
  const [service, setService] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };
  
    useEffect(() => {
        fetch(`https://ozendev-backend.onrender.com/api/services/${id}`)
          .then(res => {
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
          })
          .then(data => {
            console.log('Service details:', data); // 🔍 Affiche ce que l'API retourne
            setService(data);
          })
          .catch(err => console.error('Error loading service details:', err));
      }, [id]);
      
 
      const handleVoirToutClick = () => {
        navigate(`/realisation/services/${service.id}`); // Navigate to the RealisationPage with the service ID
      };
    

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div className="service-details-container">
       {/* Menu */}
       <nav className="navbar">
        <img src={logo} alt="Logo" className="logo" />
         
         
           {/* Menu
        <div className="hamburger" onClick={toggleMenu}>
          {!menuOpen ? (
            <img src={hamburgerIcon} alt="Menu" className="hamburger-img" />
          ) : (
            <div className="close-btn">✕</div>
          )}
        </div> 
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
  <li><a href="/?skipIntro=true#home">Retour</a></li>
  <li><a href="/?skipIntro=true#contact">Contact</a></li>
  <li><a href="/?skipIntro=true#location">Localisation</a></li>
</ul>*/}

<li className="nav-link"><a href="/?skipIntro=true#home">Retour</a></li>
 

      </nav>

      {/* Hero Section */}
      <section
  className="hero-section"
  style={{
    backgroundImage: `url(https://ozendev-backend.onrender.com/${service.image_url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '80vh',
    position: 'relative',
  }}
>
  <div className="hero-overlay">
    <h1>{service.name}</h1>
  </div>
</section>


      {/* Description Section */}
      <section className="description-section">
        <h2>Description</h2>
        <p>{service.description}</p>
      </section>





      <section className="realisation-section">
  <h2>Nos Réalisations</h2>
  <Swiper
    modules={[Navigation, Pagination]}
    spaceBetween={20}
    slidesPerView={1}
    navigation
    pagination={{ clickable: true }}
    breakpoints={{
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    }}
  >
    {service.realisation.map((item, index) => (
      <SwiperSlide key={index}>
          <div className="realisation-item-wrapper">

        <div className="realisation-item">
          <img src={`https://ozendev-backend.onrender.com/${item.image}`} alt={item.titre} />
          <h3>{item.titre}</h3>
          <p>{item.description}</p>
        </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
  <a
  href="#"
  className="voir-tout-btn"
  onClick={(e) => {
    e.preventDefault(); // empêche le scroll en haut
    handleVoirToutClick(); // déclenche la navigation
  }}
>
  Voir tout
</a>

</section>

       {/* Realisation Section 
       <section className="realisation-section">
        <h2>Nos Réalisations</h2>
        <div className="realisation-images">
        {service.realisation.map((item, index) => (
  <div key={index} className="realisation-item">
    <motion.img
      src={`http://localhost:3001/${item.image}`}
      alt={item.titre}
      whileInView={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    />
    <h3>{item.titre}</h3>
    <p>{item.description}</p>
  </div>
))}

        </div>
      </section> */}

      {/* Footer */}
      <footer className="footer">
        <p>Suivez-nous sur</p>
        <div className="social-icons">
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaLinkedin /></a>
        </div>
        <div className="contact-info">
          <p><strong>Adresse :</strong> Alger-Said Hamdine</p>
          <p><strong>Téléphone :</strong> +213 456 789</p>
          <p><strong>Email :</strong> contact@inovadev.com</p>
        </div>
        <p>Boîte de développement : Inova Dev © 2025</p>
      </footer>
    </div>
  );
};

export default ServiceDetails;
