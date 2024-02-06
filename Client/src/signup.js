import React from "react";
import "./signup.css";
import background from "./img/img2.jpg";
import { useFormik } from "formik";
import { signUpSchema } from "./schemas/validationsignup.js"; 
import { useNavigate } from 'react-router-dom';
 
//import { FaGoogle } from "react-icons/fa";

const initialValues={ 
    username: "",
    fullname: "",
    email: "",
    password: "",
    phone: "",
}

const Signup = () => {
  const navigate = useNavigate();
  const {values,errors,touched,handleBlur,handleChange,handleSubmit}=useFormik({
    initialValues:initialValues,
    validationSchema:signUpSchema,
    onSubmit:(values,action)=>{
      action.resetForm()
      registerUser()
      navigate("/api/v1/users/login");
    },
  })

  const myStyle1 = {
    backgroundImage: `url(${background})`,
  };

  

  const registerUser = async () => {
    try {
      const response = await fetch("/api/v1/users/register", {
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
      console.log("Registration successful:", data);

      // Handle success, e.g., redirect to login page
      
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle error, e.g., display an error message

      
    }
  };

  

  return (
    <div class="signup" style={myStyle1}>
      <section class="container">
        <form onSubmit={handleSubmit} method="POST">
          <div class="form-section">
            <div class="form-wrapper">
              <h2>Welcome!</h2>
              <p>Enter your credentials.</p>

              <div class="input-container">
                <div class="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    autoComplete="off"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.username && touched.username?(<p>{errors.username}</p>):null}
                </div>
                <div class="form-group">
                  <label htmlFor="fullname">Fullname</label>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    autoComplete="off"
                    value={values.fullname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.fullname && touched.fullname?(<p>{errors.fullname}</p>):null}
                </div>
                <div class="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    autoComplete="off"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.phone && touched.phone?(<p>{errors.phone}</p>):null}
                </div>
                <div class="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="off"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email?(<p>{errors.email}</p>):null}
                </div>
                <div class="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="off"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password?(<p>{errors.password}</p>):null}
                </div>
              </div>

              <button type="submit" class="login-btn" >
                Sign up
              </button>

              <br />
              <p>
                Already have an account ?{" "}
                <a href="/api/v1/users/login">Login</a>
              </p>
            </div>
          </div>
        </form>
      </section>

      <div class="overlay"></div>
    </div>
  );
};

export default Signup;
