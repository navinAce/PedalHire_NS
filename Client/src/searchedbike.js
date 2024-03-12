import Navbar2 from "./navbar2";
import "./searchedbike.css";
import React, { useState, useEffect } from "react";
import {Calendarfrom} from "./calenderfrom.js";
import {Calendarto} from "./calender.js";
function SearchedBike() {
  const [appBikeData, setAppBikeData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch user data from the backend
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

  const renderTableData = () => {
    const filteredUsers =
    appBikeData &&
    appBikeData.filter((bike) =>
        bike.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return (
      filteredUsers &&
      filteredUsers.map((bike, index) =>
        bike.userDetails.map((user, bikeIndex) => {
          const fromDate = new Date(bike.availablefromdate);
          const formattedFromDate = fromDate.toLocaleDateString();
          const toDate = new Date(bike.availabletodate);
          const formattedtoDate = toDate.toLocaleDateString();

          return (
            <div key={bike._id} className="product">
                <img src={bike.bikephoto.photo1} alt={bike.bikenamemodel} />
                <h2>{bike.bikenamemodel}</h2>
                <p>{bike.location}</p>
                <p>{formattedFromDate}</p>
                <p>{formattedtoDate}</p>

                <div class="d-flex justify-content-between">
                  <p>${bike.priceperday}/day</p>
                  <button style={{ float: "right" }}>Book</button>
                </div>
              </div>
            
          );
        })
      )
    );
  };
  

  return (
    <div class="searched-bike">
      <Navbar2 />
      <div class="row bike-list">
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
                    <Calendarfrom />
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
                    <Calendarto />
                  </div>
                </div>

                <div class="input-container">
                  <div class="form-group">
                    <label>Time</label>
                    <input type="time" autocomplete="off" />
                  </div>
                </div>
                <button type="submit">Sign up</button>
              </div>
            </form>
          </div>
        </div>
        <div class="col-9">
          <div className="product-list">
            {/* {jsonData.products.map((product) => (
              <div key={product.id} className="product">
                <img src={product.image} alt={product.name} />
                <h2>{product.name}</h2>

                <div class="d-flex justify-content-between">
                  <p>${product.price}/day</p>
                  <button style={{ float: "right" }}>Book</button>
                </div>
              </div>
            ))} */}
            {renderTableData()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchedBike;
