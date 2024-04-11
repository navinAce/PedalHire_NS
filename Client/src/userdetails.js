import AdminSidenav from "./adminesidenav";
import "./admindash.css";

import React, { useState, useEffect } from "react";


function UserDetails() {
  const [showContactUs, setShowContactUs] = useState(false);
  const [usersData, setAllUserseData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedData, setSelectedData] = useState(null);
 
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch user data from the backend
    const fetchAllUsersData = async () => {
      try {
        const response = await fetch("/api/v1/admin/fetch-all-users");
        if (response.ok) {
          const data = await response.json();
          const users = data.data;
          setAllUserseData(users);
          console.log("All users:", users);
        } else {
          console.error("Failed to fetch users data");
        }
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    };

    fetchAllUsersData();
  }, []);

  useEffect(() => {
    if (selectedData) {
      const userPhotos = [
        selectedData?.account?.license || null,
        selectedData?.account?.rcbook || null,
        selectedData?.account?.avatar || null,
      ];
     
      setImages([...userPhotos]);
    }
  }, [selectedData]);

  const handleClickEdit = (user) => {
    setShowContactUs(!showContactUs);
    setShowContactUs(true);
    setSelectedData(user);
    window.scrollTo(0, 0);
  };
  const handleCloseContact = () => {
    setShowContactUs(false);
  };



  // State to track current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to handle navigation to the next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to handle navigation to the previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const renderTableData = () => {
    const filteredUsers =
      usersData &&
      usersData.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return (
      filteredUsers &&
      filteredUsers.map((user, index) => {
        const createdDate = new Date(user.createdAt);
        const formattedCreatedDate = createdDate.toLocaleDateString();

        return (
          <tr key={index} onClick={() => handleClickEdit(user)}>
            <td>{user.username}</td>
            <td>{formattedCreatedDate}</td>
            <td>{user.email}</td>
            <td style={{ color: "orange" }}>
              {user.isAdmin ? "Admin" : "User"}
            </td>
          </tr>
        );
      })
    );
  };


  const makeUserAdmin = async (id) => {
    try {
      const response = await fetch(`/api/v1/admin/${id}/make-admin`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        })
        if(response.ok){
          console.log("Role updated successfully")
    }
    } catch (error) {
      console.log(error);
    }
  }

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`/api/v1/admin/${id}/delete-user`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
        if(response.ok){
          console.log("User deleted successfully")
    }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div class="admindash">
      <div className={`row ${showContactUs ? "blur" : ""}`}>
        <div class="col-3">
          <AdminSidenav />
        </div>

        <div class="col-9">
          <h3>Ride Details</h3>
          <hr />
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by Username"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div class="dashboard-details">
            <table>
              <thead>
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">Created At</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                </tr>
              </thead>
              <tbody>{renderTableData()}</tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="inner0" style={{ display: showContactUs ? "block" : "none" }}>
        <div class="inner">
          <button className="close-button" onClick={handleCloseContact}>
            <i class="far fa-window-close"></i>
          </button>
          <div class="image-holder">
          <a href={images[currentImageIndex]} data-fancybox="gallery">
          {selectedData && <img src={images[currentImageIndex]} alt="" />}
          </a>
            <div class="image-buttons">
              {" "}
              <button onClick={prevImage}>
                {" "}
                <i className="fas fa-arrow-left"></i>
              </button>
              <button onClick={nextImage}>
                {" "}
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
          <form action="">
            <h3>Registration Form</h3>
            {selectedData && (
              <>
                <div class="form-wrapper">
                  <input
                    type="text"
                    placeholder={selectedData.username}
                    class="form-control"
                    readOnly
                  />
                  <i class="fa fa-user" style={{ "font-size": "14px" }}></i>
                </div>
                <div class="form-wrapper">
                  <input
                    type="text"
                    placeholder={selectedData.fullname}
                    class="form-control"
                    readOnly
                  />
                  <i
                    class="fas fa-motorcycle"
                    style={{ "font-size": "14px" }}
                  ></i>
                </div>

                <div class="form-wrapper">
                  <input
                    type="text"
                    placeholder={selectedData.email}
                    class="form-control"
                    readOnly
                  />
                  <i
                    class="fas fa-motorcycle"
                    style={{ "font-size": "14px" }}
                  ></i>
                </div>

                <div class="form-wrapper">
                  <input
                    type="text"
                    placeholder={selectedData.phone}
                    class="form-control"
                    readOnly
                  />
                  <i
                    class="fas fa-envelope"
                    style={{ "font-size": "14px" }}
                  ></i>
                </div>

                <div class="form-wrapper">
                  <input
                    type="text"
                    placeholder={
                      selectedData.accountstatus
                        ? "Fully verified"
                        : "Not verified"
                    }
                    class="form-control"
                    readOnly
                  />
                  <i style={{ "font-size": "14px" }}>₹</i>
                </div>

                <div class="form-wrapper">
                  <i class="fas fa-map-marker" aria-hidden="true"></i>
                  <textarea
                    rows={4}
                    cols={50}
                    placeholder={selectedData.address}
                    class="form-control"
                    readOnly
                  />
                </div>

                <div class="form-button">
                  <button onClick={() => makeUserAdmin(selectedData._id)}>
                    Make Admin
                    <i class="fa fa-check" style={{ "font-size": "14px" }}></i>
                  </button>
                  <button onClick={() => deleteUser(selectedData._id)}>
                    Delete User
                    <i class="fas fa-times" style={{ "font-size": "14px" }}></i>
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
