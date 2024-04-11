import AdminSidenav from "./adminesidenav";
import "./admindash.css";
import React, { useState, useEffect } from "react";
import './fancyboxconfig'

function AdminDash() {
  const [showContactUs, setShowContactUs] = useState(false);
  const [penBikeData, setPenBikeData] = useState(null);
  const [countData, setCountData] = useState(null);
  const [selectedData, setSelectedData] = useState(null); // State to store selected data
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch user data from the backend
    const fetchPenBikeData = async () => {
      try {
        const response = await fetch("/api/v1/admin/fetch-pending-bikes");
        if (response.ok) {
          const data = await response.json();
          const bike = data.data;
          setPenBikeData(bike);
          console.log("Bike data:", bike);
        } else {
          console.error("Failed to fetch bike data");
        }
      } catch (error) {
        console.error("Error fetching bike data:", error);
      }
    };

    fetchPenBikeData();
  }, []);

  useEffect(() => {
    if (selectedData) {
      const userPhotos = [
        selectedData.user.account.license,
        selectedData.user.account.rcbook,
      ];
      const bikePhotos = [
        selectedData.bike.bikephoto.photo1,
        selectedData.bike.bikephoto.photo2,
      ];
      setImages([...userPhotos, ...bikePhotos]);
    }
  }, [selectedData]);

  useEffect(() => {
    // Fetch user data from the backend
    const fetchCountData = async () => {
      try {
        const response = await fetch("/api/v1/admin/count-data");
        if (response.ok) {
          const data = await response.json();
          const countData = data.data;
          setCountData(countData);
          console.log("countData:", countData);
        } else {
          console.error("Failed to fetch total count data");
        }
      } catch (error) {
        console.error("Error fetching count data:", error);
      }
    };

    fetchCountData();
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to handle navigation to the previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleClickEdit = (userData, bikeData) => {
    setShowContactUs(true);
    setSelectedData({ user: userData, bike: bikeData });
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  const handleCloseContact = () => {
    setShowContactUs(false);
  };

  const renderTableData = () => {
    return (
      penBikeData &&
      penBikeData.map((bike, index) =>
        bike.userDetails.map((user, bikeIndex) => {
          const fromDate = new Date(bike.createdAt);
          const formattedFromDate = fromDate.toLocaleDateString();

          let status = bike.status === "0" ? "Pending" : "Approved";

          return (
            <tr
              key={`${index}-${bikeIndex}`}
              onClick={() => handleClickEdit(user, bike)}
            >
              <td>{user.username}</td>
              <td>{bike.bikenamemodel}</td>
              <td>From: {formattedFromDate}</td>
              <td style={{ color: "orange" }}>{status}</td>
            </tr>
          );
        })
      )
    );
  };

  const acceptBikes = async (id) => {
    try {
      const response = await fetch(`/api/v1/admin/${id}/approve-bikes`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        })
        if(response.ok){
          console.log("Bike Approved")
    }
    } catch (error) {
      console.log(error);
    }
  };

  const rejectBikes = async (id) => {
    try {
      const response = await fetch(`/api/v1/admin/${id}/reject-bikes`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        })
        if(response.ok){
          console.log("Bike rejected")
    }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="admindash">
      <div className={`row ${showContactUs ? "blur" : ""}`}>
        <div class="col-3">
          <AdminSidenav />
        </div>

        <div class="col-9">
          <h1>Admin Dashboard</h1>
          <hr />
          {countData && (
              <>
          <div class="detail-cards">
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
              <div class="card">
                <div class="card-body">
               
                  <h5 class="text-muted">Total Users</h5>
                  <div class="metric-value d-inline-block">
                    <h1 class="mb-1">{countData.users}</h1>
                  </div>
                  <div class="metric-label d-inline-block float-right text-success font-weight-bold">
                    <span>
                      <i class="fa fa-fw fa-arrow-up"></i>
                    </span>
                    <span>5.86%</span>
                  </div>
                </div>
                <div id="sparkline-revenue"></div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
              <div class="card">
                <div class="card-body">
                  <h5 class="text-muted">Total bikes</h5>
                  <div class="metric-value d-inline-block">
                    <h1 class="mb-1">{countData.bikes}</h1>
                  </div>
                  <div class="metric-label d-inline-block float-right text-success font-weight-bold">
                    <span>
                      <i class="fa fa-fw fa-arrow-up"></i>
                    </span>
                    <span>5.86%</span>
                  </div>
                </div>
                <div id="sparkline-revenue2"></div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
              <div class="card">
                <div class="card-body">
                  <h5 class="text-muted">Approved bikes</h5>
                  <div class="metric-value d-inline-block">
                    <h1 class="mb-1">{countData.approvedBike}</h1>
                  </div>
                  <div class="metric-label d-inline-block float-right text-primary font-weight-bold">
                    <span>3.20%</span>
                  </div>
                </div>
                <div id="sparkline-revenue3"></div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
              <div class="card">
                <div class="card-body">
                  <h5 class="text-muted">Rejected bikes</h5>
                  <div class="metric-value d-inline-block">
                    <h1 class="mb-1">{countData.rejectedBike}</h1>
                  </div>
                  <div class="metric-label d-inline-block float-right text-secondary font-weight-bold">
                    <span>-2.00%</span>
                  </div>
                </div>
                <div id="sparkline-revenue4"></div>
              </div>
            </div>
           
          </div>
          </>)}

          <h3>Ride Details</h3>
          <hr />
          <div class="dashboard-details">
            <table>
              <thead>
                <tr>
                  <th scope="col">Account</th>
                  <th scope="col">Due Date</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Period</th>
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
            {selectedData && <img src={images[currentImageIndex]} alt="Image Gallery"/>}
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
                <div className="form-wrapper">
                  <input
                    type="text"
                    placeholder={selectedData.user.username}
                    className="form-control"
                    readOnly
                  />
                  <i className="fa fa-user" style={{ fontSize: "14px" }}></i>
                </div>
                <div class="form-wrapper">
                  <input
                    type="text"
                    placeholder={selectedData.bike.bikenamemodel}
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
                    placeholder={selectedData.bike.bikenumber}
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
                    placeholder={
                      selectedData.bike.willingtodeliver ? "Yes" : "No"
                    }
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
                    placeholder={selectedData.bike.priceperday}
                    class="form-control"
                    readOnly
                  />
                  <i style={{ "font-size": "14px" }}>₹</i>
                </div>
                <div class="form-wrapper">
                  <input
                    type="text"
                    placeholder={selectedData.bike.priceperweek}
                    class="form-control"
                    readOnly
                  />
                  <i style={{ "font-size": "14px" }}>₹</i>
                </div>
                <div class="form-wrapper">
                  <input
                    type="text"
                    placeholder={selectedData.bike.location}
                    class="form-control"
                    readOnly
                  />
                  <i class="fas fa-map-marker" aria-hidden="true"></i>
                </div>
                <div class="form-button">
                  <button onClick={() => acceptBikes(selectedData.bike._id)}> 
                    Accept
                    <i class="fa fa-check" style={{ "font-size": "14px" }}></i>
                  </button>
                  <button onClick={() => rejectBikes(selectedData.bike._id)}>
                    Reject
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

export default AdminDash;
