import "./adminsidenav.css";

function AdminSidenav() {
  return (
    <div class="admin-sidenav">
   
          <div class="wrapper d-flex align-items-stretch">
            <nav id="sidebar">
              <h1>
                <a href="index.html" class="logo">
                  PedalHire
                </a>
              </h1>
              <ul class="list-unstyled components mb-5">
                <li>
                  <a href="/">
                    <span class="fa fa-home mr-3"></span> Homepage
                  </a>
                </li>
                <li>
                  <a href="/api/v1/admin/admindashboard">
                    <span class="fa fa-user mr-3"></span> Dashboard
                  </a>
                </li>

                <li>
                  <a href="#">
                    <span class="fa fa-paper-plane mr-3"></span> Product Listing
                  </a>
                </li>

                <li>
                  <a href="/api/v1/admin/userdetails">
                    <span class="fa fa-user mr-3"></span> User Details
                  </a>
                </li>
              </ul>
            </nav>
          

        
      </div>
    </div>
  );
}

export default AdminSidenav;
