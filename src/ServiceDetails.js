import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';
import './ServiceDetails.css';
import { useParams, useNavigate } from 'react-router-dom';
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
        staggerChildren: 0.2
      }
    }
  };

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

  useEffect(() => {
    // Run only when the DOM is ready and service is loaded
    if (!service) return;
    
    const updateHeights = () => {
      const items = document.querySelectorAll('.realisation-item');
      let maxHeight = 0;
      
      // Reset any previous height
      items.forEach(item => {
        item.style.height = 'auto';
      });
      
      // Find the tallest
      items.forEach(item => {
        const height = item.offsetHeight;
        if (height > maxHeight) maxHeight = height;
      });
      
      // Apply max height to all
      items.forEach(item => {
        item.style.height = `${maxHeight}px`;
      });
    };
    
    updateHeights();
    
    // Re-run on window resize
    window.addEventListener('resize', updateHeights);
    return () => window.removeEventListener('resize', updateHeights);
  }, [service]);
      
  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div className="service-details-container">
      {/* Menu */}
      <motion.nav 
        className="navbar"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
<a href="/?skipIntro=true#home">
  <img src={logo} alt="Logo" className="logo" />
</a>
        <li className="nav-link"><a href="/?skipIntro=true#home">Retour</a></li>
      </motion.nav>

      <motion.section 
  className="hero-section"
  style={{
    backgroundImage: window.innerWidth <= 810 
      ? `url(https://ozendev-backend.onrender.com/${service.image_url})`
      : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
>
  <div className="hero-content">
    {/* Texte */}
    <motion.div className="hero-overlay">
      <h1>{service.name}</h1>
    </motion.div>

    {/* Image visible seulement en desktop */}
    {window.innerWidth > 810 && (
      <motion.div className="hero-image">
        <img src={`https://ozendev-backend.onrender.com/${service.image_url}`} alt={service.name} />
      </motion.div>
    )}
  </div>
</motion.section>



      {/* Description Section */}
      <motion.section 
        className="description-section"

      >
        <h2>Description</h2>
        <p>{service.description}</p>
      </motion.section>

      {/* Realisation Section */}
      <motion.section 
        className="realisation-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <motion.h2 variants={fadeInUp}>Nos Réalisations</motion.h2>
        <motion.div variants={fadeInUp}>
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
                  <motion.div 
                    className="realisation-item"
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  >
                    <img src={`https://ozendev-backend.onrender.com/${item.image}`} alt={item.titre} />
                    <h3>{item.titre}</h3>
                    <p>{item.description}</p>
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
        <motion.a
          href="#"
          className="voir-tout-btn"
          onClick={(e) => {
            e.preventDefault(); // empêche le scroll en haut
            handleVoirToutClick(); // déclenche la navigation
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          variants={fadeInUp}
        >
          Voir tout
        </motion.a>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="footer"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <motion.p variants={fadeInUp}>Suivez-nous sur</motion.p>
        <motion.div className="social-icons" variants={fadeInUp}>
          <motion.a 
            href="#" 
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaFacebook />
          </motion.a>
          <motion.a 
            href="#" 
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaInstagram />
          </motion.a>
          <motion.a 
            href="#" 
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaLinkedin />
          </motion.a>
        </motion.div>
        <motion.div className="contact-info" variants={fadeInUp}>
          <p><strong>Adresse :</strong> Alger-Said Hamdine</p>
          <p><strong>Téléphone :</strong> +213 456 789</p>
          <p><strong>Email :</strong> contact@innovadev.com</p>
        </motion.div>
        <motion.p variants={fadeInUp}>Boîte de développement : innovazen © 2025</motion.p>
      </motion.footer>
    </div>
  );
};

export default ServiceDetails;