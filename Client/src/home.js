import React, { useState,useEffect } from "react";
import "./home.css";
import video1 from "./video1.mp4";
import { Calendarfrom } from "./calenderfrom.js";
import { Calendarsearch } from "./calender.js";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar.js";


const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const [faqItems, setFaqItems] = useState([
    {
      question: "How do I verify my email?",
      answer: (
        <>
          <p>To verify your email address on PedalHire, please follow these simple steps:</p>
          <p><strong>1. Sign Up:</strong> If you haven't already done so, sign up for a PedalHire account using your email address.</p>
          <p><strong>2.</strong> Go to <strong>Dashboard:</strong> Once you've signed up, upload your document on <strong>"Verify document"</strong></p>
          <p><strong>3. Start Renting/listing:</strong> Now that your email is verified, you're all set to explore and <strong>rent/list</strong> bikes hassle-free on PedalHire!</p>
        </>
      ),
      isOpen: false,
    },
    {
      question: "Is there a minimum age requirement for renting bikes?",
      answer: (
        <>
        <p>Yes, there is a <strong>minimum age</strong> requirement for renting bikes from PedalHire. To ensure the safety of our riders and compliance with local regulations, the minimum age for renting bikes is <strong>18+</strong>.</p>
        <p>We prioritize the safety and well-being of all our customers, and enforcing age restrictions helps us maintain a safe and enjoyable biking experience for riders.</p>
        </>
      ),
      isOpen: false,
    },
    {
      question: "What are the rental rates and payment options?",
      answer: (
        <>
        <p>At PedalHire, <strong>rental rates may vary as they are set by individual bike owners (listers)</strong>. However, we strive to offer competitive rates to ensure <strong>affordability</strong> and <strong>flexibility</strong> for our customers. You can view the rental rates for each bike listing on our platform, as they are clearly displayed on the <strong>bike's listing page</strong>.</p>
        <p>As for payment options, we currently accept <strong>Google Pay</strong> and <strong>Cash on Delivery (COD)</strong>. With Google Pay, you can <strong>conveniently</strong> and <strong>securely</strong> make payments using your linked bank account or credit/debit card. Alternatively, if you prefer to pay in <strong>cash</strong>, you have the option to choose <strong>Cash on Delivery</strong> at the time of booking.</p>
        </>
      ),
      isOpen: false,
    },
    {
      question: "What types of bikes are available for rent?",
      answer: (
        <>
        <p>At PedalHire, we offer a diverse range of bikes for rent, catering to various preferences and riding styles. Since rentals are listed by individual bike owners <strong>(listers)</strong>, the available selection may vary depending on the lister's inventory.</p>
        </>
      ),
      isOpen: false,
    },
    {
      question: "Are helmets provided with the rental bikes?",
      answer: (
        <>
        <p><strong>Yes</strong>, helmets are provided with all rental bikes at PedalHire. We prioritize safety and encourage all riders to wear helmets while riding to ensure a safe and enjoyable riding experience.</p>
        </>
      ),
      isOpen: false,
    },
  ]);

  const toggleFaqItem = (index) => {
    setFaqItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };

  const handleSearch = () => {
    // Redirect to search page with the search query
    navigate(`/api/v1/users/searchedbike?q=${searchQuery}`);
  };

  return (
    <div className="home">
      <Navbar/>
      <div class="overlay"></div>
      <video src={video1} type="video/mp4" autoPlay muted loop />

      <div class="banner">
        <h1>Rent a bike anywhere in India.</h1>
        <h2>Save money, meet awesome people, and consume less</h2>

        <div class="form-container">
        <input
            type="text"
            id="place"
            name="place"
            placeholder="Where would you like to pickup"
            list="place-all"
            required
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}/>
          <datalist id="place-all">
            <option value="400017">400017</option>
            <option value="400022">400022</option>
            <option value="400051">400051</option>
            <option value="400016">400016</option>
          </datalist>
          <Calendarfrom id="checkin" name="checkin" />
          <Calendarsearch id="checkout" name="checkout" />

          <button id="search-btn" type="input" onClick={handleSearch}>
            <i class="fa fa-search"></i>
          </button>
        </div>
      </div>

      <div class="testimonials">
        <h1>Testimonials</h1>

        <div class="testimonial-cards">
          <figure class="snip1533">
            <figcaption>
              <blockquote>
                <p>
                "PedalHire: Where every journey begins with quality bikes and ends with unforgettable memories."
                </p>
              </blockquote>
              <h3>Eshwar Mahalingam</h3>
              <h4>Google Inc.</h4>
            </figcaption>
          </figure>
          <figure class="snip1533">
            <figcaption>
              <blockquote>
                <p>
                "PedalHire made bike rental hassle-free with their 
                user-friendly platform and efficient service."{" "}
                </p>
              </blockquote>
              <h3>Shanthi Paulraj</h3>
              <h4>Facebook</h4>
            </figcaption>
          </figure>
          <figure class="snip1533">
            <figcaption>
              <blockquote>
                <p>
                "Discover freedom on two wheels with PedalHire – your ticket to explore the world."{" "}
                </p>
              </blockquote>
              <h3>Benisha Thomas</h3>
              <h4>Twitter</h4>
            </figcaption>
          </figure>
          <figure class="snip1533">
            <figcaption>
              <blockquote>
                <p>
                "Experience seamless bike rentals and exceptional 
                service with PedalHire."{" "}
                </p>
              </blockquote>
              <h3>Vishnu Sagar</h3>
              <h4>Twitter</h4>
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="faq">
        <h1>FAQs</h1>
        <div className="wrapper">
          {faqItems.map((item, index) => (
            <div className="container" key={index}>
              <div
                className={`question ${item.isOpen ? "active" : ""}`}
                onClick={() => toggleFaqItem(index)}
              >
                {item.question}
              </div>
              <div
                className={`answercont ${item.isOpen ? "active" : ""}`}
                style={{
                  maxHeight: item.isOpen ? "1000px" : 0,
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                }}
              >
                <div className="answer">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
