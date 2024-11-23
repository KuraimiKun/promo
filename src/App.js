// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import UpperFooter from './components/UpperFooter';
import Header from './components/Header';
import About from './About';  // Import the About component
import MainSection from './Main';
import Blog from './Blog';
import ContactForm from './Contact';
import SingleBlog from './SingleBlog';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './adminLogin';
import LoadingSpinner from './components/LoadingSpinner';

// Add this new component
const NotFound = () => {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '50px 20px',
      minHeight: '50vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn't exist or has been moved.</p>
    </div>
  );
};

// Add this component at the top level of your file
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Create a wrapper component for the layout
const Layout = ({ children }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const isAdminRoute = location.pathname.includes('/admin-');
  const is404 = ![
    '/', '/about', '/blog', '/contact', 
    '/plus', '/plus/new', '/plus/featured', '/plus/sale',
    '/services/new', '/services/featured', '/services/sale'
  ].includes(location.pathname) && 
  !location.pathname.startsWith('/blog/') && 
  !location.pathname.includes('/admin-');

  const showHeaderFooter = !isAdminRoute && !is404;

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Increased duration for better visibility

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {children}
          {showHeaderFooter && <UpperFooter />}
        </>
      )}
    </div>
  );
};

// Update your App component
function App() {
  return (
    <Router basename="/">
      <ScrollToTop /> {/* Add this line */}
      <Layout>
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

          {/* Add this catch-all route at the end */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
