import "./contact.css";
import background from "./img/img2.jpg";
import { validationFeedbackSchema } from "./schemas/validationfeedback.js";
import { useFormik } from "formik";

const initialValues = {
  name: "",
  email: "",
  comments: "",
};

function Contact() {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validationFeedbackSchema,
      onSubmit: (values, action) => {
        postFeedback();
        action.resetForm();
        alert("Thankyou for your feedback")
      },
    });

  const myStyle = {
    backgroundImage: `url(${background})`,
  };

  const postFeedback=async () =>{
    try {
        const response = await fetch("/api/v1/users/feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("feedback successful received:", data);
  
        // Handle success, e.g., redirect to login page
        
      } catch (error) {
        console.error("Error during posting feedback:", error);
        alert("Login yourself first")
        // Handle error, e.g., display an error message
  
        
      }
  }

  return (
    <div class="contact">
      <div class="overlay"></div>

      <section class="contact_us" style={myStyle}>
        <div class="container">
          <div class="row">
            <div class="col-md-10 offset-md-1">
              <div class="contact_inner">
                <div class="row">
                  <div class="col-md-10">
                    <div class="contact_form_inner">
                      <div class="contact_field">
                        <h3>Contact Us</h3>
                        <p>
                          Feel Free to contact us any time. We will get back to
                          you as soon as we can!.
                        </p>
                        <form onSubmit={handleSubmit} method="POST">
                          <input
                            type="text"
                            class="form-control form-group"
                            id="name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Name"
                          />
                          {errors.name && touched.name?(<p>{errors.name}</p>):null}
                          <input
                            type="text"
                            class="form-control form-group"
                            id="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Email"
                          />
                          {errors.email && touched.email?(<p>{errors.email}</p>):null}
                          <textarea
                            class="form-control form-group"
                            id="comments"
                            name="comments"
                            value={values.comments}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Message"
                          ></textarea>
                          {errors.comments && touched.comments?(<p>{errors.comments}</p>):null}
                          <button class="contact_form_submit" type="submit">Send</button>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="right_conatct_social_icon d-flex align-items-end">
                      <div class="socil_item_inner d-flex">
                        <li>
                          <a href="/">
                            <i class="fab fa-facebook-square"></i>
                          </a>
                        </li>
                        <li>
                          <a href="/">
                            <i class="fab fa-instagram"></i>
                          </a>
                        </li>
                        <li>
                          <a href="/">
                            <i class="fab fa-twitter"></i>
                          </a>
                        </li>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="contact_info_sec">
                  <h4>Contact Info</h4>
                  <div class="d-flex info_single align-items-center">
                    <i class="fas fa-headset"></i>
                    <span>+91 96296 10972</span>
                  </div>
                  <div class="d-flex info_single align-items-center">
                    <i class="fas fa-envelope-open-text"></i>
                    <span>info@pedalhire.com</span>
                  </div>
                  <div class="d-flex info_single align-items-center">
                    <i class="fas fa-map-marked-alt"></i>
                    <span>
                      1000+ Travel partners and 65+ Service city across India,
                      USA, Canada & UAE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="map_sec">
        <div class="container">
          <div class="row">
            <div class="col-md-10 offset-md-1">
              <div class="map_inner">
                <h4>Find Us on Google Map</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Tempore quo beatae quasi assumenda, expedita aliquam minima
                  tenetur maiores neque incidunt repellat aut voluptas hic
                  dolorem sequi ab porro, quia error.
                </p>
                <div class="map_bind">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d935.5275165235546!2d72.86028782346021!3d19.0412372565317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8d2f810fba5%3A0x3eb25d8eb5ed4d3b!2sSIES%20College%20Of%20Arts%2C%20Science%20%26%20Commerce%20(Autonomous)!5e0!3m2!1sen!2sin!4v1704804941309!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    frameborder="0"
                    allowfullscreen=""
                    aria-hidden="false"
                    tabindex="0"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Contact;
