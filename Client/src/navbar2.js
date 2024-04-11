import "./navbar.css";
import "./navbar2.css";
import logo from "./img/logo.png";

function Navbar2({ username }) {
  const checkStatus = async () => {
    try {
      const response = await fetch("/api/v1/users/checkstatus");
      const data = await response.json();
      console.log(data.data);
      if (data.data) {
        window.location.href = "/api/v1/users/bikedetails";
      } else {
        alert("Please verify your document first.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const logout = async () => {
    const shouldLogout = window.confirm("Are you sure you want to log out?"); // Confirmation dialog
    if (shouldLogout) {
      try {
        const response = await fetch('/api/v1/users/logout', {
          method: "POST",
        });
        const data = await response.json();
        console.log(data);
        localStorage.removeItem("accessToken"); 
        window.location.href = "/api/v1/users/login";
      } catch (error) {
        alert("Login first to logout."); 
      }
    }
  };

  return (
    <div class="navbar2">
      <div className="navbar">
        <a class="main-logo" href="/">
          <img src={logo} alt="" />
        </a>

        <ul class="menu cf cf-right">
          <li>
            <a href="/api/v1/users/dashboard">Dashboard</a>
          </li>

          <li>
          {username ? 
          (<a href>{username}</a>) :(<a href="/api/v1/users/login">
            Log In
          </a>)  }
          <ul class="submenu inverted-submenu">
            <li>
              <a href="/api/v1/users/register">
                Register
              </a>
            </li>
            <li>
              <a href onClick={logout}>
              Log out
              </a>
            </li>
            
          </ul>
          
          </li>

          <li>
            <a style={{ color: "white" }} onClick={checkStatus} href>
              List A Ride
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Navbar2;
