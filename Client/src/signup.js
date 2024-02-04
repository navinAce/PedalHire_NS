import './signup.css';
import background from './img/img1.jpg'

import { FaGoogle } from "react-icons/fa";


const Signup = () =>{

  const myStyle1={
    backgroundImage: `url(${background})` ,

  };

  

  

    return(   
        <div class="signup" style={myStyle1}>

    
 <form>
    <h3>Sign Up</h3>

    <label for="username">Username</label>
    <input type="text" placeholder="" id="username"/>

    <label for="email">Email</label>
    <input type="text" placeholder="" id="username"/>

    <label for="phoneno">Phone No</label>
    <input type="password" placeholder="" id="password"/>

    <label for="aadhar">Aadhar No</label>
    <input type="password" placeholder="" id="password"/>

    <label for="password">Password</label>
    <input type="password" placeholder="" id="password"/>


    <button>Log In</button>
    <div class="social">
      <div class="go"><FaGoogle/> </div>
      
    </div>
    <p>Already have an account ? <a href="/api/v1/user/login"> Login</a></p>
 </form>

 
 <div class="overlay"></div>
</div>
     )
};

export default Signup;