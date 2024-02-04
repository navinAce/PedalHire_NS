import "./home.css";
import video1 from "./video1.mp4";

const Home = () =>{

  
  



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
        
        <input type="date" id="checkin" name="checkin" required/>
        <input type="date" id="checkout" name="checkout" required/>
        
        <button id="search-btn" type="input"><i class="fa fa-search"></i></button>
     
    </div>
          </div>
  
  
          
        
  
     
  
  
  
  
  
  
  <div class="testimonials">
    <h1>Testimonials</h1>
  
  
  
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




  
<div class="faq">
  <h1>FAQs</h1>

<div class="wrapper">
  
  <div class="container">
    <div class="question">
      How do I verify my email?
    </div>
    <div class="answercont">
      <div class="answer">
        Click the link in the verification email from verify@codepen.io (be sure to check your spam folder or other email tabs if it's not in your inbox).

Or, send an email with the subject "Verify" to verify@codepen.io from the email address you use for your CodePen account.<br/><br/>

<a href="https://blog.codepen.io/documentation/features/email-verification/#how-do-i-verify-my-email-2">How to Verify Email Docs</a>
      </div>
    </div>
  </div>
  
    <div class="container">
    <div class="question">
      My Pen loads infinitely or crashes the browser.
    </div>
    <div class="answercont">
      <div class="answer">
        It's likely an infinite loop in JavaScript that we could not catch. To fix, add ?turn_off_js=true to the end of the URL (on any page, like the Pen or Project editor, your Profile page, or the Dashboard) to temporarily turn off JavaScript. When you're ready to run the JavaScript again, remove ?turn_off_js=true and refresh the page.<br/><br/>

<a href="https://blog.codepen.io/documentation/features/turn-off-javascript-in-previews/">How to Disable JavaScript Docs</a>
      </div>
    </div>
  </div>
  
      <div class="container">
    <div class="question">
      How do I contact the creator of a Pen?
    </div>
    <div class="answercont">
      <div class="answer">
        You can leave a comment on any public Pen. Click the "Comments" link in the Pen editor view, or visit the Details page.<br/><br/>

<a href="https://blog.codepen.io/documentation/faq/how-do-i-contact-the-creator-of-a-pen/">How to Contact Creator of a Pen Docs</a>
      </div>
    </div>
  </div>
 
  <div class="container">
    <div class="question">
      What version of [library] does CodePen use?
    </div>
    <div class="answercont">
      <div class="answer">
        We have our current list of library versions <a href="https://codepen.io/versions">here</a>
   
      </div>
    </div>
  </div>
  
  <div class="container">
    <div class="question">
      What are forks?
    </div>
    <div class="answercont">
      <div class="answer">
        A fork is a complete copy of a Pen or Project that you can save to your own account and modify. Your forked copy comes with everything the original author wrote, including all of the code and any dependencies.<br/><br/>

<a href="https://blog.codepen.io/documentation/features/forks/">Learn More About Forks</a>
      </div>
    </div>
  </div>
  
</div>

</div>


  
  
  
  
  
  
  
  
  
  
  
      </div>
    )

    
};

export default Home;