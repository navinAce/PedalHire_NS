import React, { useState } from "react";
import "./home.css";
import video1 from "./video1.mp4";
import {Calendarfrom} from "./calenderfrom.js";
import {Calendarto} from "./calender.js";


const Home = () =>{

  const [faqItems, setFaqItems] = useState([
    {
      question: "How do I verify my email?",
      answer: `Click the link in the verification email from verify@codepen.io (be sure to check your spam folder or other email tabs if it's not in your inbox).
              Or, send an email with the subject "Verify" to verify@codepen.io from the email address you use for your CodePen account.`,
      isOpen: false
    },
    {
      question: "My Pen loads infinitely or crashes the browser.",
      answer: `It's likely an infinite loop in JavaScript that we could not catch. To fix, add ?turn_off_js=true to the end of the URL (on any page, like the Pen or Project editor, your Profile page, or the Dashboard) to temporarily turn off JavaScript. When you're ready to run the JavaScript again, remove ?turn_off_js=true and refresh the page.`,
      isOpen: false
    },
    {
      question: "How do I contact the creator of a Pen?",
      answer: `You can leave a comment on any public Pen. Click the "Comments" link in the Pen editor view, or visit the Details page.`,
      isOpen: false
    },
    {
      question: "What version of [library] does CodePen use?",
      answer: "We have our current list of library versions here",
      isOpen: false
    },
    {
      question: "What are forks?",
      answer: `A fork is a complete copy of a Pen or Project that you can save to your own account and modify. Your forked copy comes with everything the original author wrote, including all of the code and any dependencies.`,
      isOpen: false
    }
  ]);

  const toggleFaqItem = index => {
    setFaqItems(prevItems =>
      prevItems.map((item, i) =>
        i === index ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };

  


    return(
        <div className="home">


        <div class="overlay"></div>
        <video src={video1} type="video/mp4" autoPlay muted loop />
  
        <div class="banner">
          <h1>Rent a bike anywhere in India.</h1>
          <h2>Save money, meet awesome people, and consume less</h2>
  
  
          <div class="form-container">
      
        
        <input type="text" id="place" name="place" placeholder="Where would you like to pickup" list="place-all" required/>
        <datalist id="place-all">
                <option value="Mumbai">Mumbai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Chennai">Chennai</option>
                <option value="Delhi">Delhi</option>
                
            </datalist>
            <Calendarfrom id="checkin" name="checkin"/>
<Calendarto id="checkout" name="checkout"/>
        
        
        <button id="search-btn" type="input"><i class="fa fa-search"></i></button>
     
    </div>
          </div>
  
  
          
        
  
     
  
  
  
  
  
  
  <div class="testimonials">
    <h1>Testimonials</h1>
  
  <div class="testimonial-cards">
  
          <figure class="snip1533">
    <figcaption>
      <blockquote>
        <p>I'm killing time while I wait for life to shower me with meaning and happiness.</p>
      </blockquote>
      <h3>Wisteria Ravenclaw</h3>
      <h4>Google Inc.</h4>
    </figcaption>
  </figure>
  <figure class="snip1533">
    <figcaption>
      <blockquote>
        <p>I'm killing time while I wait for life to shower me with meaning and happiness.</p>
      </blockquote>
      <h3>Ursula Gurnmeister</h3>
      <h4>Facebook</h4>
    </figcaption>
  </figure>
  <figure class="snip1533">
    <figcaption>
      <blockquote>
        <p>I'm killing time while I wait for life to shower me with meaning and happiness. </p>
      </blockquote>
      <h3>Ingredia Nutrisha</h3>
      <h4>Twitter</h4>
    </figcaption>
  </figure>
  <figure class="snip1533">
    <figcaption>
      <blockquote>
        <p>I'm killing time while I wait for life to shower me with meaning and happiness. </p>
      </blockquote>
      <h3>Ingredia Nutrisha</h3>
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
                className={`answercont ${
                  item.isOpen ? "active" : ""
                }`}
                style={{
                  maxHeight: item.isOpen ? "1000px" : 0,
                  overflow: "hidden",
                  transition: "max-height 0.3s ease"
                }}
              >
                <div className="answer">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
        </div>


  
  
  
  
  
  
  
  
  
  
  
      </div>
    )

    
};

export default Home;