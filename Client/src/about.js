import "./about.css";
import background from "./img/img2.jpg";
import img1 from "./img/img4.jpg";
import React, { useEffect, useState } from 'react';
import Navbar from "./navbar.js";

const About = () => {
  const myStyle = {
    backgroundImage: `url(${background})`,
  };


  const [counts, setCounts] = useState({});

  useEffect(() => {
    const countingElements = document.querySelectorAll('.counting');
    const countsData = {};

    countingElements.forEach(element => {
      const countTo = parseInt(element.getAttribute('data-count'));
      const duration = 3000;
      const interval = duration / countTo;
      let currentCount = 0;

      const countFunction = () => {
        const timer = setInterval(() => {
          currentCount += 1;
          element.textContent = currentCount;
          if (currentCount === countTo) {
            clearInterval(timer);
          }
        }, interval);
      };

      countsData[element.getAttribute('data-count')] = countFunction;
      setCounts({...countsData});
    });
  }, []);

  useEffect(() => {
    Object.values(counts).forEach(countFunction => countFunction());
  }, [counts]);




  const handleKnowMoreClick = () => {
    const aboutPhElement = document.getElementById('about-pd');
    if (aboutPhElement) {
      aboutPhElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div class="about">
      <Navbar/>
      <div class="overlay"></div>

      <section class="about-us" style={myStyle}>
        <div class="row">
          <div class="col-6">
            <div class="about-banner">
              <h1>Welcome To PedalHire</h1>
              <p>At PedalHire, we're passionate about biking and dedicated to providing
                 unforgettable experiences for riders of all levels. Whether you're a seasoned
                  cyclist or new to the sport, our mission is to make cycling accessible, enjoyable,
                   and hassle-free for everyone.</p>
              <button onClick={handleKnowMoreClick}>Know More <i class="fas fa-arrow-right"></i></button>
            </div>
          </div>

          <div class="col-5">
          <div class="about-banner-img">
          <img src={img1} alt="" />
          </div>
          </div>

          <div class="col-1">
          <ul>
  <li><i class="fa-brands fa-facebook-f"></i></li>
  <li><i class="fa-brands fa-twitter"></i></li>
  <li><i class="fa-brands fa-instagram"></i></li>
  <li><i class="fa-brands fa-linkedin-in"></i></li>
  <li><i class="fa-brands fa-whatsapp"></i></li>
</ul>
          </div>
            
          
        </div>
      </section>

      <div class="about-pd text-center" id="about-pd">
        {/* <h2>Hello There</h2> */}
        <h1>We are PedalHire</h1>
        <hr />
        <p>PedalHire is a pioneering consumer-to-consumer bike rental platform
           that connects bike owners with enthusiasts looking for an unforgettable 
           riding experience. Founded in [Year of Establishment], PedalHire was born out
            of a shared passion for biking and a vision to make cycling more accessible and 
            enjoyable for everyone.</p>
       

<section id="counter-stats" class="wow fadeInRight" data-wow-duration="1.4s">
	<div class="container">
		<div class="row">

			<div class="col-lg-3 stats">
				
				<div class="counting" data-count="26">0</div>
				<h5>Lines of code</h5>
			</div>

			<div class="col-lg-3 stats">
				
				<div class="counting" data-count="44">0</div>
				<h5>Projects done</h5>
			</div>

			<div class="col-lg-3 stats">
			
				<div class="counting" data-count="32">0</div>
				<h5>Happy clients</h5>
			</div>

			<div class="col-lg-3 stats">
				
				<div class="counting" data-count="17">0</div>
				<h5>Cups of coffee</h5>
			</div>


		</div>
	
	</div>


</section>


      </div>

      <div class="ph-mv text-center">
        <h3>What We Do</h3>
        <h2>We’ve got everything you need to launch and grow your income.</h2>
        <hr />
        <div class="row">
          <div class="col">
            <div class="d-flex">
          <i class="fas fa-motorcycle"></i> <h1>Rent A Bike</h1>
          </div>
          <p>Looking for the perfect bike for your next adventure ? 
            Look no further! At PedalHire, we offer a diverse selection of
             high-quality bikes for rent, suited for riders of all levels
              and preferences. Whether you're exploring scenic trails, cruising 
              through the city streets, or tackling rugged terrain, we have the right bike for you.</p>
          </div>
          <div class="col col2">
          <div class="d-flex">
          <span class="material-symbols-outlined">
receipt_long
</span> <h1>List Your Bike</h1>
          </div>
          <p>Got a bike that's sitting idle in your garage? 
            Put it to good use and earn extra income by listing 
            it for rent on PedalHire. Our platform makes it easy for bike owners like you
             to share your passion for cycling with others while making money in the process.
Listing your bike is simple. Just create a free account, upload photos and
 details of your bike, set your rental price and availability, and you're all set.</p>
         
          </div>
        </div>
      </div>

 
      
      
      <div class="ph-mv1 text-center">
     
        {/* <h3>What We Do</h3> */}
        <h2>Crafting a Path Forward
Towards Our Shared Goals</h2>
        <hr />
        <div class="row">
          <div class="col">
            <div class="d-flex">
          <i class="fas fa-motorcycle"></i> <h1>Our Mission</h1>
          </div>
          <p>At PedalHire, our mission is to empower individuals
             to embrace the joy of cycling and discover the world around them
              through sustainable and accessible bike rental solutions. We are
               dedicated to providing high-quality bikes, exceptional service, 
               and memorable experiences to riders of all levels and backgrounds. 
              </p>
          </div>
          <div class="col col2">
          <div class="d-flex">
          <i class="fa fa-clipboard"></i> <h1>Our Vision</h1>
          </div>
          <p>Our vision at PedalHire is to create a world where biking is not just
             a mode of transportation, but a way of life. We envision vibrant 
             communities where people of all ages and abilities have access to
              safe and convenient biking options, fostering a culture of health,
               sustainability, and inclusivity.</p>
         
          </div>
        </div>
      </div>

      <div class="ph-mv2 text-center">
     
        {/* <h3>What We Do</h3> */}
        <h2>Privacy Policy: Your Data, Our Responsibility.</h2>
        <hr />
        <div class="row">
          <div class="col">
            <div class="d-flex">
            <span class="material-symbols-outlined">
security
</span> <h1>Privacy Policy</h1>
          </div>
          <p>At PedalHire, we value your privacy. We collect personal information (name, email, phone) to facilitate bike rentals and communicate with you. Your data is used solely for service provision, communication, and improvement purposes. We implement security measures to protect your information and retain it as needed for legal and operational requirements</p>
          </div>
          <div class="col col2">
          <div class="d-flex">
          <span class="material-symbols-outlined">
analytics
</span> <h1>Analytics</h1>
          </div>
          <p>We may use third-party analytics services, such as Google Analytics, to collect and analyze information about your usage of our website. These services may use cookies and other tracking technologies to gather data, which helps us understand how users interact with our website and improve its performance.</p>
         
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;