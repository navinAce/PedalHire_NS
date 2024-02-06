import "./list.css";
import background from "./img/img2.jpg";

const List = () => {
  const myStyle = {
    backgroundImage: `url(${background})`,
  };

  return (
    <div class="list" style={myStyle}>
      <div class="overlay" style={{ zIndex: "0" }}></div>

      <div class="form-content">
        <form>
          <h2>List Your Ride</h2>
          <p>PedalHire lets you make money renting out your Bike</p>
          <div class="form-section">
            <div class="form-wrapper">
              <div class="input-container">
                <div class="form-group">
                  <label for="bike-name">Bike Name</label>
                  <input type="text" id="bike-name" autocomplete="off" />
                </div>
                <div class="form-group">
                  <label for="bike-no">Bike Number</label>
                  <input type="text" id="bike-no" />
                </div>
              </div>
              <div class="input-container">
                <div class="form-group">
                  <label for="bike-pic">Bike Photo</label>
                  <input type="file" id="bike-pic" autocomplete="off" />
                </div>
                <div class="form-group">
                  <label for="will-del">Willing To Deliver</label>
                  <label>
                    <input
                      type="radio"
                      id="will-del"
                      autocomplete="off"
                      value="Yes"
                    />{" "}
                    Yes{" "}
                  </label>
                  <label>
                    <input
                      type="radio"
                      id="will-del"
                      autocomplete="off"
                      value="Yes"
                    />{" "}
                    No{" "}
                  </label>
                </div>
              </div>
            </div>

            <div class="line"></div>

            <div class="form-wrapper">
              <div class="input-container">
                <div class="form-group">
                  <label for="price/day">Price / Day (in ₹)</label>
                  <input type="number" id="price-day" autocomplete="off" />
                </div>
                <div class="form-group">
                  <label for="price/week">Price / Week (in ₹)</label>
                  <input type="number" id="price-week" />
                </div>
              </div>
              <div class="input-container">
                <div class="form-group">
                  <label for="pickup-location">Pickup & Drop Point</label>
                  <input type="" id="pickup-loc" autocomplete="off" />
                </div>
                <div class="form-group">
                  <label for="drop-location">Availability</label>
                  <label for="drop-location">
                    From <input type="date" id="pick-date" placeholder="from" />{" "}
                  </label>

                  <label for="drop-location">
                    To <input type="date" id="drop-date" placeholder="to" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div class="form-content-2">
          <div class="fc2-content">
            <h3>Listing is Totally Free</h3>
            <p>
              It is completely free to list your ride on Spinlister. We only
              make money when you make a purchase from our inventory.
            </p>
          </div>
          <div class="fc2-content">
            <h3>Verification Tools</h3>
            <p>
              Spinlister gives renters simple Facebook, Twitter, Mobile, and
              Credit Card verification to ensure you are only renting to
              trustworthy renters.
            </p>
          </div>
          <div class="fc2-content">
            <h3>Your Ride, Your Schedule</h3>
            <p>
              You can accept or decline rental requests if you are busy or you
              can't make the rental work. No sweat! Just be sure to decline so
              your response rate doesn't drop.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
