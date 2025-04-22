import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import ServiceDetails from './ServiceDetails'; // Importer la page de détails
import Realisation from "./Realisation";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/:id" element={<ServiceDetails />} /> 
        <Route path="/Realisation" element={<Realisation />} />
        <Route path="/realisation/services/:id" element={<Realisation />} /> {/* Define the route for RealisationPage */}

      </Routes>
    </Router>
  );
};

export default App;
