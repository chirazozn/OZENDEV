import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import ServiceDetails from './ServiceDetails'; // Importer la page de détails

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/:id" element={<ServiceDetails />} /> {/* Route pour les détails */}
      </Routes>
    </Router>
  );
};

export default App;
