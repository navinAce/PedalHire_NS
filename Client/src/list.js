import "./list.css";
import background from "./img/img2.jpg";
import React, { useState } from "react";
import { listARideSchema } from "./schemas/validationlistaride.js";
import { useNavigate } from "react-router-dom";
import {Calendarto} from "./calenderlist.js";
import {Calendarfrom} from "./calenderfrom.js";
const List = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const myStyle = {
    backgroundImage: `url(${background})`,
  };

  const handleErrors = async (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const updatedErrors = { ...errors };

    try {
      await listARideSchema.validateAt(name, { [name]: value });
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
      const response = await fetch("/api/v1/users/bikedetails", {
        method: "POST",
        body: data,
      });
      event.target.reset();
      navigate("/api/v1/users/login");
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log("error while listing", error);
    }
  };

  const [divVisible, setDivVisible] = useState(Array(2).fill(false)); // Initialize state for two icons

  const handleMouseEnter = (index) => {
    setDivVisible((prevDivVisible) => {
      const newDivVisible = [...prevDivVisible];
      newDivVisible[index] = true; // Set the corresponding div's visibility to true
      return newDivVisible;
    });
  };

  const handleMouseLeave = (index) => {
    setDivVisible((prevDivVisible) => {
      const newDivVisible = [...prevDivVisible];
      newDivVisible[index] = false; // Set the corresponding div's visibility to false
      return newDivVisible;
    });
  };


  return (
    <div class="list" style={myStyle}>
      <div class="overlay" style={{ zIndex: "0" }}></div>

      <div class="form-content">
        <form
          onSubmit={handleChange}
          method="post"
          enctype="multipart/form-data"
        >
          <h2>List Your Ride</h2>
          <p>PedalHire lets you make money renting out your Bike</p>
          <div class="form-section">
            <div class="form-wrapper">
              <div class="input-container">
                <div class="form-group">
                  <label for="bikenamemodel">Bike Name</label>
                  <input
                    type="text"
                    id="bikenamemodel"
                    name="bikenamemodel"
                    autocomplete="off"
                    onChange={handleErrors}
                  />

                  {errors.bikenamemodel && <p>{errors.bikenamemodel}</p>}
                </div>
                <div class="form-group">
                {divVisible[0] && <div class="information-icon">XY88XY8888</div>}
                 
                  <label for="bikenumber">Bike Number
                  <svg onMouseEnter={() => handleMouseEnter(0)} onMouseLeave={() => handleMouseLeave(0)}
                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
                   </label>
                    <input type="text"
                    id="bikenumber"
                    name="bikenumber"
                    onChange={handleErrors}
                  />
                  {errors.bikenumber && <p>{errors.bikenumber}</p>}
                </div>
              </div>
              <div class="input-container radio-container">
                <div class="form-group">
                {divVisible[1] && <div class="information-icon">2 Photos Compulsory</div>}
                  <label for="bikephoto">Bike Photo
                  <svg onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={() => handleMouseLeave(1)}
                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
                   </label>
                  <input
                    type="file"
                    id="bikephoto"
                    name="bikephoto"
                    autocomplete="off"
                    multiple
                    onChange={handleErrors}
                  />
                </div>
                <div class="form-group radio-container">
                  <label for="willing-to-deliver">Willing To Deliver</label>
                  <div class="form-radio">
                  <label for="willing-to-deliver-yes" class="radio-label">
                    Yes
                  </label>
                  <input
                    type="radio"
                    id="willing-to-deliver-yes"
                    name="willingtodeliver"
                    value="Yes"
                    onChange={handleErrors}
                  />
                  </div>
                  <div class="form-radio">
                  <label for="willing-to-deliver-no" class="radio-label">
                    No
                  </label>
                  <input
                    type="radio"
                    id="willing-to-deliver-no"
                    name="willingtodeliver"
                    value="No"
                    onChange={handleErrors}
                  />
                  </div>
                  {errors.willingtodeliver && <p>{errors.willingtodeliver}</p>}
                </div>
              </div>
            </div>

            <div class="line"></div>

            <div class="form-wrapper">
              <div class="input-container">
                <div class="form-group">
                  <label for="priceperday">Price / Day (in ₹)</label>
                  <input
                    type="text"
                    name="priceperday"
                    id="priceperday"
                    autocomplete="off"
                    onChange={handleErrors}
                  />
                  {errors.priceperday && <p>{errors.priceperday}</p>}
                </div>
                <div class="form-group">
                  <label for="priceperweek">Price / Week (in ₹)</label>
                  <input
                    type="text"
                    id="priceperweek"
                    name="priceperweek"
                    onChange={handleErrors}
                  />
                  {errors.priceperweek && <p>{errors.priceperweek}</p>}
                </div>
              </div>
              <div class="input-container">
                <div class="form-group">
                  <label for="location">Pickup & Drop Point</label>
                  <input
                    type=""
                    id="location"
                    name="location"
                    autocomplete="off"
                    onChange={handleErrors}
                  />
                  {errors.location && <p>{errors.location}</p>}
                </div>
                <div class="form-group form-date">
                  <label for="availablefromdate">Availability</label>
                  <label for="drop-location">
                    From{" "}
                    <Calendarfrom id="availablefromdate" onChange={handleErrors} />{" "}
                    {errors.availablefromdate && (
                      <p>{errors.availablefromdate}</p>
                    )}
                  </label>

                  <label for="availabletodate">
                    To{" "}
                    <Calendarto id="availabletodate" onChange={handleErrors} />
                    {errors.availabletodate && <p>{errors.availabletodate}</p>}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" class="login-btn">
            Sign up
          </button>
        </form>

        <div class="form-content-2">
          <div class="fc2-content">
            <h3>Listing is Totally Free</h3>
            <p>
              It is completely free to list your ride on PedalHire. We only
              make money when you make a purchase from our inventory.
            </p>
          </div>
          <div class="fc2-content">
            <h3>Licence Verification: </h3>
            <p>
            Verify renters' identities by requesting a copy of their valid driver's licence. This helps ensure that renters are legally eligible to operate the rented vehicles.
            </p>
          </div>
          <div class="fc2-content">
            <h3>RC Book Verification: </h3>
            <p>
            Validate the ownership of vehicles by requesting the Registration Certificate (RC Book) from renters. This ensures that the vehicles being rented are legally owned and can be rented out.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
