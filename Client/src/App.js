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
import Loader from './loader';
import Checkout from './checkout';
import Navbar2 from './navbar2';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);

  

  

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

  const placeorderRoutes = () => {
    let auth = { 'token': isVerify };
    return (auth.token ? <Outlet /> : <Navigate to="/api/v1/users/login" />);
  }

  const adminRoutes = () => {
    let auth = { 'token': isAdmin };
    return (auth.token ? <Outlet /> : <Navigate to="/api/v1/users/login" />);
  }

  // Render loading state while checking authentication status
  if (isLoading) {
    return <div><Loader/></div>;
  }

  if (isLoading1) {
    return <div><Loader/></div>;
  }

  if (isLoading2) {
    return <div><Loader/></div>;
  }

  return (
    <div className="app">
      <BrowserRouter>
        <div>
          {/* Render Navbar only if current route is not dashboard */}
          

          <Routes>
            <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
            <Route path="/api/v1/users/login"element={<><Navbar /><Login /></>} />
            <Route path="/api/v1/users/register" element={<><Navbar /><Signup /></>} />
            <Route path="/api/v1/users/contact" element={<><Navbar /><Contact /><Footer /></>} />
            <Route path="/api/v1/users/editprofile" element={<><Navbar /><EditProf /><Footer /></>} />
            <Route path="/api/v1/users/searchedbike" element={<><SearchedBike /></>}/>
            <Route path="/api/v1/users/about" element={<><Navbar /><About /><Footer /></>} />
            <Route element={privateRoutes()}>
              <Route path="/api/v1/users/dashboard" element={<><Dashboard /><Footer /></>} />
            </Route>
            <Route element={verifyRoutes()}>
              <Route path="/api/v1/users/bikedetails" element={<><Navbar /><List /><Footer /></>} /> 
            </Route>
            <Route element={adminRoutes()}>
            <Route path="/api/v1/admin/admindashboard" element={<AdminDash />}/>
            <Route path="/api/v1/admin/userdetails" element={<UserDetails />}/>
            <Route element={placeorderRoutes()}>
              <Route path="/api/v1/users/checkout" element={<Checkout />} /> 
            </Route>
         
           
            </Route>
            
            
            
          </Routes>
        </div>
        
      </BrowserRouter>
    </div>
  );
}

export default App;