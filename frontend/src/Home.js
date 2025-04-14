import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Home.css'; // External CSS for responsiveness and layout
import videoIntro from './assets/intro.mp4'; // Import your intro video
import logo from './assets/logo.png'; // Import your logo
import marketingImg from './assets/marketing.jpg';
import webImg from './assets/web.jpg';
import mobileImg from './assets/mobile.jpg';
import designImg from './assets/design.jpg';
import hamburgerIcon from './assets/hamburger-icon.png'; // adjust path if 
import contactImg from './assets/contact.jpg';
import { FaMapMarkerAlt } from 'react-icons/fa';


const Home = () => {
  const [showContent, setShowContent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle the menu visibility

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 4000); // 10 seconds video

    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (!showContent) {
    return (
      <div className="video-container">
        <h3>welcome</h3>
        <video src={videoIntro} autoPlay muted onEnded={() => setShowContent(true)} />
     
      </div>
    );
  }

  const services = [
    { title: 'Digital Marketing', image: marketingImg },
    { title: 'Website Creation', image: webImg },
    { title: 'Mobile Apps', image: mobileImg },
    { title: 'Graphic Design', image: designImg }
  ];

  return (
    <div className="main-container">
      {/* Menu */}
      <nav className="navbar">
        <img src={logo} alt="Logo" className="logo" />

 <div className="hamburger" onClick={toggleMenu}>
 {!menuOpen ? (
    <img src={hamburgerIcon} alt="Menu" className="hamburger-img" onClick={toggleMenu} />
  ) : (
    <div className="close-btn" onClick={toggleMenu}>✕</div>
  )}
</div>
 
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#services">Our Services</a></li> {/* 👈 Lien vers la section */}
          <li><a href="#contact">Contact Us</a></li>
          <li><a href="#location">Location</a></li>


        </ul>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-overlay">
          <h1>Hey there! You’ve just landed at Ozen-Dev</h1>
          <p>We engineer smart, scalable, and secure digital solutions </p>
          <p> Let’s make something great together. </p>
        </div>
      </section>



            {/* ABOUT US  */}

      <section id="about" className="about-section">
  <h2>About Us</h2>
  <p>
    At <strong>Ozen Dev</strong>, we are passionate creators, developers, and digital strategists
    dedicated to helping businesses thrive in the digital era. Based in Algeria, our team delivers
    smart and scalable web and mobile solutions tailored to your unique goals.
  </p>
  <p>
    Whether it's launching a custom website, crafting a mobile app, or boosting your brand through
    digital marketing and graphic design, Ozen Dev is your trusted tech partner. We prioritize
    innovation, quality, and long-term collaboration.
  </p>
  <p>
    Let’s build your digital future — together.
  </p>
</section>

      {/* Services */}
      <section id="services" className="services-section">
      <h2>Our Services</h2>
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
              <button>Read More</button>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section">
  <h2>Contact Us</h2>
  <p>Have a project in mind or need support? We'd love to hear from you!</p>

  <div className="contact-container">
    <img src={contactImg} alt="Contact Us" className="contact-img" />
    
    <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
      <input type="text" placeholder="Your Name" required />
      <input type="email" placeholder="Your Email" required />
      <textarea rows="5" placeholder="Your Message" required></textarea>
      <button type="submit">Send Message</button>
    </form>
  </div>
</section>
{/* Location Section */}
<section className="location-section" id="location">
  <h2>Find Us on the Map</h2>
  <div className="map-container">
  
  <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.856062959847!2d3.0361534745119085!3d36.72601797187994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fad94be504659%3A0x83fcc76c94502114!2sResidence%20LALA%20MALIKA!5e0!3m2!1sfr!2sdz!4v1744656840711!5m2!1sfr!2sdz"
      allowFullScreen=""
      loading="lazy"
      title="Ozen Dev Location"
    ></iframe>
  
  </div>
  <button className="follow-btn">
  <a
  href="https://www.google.com/maps/place/Residence+LALA+MALIKA/@36.7260179,3.0361535,17z"
  target="_blank"
  rel="noopener noreferrer"
  className="follow-btn"
> <FaMapMarkerAlt style={{ marginRight: '8px' }} />
  Follow our location
</a>
</button>
</section>


      {/* Footer */}
      <footer className="footer">
        <p>Follow us on</p>
        <div className="social-icons">
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaLinkedin /></a>
        </div>
        
        <div className="contact-info">
          <p><strong>Location:</strong> 1234 Example St, City, Country</p>
          <p><strong>Phone 1:</strong> +123 456 789</p>
          <p><strong>Phone 2:</strong> +987 654 321</p>
          <p><strong>Email:</strong> contact@ozendev.com</p>
        </div>

        <p>Boîte de développement: Ozen Dev</p>
        <p>© 2025</p>
      </footer>
    </div>
  );
};

export default Home;
