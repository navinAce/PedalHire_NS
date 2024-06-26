import './login.css';
import background from './img/img2.jpg'
import { useFormik } from "formik";
import { loginSchema } from "./schemas/validationlogin.js"
import Navbar from "./navbar.js";



const initialValues={ 
  email: "",
  password: "",
}

const Login = () =>{


  const {values,errors,touched,handleBlur,handleChange,handleSubmit}=useFormik({
    initialValues:initialValues,
    validationSchema:loginSchema,
    onSubmit:(values,action)=>{
      loginUser()
      action.resetForm()
    },
  })

  const myStyle={
    backgroundImage: `url(${background})` ,
  };

  const loginUser = async () => {
    try {
      const response = await fetch("/api/v1/users/login", {
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
      console.log("Registration successful:", data.data.user);
      if(data.data.user){
        window.location.href="/api/v1/admin/admindashboard"
      }
      else{
        window.location.href="/"
      }
    } catch (error) {
      alert("Invalid credential. Please try again.");    
    }
  };
  

    return(   
        <div class="login" style={myStyle}>
         

<div class="overlay" style={{zIndex: "0"}}></div>

<section class="container">

<form onSubmit={handleSubmit}>
     
      <div class="form-section">
        <div class="form-wrapper">
        

          <h2>Welcome Back!</h2>
          <p>Enter your credentials to access your account.</p>

          <div class="input-container">
                <div class="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
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

          <div class="remember-forgot">
            <div class="remember-me">
              <input type="checkbox" value="remember-me" id="remember-me" />
              <label for="remember-me">Remember me</label>
            </div>

            <a href="#">Forgot password?</a>
          </div>

          <button class="login-btn" type="submit">Log In</button>

          <div class="or-divider">or</div>

          <button class="google-signin">
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="96px" height="96px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
            <span>Sign in with Google</span>
          </button>
          <br />
          <p>Doesn't have an account ? <a href="/api/v1/users/register">Signup</a></p>

        </div>
      </div>
      </form>
    </section>

    
</div>

     )
};

export default Login;