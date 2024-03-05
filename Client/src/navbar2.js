import "./navbar.css";
import "./navbar2.css"


 
function Navbar2({username}) {

  const checkStatus=async()=>{
    try {
      const response=await fetch('/api/v1/users/checkstatus')
      const data=await response.json();
      console.log(data.data);
      if(data.data){
        window.location.href = "/api/v1/users/bikedetails";
      }else{
        alert("Please verify your document first.")
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (


<div class="navbar2">
    <div className="navbar">



      <a class="main-logo" href="/">PedalHire</a>





      <ul class="menu cf cf-right">

      <li>
          <a href="/api/v1/users/dashboard">
            How It Works
          </a>
          
        </li>

        
      
        
      <li>
          <a href="/api/v1/users/dashboard">
            How It Works
          </a>
          
        </li>
       
       <li><a href="/api/v1/users/login"><i class="fa fa-user"></i>{username}</a></li>
  
        <li>
          <a style={{color:'white'}} onClick={checkStatus} href>
             List A Ride
          </a>
        </li>
      </ul>


    </div>



  


</div>
  );
}
export default Navbar2;
