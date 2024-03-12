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
import AdminDash from "./admindash";
import SearchedBike from "./searchedbike";
import UserDetails from "./userdetails";
import About from "./about";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);

  // Get the current pathname
  const pathname = window.location.pathname;
  const noNavbar1 = pathname === '/api/v1/users/dashboard';
  const noNavbar2 = pathname === "/api/v1/admin/admindashboard";
  const noNavbar3 = pathname === "/api/v1/users/searchedbike";
  const noNavbar4 = pathname === "/api/v1/admin/userdetails";

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

  useEffect(() => {
    const VerifyStatus = async () => {
      try {
        const response = await fetch('/api/v1/users/checkstatus');
        const data = await response.json();
        if (data.data === true) {
          setIsVerify(true);
        }else{
          setIsVerify(false);
        }
      } catch (error) {
        setIsVerify(false);
      }
      setIsLoading1(false); // Update loading state once the check is completed
    };
    VerifyStatus();
  }, []);

  useEffect(() => {
    const VerifyStatus = async () => {
      try {
        const response = await fetch('/api/v1/admin/is-admin');
        const data = await response.json();
        if (data.data === true) {
          setIsAdmin(true);
        }else{
          setIsAdmin(false);
        }
      } catch (error) {
        setIsAdmin(false);
      }
      setIsLoading2(false); // Update loading state once the check is completed
    };
    VerifyStatus();
  }, []);


  const privateRoutes = () => {
    let auth = { 'token': isAuthenticated };
    return (auth.token ? <Outlet /> : <Navigate to="/api/v1/users/login" />);
  }

  const verifyRoutes = () => {
    let auth = { 'token': isVerify };
    return (auth.token ? <Outlet /> : <Navigate to="/api/v1/users/login" />);
  }

  const adminRoutes = () => {
    let auth = { 'token': isAdmin };
    return (auth.token ? <Outlet /> : <Navigate to="/api/v1/users/login" />);
  }

  // Render loading state while checking authentication status
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isLoading1) {
    return <div>Loading...</div>;
  }

  if (isLoading2) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <BrowserRouter>
        <div>
          {/* Render Navbar only if current route is not dashboard */}
          {!noNavbar1 && !noNavbar2 && !noNavbar3 && !noNavbar4 && <Navbar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/api/v1/users/login" element={<Login />} />
            <Route path="/api/v1/users/register" element={<Signup />} />
            <Route path="/api/v1/users/contact" element={<Contact />} />
            <Route path="/api/v1/users/editprofile" element={<EditProf />} />
            <Route path="/api/v1/users/searchedbike" element={<SearchedBike />}/>
            <Route path="/api/v1/users/about" element={<About />} />
            <Route element={privateRoutes()}>
              <Route path="/api/v1/users/dashboard" element={<Dashboard />} />
            </Route>
            <Route element={verifyRoutes()}>
              <Route path="/api/v1/users/bikedetails" element={<List />} /> 
            </Route>
            <Route element={adminRoutes()}>
            <Route path="/api/v1/admin/admindashboard" element={<AdminDash />}/>
            <Route path="/api/v1/admin/userdetails" element={<UserDetails />}/>
            </Route>
            
            
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;