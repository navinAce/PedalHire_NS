import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Home from './home';
import Login from './login';
import Navbar from './navbar';
import Signup from './signup';
import Footer from './footer';
import Contact from './contact';
import List from './list';
import Dashboard from './dashboard';
import EditProf from './editprof';
import React, { useEffect, useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // Get the current pathname
  const pathname = window.location.pathname;
  const noNavbar = pathname === '/api/v1/users/dashboard';

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch('/api/v1/users/checkstatus');
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
      setIsLoading(false); // Update loading state once the check is completed
    };
    checkStatus();
  }, []);

  const privateRoutes = () => {
    let auth = { 'token': isAuthenticated };
    return (auth.token ? <Outlet /> : <Navigate to="/api/v1/users/login" />);
  }

  // Render loading state while checking authentication status
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <BrowserRouter>
        <div>
          {/* Render Navbar only if current route is not dashboard */}
          {!noNavbar && <Navbar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/api/v1/users/login" element={<Login />} />
            <Route path="/api/v1/users/register" element={<Signup />} />
            <Route path="/api/v1/users/contact" element={<Contact />} />
            <Route path="/api/v1/users/editprofile" element={<EditProf />} />
            <Route element={privateRoutes()}>
              <Route path="/api/v1/users/bikedetails" element={<List />} />
              <Route path="/api/v1/users/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;