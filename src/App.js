// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UpperFooter from './components/UpperFooter';
import BottomFooter from './components/BottomFooter';
import Header from './components/Header';
import About from './About';  // Import the About component
import MainSection from './Main';
import Blog from './Blog';
import ContactForm from './Contact';
import SingleBlog from './SingleBlog';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './adminLogin';

function App() {
  return (
    <Router>
      <div>
        <Header />
        
        {/* Define routes for different pages */}
        <Routes>
          <Route path="/" element={<MainSection />} />  {/* Default route for Services */}
          <Route path="/about" element={<About />} /> {/* About page route */}
          <Route path="/blog" element={ <Blog/> } />
          <Route path="/contact" element={ <ContactForm/>} />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          <Route path="/plus" element={<div>Plus Page</div>} />
          <Route path="/plus/new" element={<div>New Arrivals</div>} />
          <Route path="/plus/featured" element={<div>Featured</div>} />
          <Route path="/plus/sale" element={<div>Sale</div>} />
          <Route path="/services/new" element={<div>New Services</div>} />
          <Route path="/services/featured" element={<div>Featured Services</div>} />
          <Route path="/services/sale" element={<div>Services Sale</div>} />
        </Routes>

        {/* Common components displayed on all pages */}
        <UpperFooter />
      </div>
    </Router>
  );
}

export default App;
