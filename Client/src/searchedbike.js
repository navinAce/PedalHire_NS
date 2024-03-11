import Navbar2 from "./navbar2";
import "./searchedbike.css";
import jsonData from "./data.json";

function SearchedBike() {
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
                    />
                  </div>
                </div>

                <div class="input-container">
                  <div class="form-group">
                    <label>Pickup Date</label>
                    <input type="date" autocomplete="off" />
                  </div>
                </div>

                <div class="input-container">
                  <div class="form-group">
                    <label>Time</label>
                    <input type="time" required step='3600' autocomplete="off" />
                  </div>
                </div>

                <div class="input-container">
                  <div class="form-group">
                    <label>Drop Date</label>
                    <input type="date" autocomplete="off" />
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
            {jsonData.products.map((product) => (
              <div key={product.id} className="product">
                <img src={product.image} alt={product.name} />
                <h2>{product.name}</h2>

               

                <div class="d-flex justify-content-between">
                  <p>${product.price}/day</p>
                  <button style={{ float: "right" }}>Book</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchedBike;
