import React from "react";
import "./dashboard.css";
import Navbar2 from "./navbar2";
import { useRef, useState, useEffect } from "react";
import { verifySchema } from "./schemas/validationverify.js";

function Dashboard() {
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState(null);
  const [bikeData, setBikeData] = useState(null);
  const [rentData, setRentData] = useState(null);

  useEffect(() => {
    // Fetch user data from the backend
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/v1/users/fetchUserData");
        if (response.ok) {
          const data = await response.json();
          const user = data.data;
          setUserData(user);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
    blockindDocIfTrue();
  }, []);

  useEffect(() => {
    // Fetch user data from the backend
    const fetchRentData = async () => {
      try {
        const response = await fetch("/api/v1/users/rent-data");
        if (response.ok) {
          const data = await response.json();
          const rent = data.data;
          setRentData(rent);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchRentData();
  }, []);

  useEffect(() => {
    // Fetch user data from the backend
    const fetchBikeData = async () => {
      try {
        const response = await fetch("/api/v1/users/fetch-bike-details");
        if (response.ok) {
          const data = await response.json();
          const bike = data.data;
          setBikeData(bike);
        } else {
          console.error("Failed to fetch bike data");
        }
      } catch (error) {
        console.error("Error fetching bike data:", error);
      }
    };

    fetchBikeData();
  }, []);

  const handleErrors = async (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const updatedErrors = { ...errors };

    try {
      await verifySchema.validateAt(name, { [name]: value });
      // If validation succeeds, clear the error for the current field
      delete updatedErrors[name];
    } catch (error) {
      // If validation fails, update the error for the current field
      updatedErrors[name] = error.message;
    }
    setErrors(updatedErrors);
  };

  const handleChange = async (event) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    try {
      const response = await fetch("/api/v1/users/verify-document", {
        method: "POST",
        body: data,
      });
      event.target.reset();
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log("error while listing", error);
    }
  };

  const divRefs = useRef([]);
  const scrollToNextDiv = () => {
    // Find the index of the currently visible div
    const currentIndex = divRefs.current.findIndex(
      (div) => div.getBoundingClientRect().top > 0
    );
    // Calculate the index of the next div
    const nextIndex = (currentIndex + 1) % divRefs.current.length;
    // Scroll to the next div
    divRefs.current[nextIndex].scrollIntoView({ behavior: "smooth" });
  };

  const renderTableData = () => {
    return (
      bikeData &&
      bikeData.map((user, index) =>
        user.bikeslisted.map((bike, bikeIndex) => {
          // Parse the date strings into Date objects
          const fromDate = new Date(bike.availablefromdate);
          const toDate = new Date(bike.availabletodate);

          // Format the date strings
          const formattedFromDate = fromDate.toLocaleDateString();
          const formattedToDate = toDate.toLocaleDateString();

          let status;
          let statusColor;
          switch (bike.status) {
            case "0":
              status = "Pending";
              statusColor = "orange";
              break;
            case "1":
              status = "Approved";
              statusColor = "green";
              break;
            case "2":
              status = "Rejected";
              statusColor = "red";
              break;
            default:
              status = "Unknown Status";
              break;
          }

          return (
            <tr key={index}>
              <td>{bike.bikenamemodel}</td>
              <td>{bike.location}</td>
              <td>
                From: {formattedFromDate}
                <br />
                To: {formattedToDate}
              </td>
              <td style={{ color: statusColor }}>{status}</td>
            </tr>
          );
        })
      )
    );
  };

  const renderRentTableData=(rentData)=>{
    return rentData && rentData.map((rent, index) => {
      // Parse the date strings into Date objects
      const fromDate = new Date(rent.pickupDate);
      const toDate = new Date(rent.dropDate);

      // Format the date strings
      const formattedFromDate = fromDate.toLocaleDateString();
      const formattedToDate = toDate.toLocaleDateString()
      let status;
      let statusColor;
      if(rent.rentstatus==="1"){
        status="Lister"
        statusColor = "green"
      }else{
        status="Renter"
        statusColor = "red"
      }
      
      return (
        <tr key={index}> 
        <td>{rent.renterlocation}</td>     
          <td>{rent.rentamount}</td>
          <td>
            From: {formattedFromDate}
            <br />
            To: {formattedToDate}
          </td>
          <td style={{ color: statusColor }}>{status}</td>
        </tr>
      );
    });
  }

  const [showContactUs, setShowContactUs] = useState(false);

  const handleClickEdit = () => {
    setShowContactUs(!showContactUs);
    if (!showContactUs) {
      window.scrollTo(0, 0); // Scroll to the top of the page
    }
  };
  const handleCloseContact = () => {
    setShowContactUs(false);
  };

  const blockindDocIfTrue = async () => {
    const response = await fetch("/api/v1/users/checkstatus");
    const data = await response.json();
    if (data.data) {
      document.querySelector("#avatar").disabled = true;
      document.querySelector("#license").disabled = true;
      document.querySelector("#rcbook").disabled = true;
      document.querySelector("#address").disabled = true;
      const submitBtn = document.querySelector("#blockingSubmit");
      submitBtn.disabled = true;
      submitBtn.addEventListener("mouseover", () => {
        submitBtn.style.cursor = "not-allowed";
      });
      submitBtn.addEventListener("mouseout", () => {
        submitBtn.style.cursor = "auto";
      });
    }
  };

  const handleUsername = async (event) => {
    event.preventDefault();
    const form = event.target;
    const username = form.elements["username"].value.trim();
    if (!username) {
      alert("Please enter a new Username"); // Display an alert if the username is empty
      return;
    }
    const requestBody = {
      username: username,
    };
    try {
      const response = await fetch("/api/v1/users/update-username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify that the request contains JSON data
        },
        body: JSON.stringify(requestBody), // Convert the JavaScript object to JSON string
      });
      event.target.reset();
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log("error while updating", error);
    }
  };

  const handleUseraddress = async (event) => {
    event.preventDefault();
    const form = event.target;
    const address = form.elements["address"].value.trim();
    if (!address) {
      alert("Please enter a new Username"); // Display an alert if the username is empty
      return;
    }
    const requestBody = {
      address: address,
    };
    try {
      const response = await fetch("/api/v1/users/update-address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify that the request contains JSON data
        },
        body: JSON.stringify(requestBody), // Convert the JavaScript object to JSON string
      });
      event.target.reset();
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log("error while updating", error);
    }
  };

  const handleUserphoto = async (event) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    try {
      const response = await fetch("/api/v1/users/update-avatar", {
        method: "POST",
        body: data,
      });
      event.target.reset();
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log("error while listing", error);
    }
  };

  return (
    <div class="dashboard">
      {/* <Navbar2 /> */}
      {userData && <Navbar2 username={userData.username} />}

      <div className={`container text-center ${showContactUs ? "blur" : ""}`}>
        <div class="row align-items-start">
          <div class="col">
            <div class="box1 box">
              <div class="content">
                <div class="image">
                  {userData && userData?.account?.avatar ? (
                    <img src={userData.account.avatar} alt="Profile_Image" />
                  ) : (
                    <img
                      src="https://i.postimg.cc/bryMmCQB/profile-image.jpg"
                      alt="Dummy Profile_Image"
                    />
                  )}
                </div>

                <div class="text">
                  <h2 class="name">{userData && userData.fullname}</h2>
                  <h2 class="job_title">{userData && userData.username}</h2>
                  <p class="job_discription">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Magnam atque, ipsam a amet laboriosam eligendi.
                  </p>
                </div>
                <hr />

                <div class="rating">
                  <div class="stars">
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                  </div>
                  <div class="star-detail">
                    <p>(380)</p>
                  </div>
                </div>

                <hr />

                <div class="last-seen">
                  <h5>Last Seen</h5>
                  <p>Today</p>
                </div>

                <hr />

                <div class="button">
                  <div>
                    <button
                      class="message"
                      type="button"
                      href="#verify-doc"
                      onClick={scrollToNextDiv}
                    >
                      Verify
                    </button>
                  </div>
                  <div>
                    <button
                      class="connect"
                      type="button"
                      onClick={handleClickEdit}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <br />
            <br />

            <div
              class="box1 box"
              id="verify-doc"
              ref={(el) => (divRefs.current[0] = el)}
            >
              <div class="content">
                <div class="text">
                  <h2 class="name">Verify Documents</h2>
                </div>
                <hr />

                <form
                  onSubmit={handleChange}
                  method="post"
                  enctype="multipart/form-data"
                >
                  <label for="avatar">Upload Profile Picture</label>
                  <input type="file" id="avatar" name="avatar" />

                  {/* <label for="">Verify Phone-No</label>
      <input type="number" placeholder='Phone-No'/> */}

                  <hr />

                  <label for="license">Submit License</label>
                  <input type="file" id="license" name="license" />

                  <hr />
                  <label for="rcbook">Submit RC-Book</label>
                  <input type="file" id="rcbook" name="rcbook" />

                  <hr />
                  <label for="address">Enter Address</label>
                  <textarea
                    class="form-control form-group"
                    name="address"
                    onChange={handleErrors}
                    placeholder="Address"
                    id="address"
                  ></textarea>
                  {errors.address && <p>{errors.address}</p>}
                  <br />
                  <button type="submit" class="login-btn" id="blockingSubmit">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div class="col dashboard-col2 ">
            <div class="dashboard-details">
              <h1>Listed</h1>

              <table id="myTable">
                <thead>
                  <tr>
                    <th scope="col">Bike Name</th>
                    <th scope="col">Zipcode</th>
                    <th scope="col">Availability</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>{renderTableData()}</tbody>
              </table>
            </div>

            <div class="dashboard-details">
              <h1>Ride Details</h1>

              <table>
                <thead>
                  <tr>
                    
                    <th scope="col">Location</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Availability</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {renderRentTableData(rentData)}
                </tbody>
              </table>
            </div>

            <div class="dashboard-details">
              <h1>Iventory Purchases</h1>

              <table>
                <thead>
                  <tr>
                    <th scope="col">Account</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Period</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td data-label="Account">Visa - 3412</td>
                    <td data-label="Due Date">04/01/2016</td>
                    <td data-label="Amount">$1,190</td>
                    <td data-label="Period">03/01/2016 - 03/31/2016</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <section
        class="contact_us"
        style={{ display: showContactUs ? "block" : "none" }}
      >
        <div class="container">
          <div class="row">
            <div class="col-md-10 offset-md-1">
              <div class="contact_inner">
                <div class="row">
                  <div class="col-md-10">
                    <div class="contact_form_inner">
                      <div class="contact_field">
                        <h3>Update Details</h3>
                        <p>
                          Feel Free to contact us any time. We will get back to
                          you as soon as we can!.
                        </p>

                        <form
                          onSubmit={handleUsername}
                          method="post"
                          enctype="multipart/form-data"
                        >
                          <label for="username">Username</label>

                          <div style={{ display: "flex" }}>
                            <input
                              type="text"
                              id="username"
                              name="username"
                              placeholder={userData && userData.username}
                            />
                            <button type="submit">
                              <i class="far fa-check-circle"></i>
                            </button>
                          </div>
                        </form>

                        <hr />
                        <form
                          onSubmit={handleUserphoto}
                          method="post"
                          enctype="multipart/form-data"
                        >
                          <label for="avatar">Upload Profile Picture</label>
                          <div style={{ display: "flex" }}>
                            <input type="file" id="avatar" name="avatar" />
                            <button type="submit">
                              <i class="far fa-check-circle"></i>
                            </button>
                          </div>
                        </form>

                        <hr />
                        <form
                          onSubmit={handleUseraddress}
                          method="post"
                          enctype="multipart/form-data"
                        >
                          <label for="address">Enter Address</label>
                          <div style={{ display: "flex" }}>
                            <textarea
                              class="form-control form-group"
                              placeholder="Address"
                              id="address"
                              name="address"
                            />{" "}
                            <button type="submit">
                              <i class="far fa-check-circle"></i>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <button
                      className="close-button"
                      onClick={handleCloseContact}
                    >
                      <i class="far fa-window-close"></i>
                    </button>

                    <div class="right_conatct_social_icon d-flex align-items-end">
                      <div class="socil_item_inner d-flex">
                        <li>
                          <a href="/">
                            <i class="fab fa-facebook-square"></i>
                          </a>
                        </li>
                        <li>
                          <a href="/">
                            <i class="fab fa-instagram"></i>
                          </a>
                        </li>
                        <li>
                          <a href="/">
                            <i class="fab fa-twitter"></i>
                          </a>
                        </li>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="contact_info_sec">
                  <h4>Contact Info</h4>
                  <div class="d-flex info_single align-items-center">
                    <i class="fas fa-headset"></i>
                    <span>+91 {userData && userData.phone}</span>
                  </div>
                  <div class="d-flex info_single align-items-center">
                    <i class="fas fa-envelope-open-text"></i>
                    <span>{userData && userData.email}</span>
                  </div>
                  <div class="d-flex info_single align-items-center">
                    <i class="fas fa-map-marked-alt"></i>
                    <span>{userData && userData.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
