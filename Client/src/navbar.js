import "./navbar.css";
import React, { useState, useEffect } from "react";
import logo from './img/logo.png';

function Navbar() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from the backend
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/v1/users/fetchUserData");
        if (response.ok) {
          const data = await response.json();
          const user = data.data;
          setUserData(user);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData()
  }, []);

  

  const logout = async () => {
    const shouldLogout = window.confirm("Are you sure you want to log out?"); // Confirmation dialog
    if (shouldLogout) {
      try {
        const response = await fetch('/api/v1/users/logout', {
          method: "POST",
        });
        const data = await response.json();
        console.log(data);
        localStorage.removeItem("accessToken"); 
        window.location.href = "/api/v1/users/login";
      } catch (error) {
        alert("Login first to logout."); 
      }
    }
  };
  

  const checkStatus=async()=>{
    try {
      const response=await fetch('/api/v1/users/checkstatus')
      const data=await response.json();
      console.log(data.data);
      if(data.data){
        window.location.href = "/api/v1/users/bikedetails";
      }else{
        alert("Please complete your profile to continue further.")
        window.location.href = "/api/v1/users/login";
      }
    } catch (error) {
      alert("Please login/register first.")
    }
  }
 
const dashboard=async()=>{
  const response=await fetch('/api/v1/users/checkstatus')
  if(response.status===200){
    window.location.href = "/api/v1/users/dashboard";
}else{
  alert("Please login/register first.")
}}

  return (


<div class="nav">
    <div className="navbar">

<ul class="menu cf" style={{float: 'left'}}>


  <li class="active">
    
          <a href="/">
            Inventory
          </a>
         

          <ul class="submenu">
            <li>
              <a href="/">
                Web design
              </a>
            </li>
            <li>
              <a href="/">
                Graphics design
              </a>
            </li>
            <li>
              <a href="/">
                App development
              </a>
            </li>
            <li>
              <a href="/">
                Marketing
              </a>
            </li>
          </ul>

          
        </li>
        <li>
          <a href="/api/v1/users/about">
            About
          </a>
        </li>
        <li>
          <a href="/api/v1/users/contact">
            Get In Touch
          </a>
          
        </li>
  
        
      </ul>

      <a class="main-logo" href="/"><img src={logo} alt=""/></a>





      <ul class="menu cf cf-right">

      <li>
          <a style={{color:'white'}} onClick={dashboard} href>
            How It Works
          </a>
          {/* <a href="/api/v1/users/dashboard">
            How It Works
          </a> */}
          
        </li>
       
        <li>
          {userData ? 
          (<a href>{userData.username}</a>) :(<a href="/api/v1/users/login">
            Log In
          </a>)  }
          <ul class="submenu inverted-submenu">
            <li>
              <a href="/api/v1/users/dashboard">
                Dashboard
              </a>
            </li>
            <li>
              <a href onClick={logout}>
              Log out
              </a>
            </li>
            
          </ul>
          
        </li>
  
        <li class="active">
        <a id="temp" style={{color:'white'}} onClick={checkStatus} href>
             List A Ride
          </a>
        </li>
      </ul>


    </div>



  


</div>
  );
}
export default Navbar;
