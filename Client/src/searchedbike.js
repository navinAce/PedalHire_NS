import Navbar2 from "./navbar2";
import "./searchedbike.css";
import React, { useState, useEffect } from "react";
import {Calendarfrom} from "./calenderfrom.js";
import {Calendarsearch} from "./calender.js";
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function SearchedBike() {
  const [appBikeData, setAppBikeData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState(null);
  const [showContactUs, setShowContactUs] = useState(false);
  const [selectedDropDate, setSelectedDropDate] = useState(null);
  const [selectedData, setSelectedData] = useState(null); // State to store selected data
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [pickupDate, setPickupDate] = useState(null);
  const [dropDate, setDropDate] = useState(null);
  const [bothDatesSelected, setBothDatesSelected] = useState(false);
  
  //const [placeOrder, setPlaceOrder] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handlePlaceOrder = (bikeId,pickupDate,dropDate) => {
    // Construct the URL for the payout page with the bike ID
    const payoutUrl = `/api/v1/users/checkout?bikeId=${bikeId}&pickupDate=${pickupDate}&dropDate=${dropDate}`;

    // Redirect the user to the payout page
    navigate(payoutUrl);
  };

  const handlePickupDateChange = (date) => {
    setPickupDate(date);
    if (date && dropDate) {
      setBothDatesSelected(true);
    } else {
      setBothDatesSelected(false);
    }
  };


  useEffect(() => {
    if (selectedData) {
      // const userPhotos = [
      //   selectedData.user.account.license,
      //   selectedData.user.account.rcbook,
      // ];
      const bikePhotos = [
        selectedData.bike.bikephoto.photo1,
        selectedData.bike.bikephoto.photo2,
      ];
      setImages([ ...bikePhotos]);
    }
  }, [selectedData]);



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

    fetchUserData()
  }, []);


  useEffect(() => {
    // Extract search query from URL when component mounts
    const params = new URLSearchParams(location.search);
    const query = params.get("q");
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchAppBikeData = async () => {
      try {
        const response = await fetch("/api/v1/users/search-bike");
        if (response.ok) {
          const data = await response.json();
          const bike = data.data;
          setAppBikeData(bike);
          console.log("Bike data:", bike);
        } else {
          console.error("Failed to fetch bike data");
        }
      } catch (error) {
        console.error("Error fetching bike data:", error);
      }
    };

    fetchAppBikeData();
  }, []);


  const handleDateChange = (date) => {
    setDropDate(date);
    setSelectedDropDate(date);
    if (pickupDate && date) {
      setBothDatesSelected(true);
    } else {
      setBothDatesSelected(false);
    }
  };
  const renderTableData = () => {
    const filteredUsers =
    appBikeData &&
    appBikeData.filter((bike) =>
        bike.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const dropDate = new Date(selectedDropDate);


        
    

  // Filter the results based on the drop date
  const filteredUsersWithDropDate =
    dropDate &&
    filteredUsers &&
    filteredUsers.filter((bike) => {
      const toDate = new Date(bike.availabletodate);
      return toDate >= dropDate;
    });
    return (
      filteredUsersWithDropDate &&
      filteredUsersWithDropDate.map((bike, index) =>
        bike.userDetails.map((user, bikeIndex) => {
          const fromDate = new Date(bike.availablefromdate);
          //const formattedFromDate = fromDate.toLocaleDateString();
          const toDate = new Date(bike.availabletodate);
          const formattedtoDate = toDate.toLocaleDateString();

          return (
            <div key={bike._id} className="product">
                <img src={bike.bikephoto.photo1} alt={bike.bikenamemodel} />
                <h2>{bike.bikenamemodel}</h2>
                <div class="Product-details">
                <div class="d-flex justify-content-between">
                  <h4>Pincode: </h4>  
                <p>{bike.location}</p>
                </div>
                <div class="d-flex justify-content-between">
                  <h4>Available Till: </h4>
                <p>{formattedtoDate}</p>
                </div>
                </div>
                <div class="d-flex justify-content-between pt-3">
                <h3>₹ {bike.priceperday} <p> /day</p></h3>
                  <button key={`${index}-${bikeIndex}`}
              onClick={() => handleClickEdit(user, bike)}>Book</button>
                </div>
                
              </div>    
          );
        })
      )
    );
  };
  

  return (
    <div class="searched-bike">

      {userData ? <Navbar2 username={userData.username} /> : <Navbar2 />}
     

      <div class="row bike-list" className={`row bike-list ${showContactUs ? "blur" : ""}`}>
        <div class="col-3">
          <div edit-options>
            <form>
              <div class="form-wrapper">
                <div class="input-container">
                  <div class="form-group">
                    <label for="location">Pickup & Drop Point</label>
                    <input
                      type=""
                      id="location"
                      name="location"
                      autocomplete="off"
                      value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div class="input-container">
                  <div class="form-group">
                    <label>Pickup Date</label>
                    <Calendarfrom onChange={handlePickupDateChange}/>
                  </div>
                </div>

                <div class="input-container">
                  <div class="form-group">
                    <label>Time</label>
                    <input
                      type="time"
                      required
                      step="3600"
                      autocomplete="off"
                    />
                  </div>
                </div>

                <div class="input-container">
                  <div class="form-group">
                    <label>Drop Date</label>
                    <Calendarsearch onDateChange={handleDateChange}/>
                  </div>
                </div>

                <div class="input-container">
                  <div class="form-group">
                    <label>Time</label>
                    <input type="time" autocomplete="off" />
                  </div>
                </div>
                <button type="submit">Search</button>
              </div>
            </form>
          </div>
        </div>
        <div class="col-9">
          <div className="product-list">
            {renderTableData()}
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
          
          <button onClick={prevImage}>
            
            <i className="fas fa-arrow-left"></i>
          </button>
          <button onClick={nextImage}>
            
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
           
          </div>
          <form action="">
            <h3>Bike details</h3>
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
                {bothDatesSelected ? (
                <button onClick={() => handlePlaceOrder(selectedData.bike._id, pickupDate, dropDate)}>
                  Place order
                </button>
              ) : (
                <p style={{color: "#d23b46"}}><strong>Please select both pickup and drop dates</strong></p>
              )}
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    



    </div>
  );
}

export default SearchedBike;
