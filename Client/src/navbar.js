import "./navbar.css";


 
function Navbar() {
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
          <a href="/">
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
          <a href="/">
            How It Works
          </a>
          
        </li>
       
        <li>
          <a href="/api/v1/users/login">
            Log In
          </a>
          
        </li>
  
        <li class="active">
          <a href="/api/v1/users/bikedetails">
             List A Ride
          </a>
        </li>
      </ul>


    </div>



  


</div>
  );
}
export default Navbar;
