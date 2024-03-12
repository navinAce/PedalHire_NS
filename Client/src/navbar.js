import "./navbar.css";


 
function Navbar() {
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

      <a class="main-logo" href="/">PedalHire</a>





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
          <a href="/api/v1/users/login">
            Log In
          </a>
          
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
