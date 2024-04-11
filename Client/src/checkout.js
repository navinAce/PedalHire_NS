import "./checkout.css";

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Checkout() {
  const location = useLocation();
  const [bikeDetails, setBikeDetails] = useState(null);
  const [pickupDate, setPickupDate] = useState(null);
  const [dropDate, setDropDate] = useState(null);
  const [totalCost, setTotalCost] = useState(null);
  const [weeks, setWeeks] = useState(null);
  const [days, setDays] = useState(null);
  const [bikeId, setBikeId] = useState(null);
  const [userData, setUserData] = useState(null);

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
  }, []);

  const confirmPlaceOrder =async (bikeId,pickupDate,dropDate,totalCost,location) => {
    const shouldLogout = window.confirm("Are you sure you want to log out?");
    if (!shouldLogout) {
      return;
    }
    try {
      const response =await fetch(`/api/v1/users/${bikeId}/${pickupDate}/${dropDate}/${totalCost}/${location}/updateisbooked`, {
        method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error('Failed to place order');
        }
        const data = await response.json();
        console.log(data);
        window.location.href = "/";
      
    } catch (error) {
      console.log('Error placing order:', error);
      
    }
    

    // Redirect the user to the payout page
  };

  useEffect(() => {
    // Extract bikeId from the URL query parameters
    const params = new URLSearchParams(location.search);
    const bikeId = params.get('bikeId');
    setBikeId(bikeId);
    const pickupDateParam = params.get('pickupDate');
    const dropDateParam = params.get('dropDate');
    
    if (bikeId && pickupDateParam && dropDateParam) {
      const pickup = new Date(pickupDateParam);
      const drop = new Date(dropDateParam);
      setPickupDate(pickup);
      setDropDate(drop);
      fetchBikeDetails(bikeId, pickup, drop);
    }
  }, [location]);

  const fetchBikeDetails = async (bikeId,pickup, drop) => {
    try {
      const response = await fetch(`/api/v1/users/fetch-bike-details/${bikeId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch bike details');
      }
      const bikeDetails = await response.json();
      setBikeDetails(bikeDetails.data);
      const daysDifference = Math.ceil((drop - pickup) / (1000 * 3600 * 24));
      const weeks = Math.floor(daysDifference / 7);
      setWeeks(weeks);
      const days = daysDifference % 7;
      setDays(days);

      const totalCost = (weeks * bikeDetails.data.priceperweek) + (days * bikeDetails.data.priceperday);
      setTotalCost(totalCost);
    } catch (error) {
      // Handle errors
      console.error('Error fetching bike details:', error);
    }
  };
  
  const handleCloseContact = () => {
    window.location.href = "/api/v1/users/searchedbike";
  };

  return (
    
    <div class="checkout">
      <div class="checkout-body">
        <div class="row">

        
          <div class="col-8">
            <div class="checkout-payment">
              <div class="d-flex justify-content-between">
                <h1>Checkout</h1>
                <h1>
                  <span class="material-symbols-outlined">person</span> {userData && userData.username}
                </h1>
              </div>

              <div class="checkout-payment-start">
                <p>Payment Methods</p>

                <div class="checkout-payment-card d-flex">
                  <input type="radio" name="color" value="red" />
                  <span class="material-symbols-outlined"><i class="fa-brands fa-google-pay"></i></span>
                  <h5>Online Transaction</h5>
                </div>

                <div class="checkout-payment-card d-flex">
                  <input type="radio" name="color" value="red" />
                  <span class="material-symbols-outlined">
payments
</span><h5>Cash On Delivery</h5>
                </div>

                
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="checkout-product">
              <div class="d-flex justify-content-between">
                <h1>Order Summary</h1>
                <h1>
                  <button onClick={handleCloseContact}><span class="material-symbols-outlined">close</span></button>
                  
                </h1>
              </div>
              <div class="d-flex">
                <img src={bikeDetails && bikeDetails.bikephoto.photo1} />
                <div class="checkout-product-name">
                  <h2>{bikeDetails && bikeDetails.bikenamemodel}</h2>
                  <h3>₹ {bikeDetails && bikeDetails.priceperday}</h3>
                </div>
              </div>

              <div class="checkout-product-price">
              <div class="d-flex justify-content-between">
                  <h3>Pickup Date: </h3>
                  <h3>{pickupDate && pickupDate.toLocaleDateString()}</h3>
                </div>
                <div class="d-flex justify-content-between">
                  <h3>Drop Date: </h3>
                  <h3>{dropDate && dropDate.toLocaleDateString()}</h3>
                </div>
                <div class="d-flex justify-content-between">
                  <h3>₹ Price per weak: </h3>
                  <h3>{weeks && weeks} X {bikeDetails && bikeDetails.priceperweek}</h3>
                </div>
                <div class="d-flex justify-content-between">
                  <h3>₹ Price per days: </h3>
                  <h3>{days && days} X {bikeDetails && bikeDetails.priceperday}</h3>
                </div>
                <hr />
                <div class="d-flex justify-content-between">
                  <h4>Total</h4>
                  <h4>₹ {totalCost}</h4>
                </div>

                <p class="gradient-p">
                  <i class="fa fa-gg-circle" aria-hidden="true"></i> Earn{" "}
                  <b>₹199.95</b> discount in next order.
                </p>
                <p>
                  By clicking "Place Order" below, I represent that I am over 18
                  and an authorized user of this payment method, I agree to the
                  End User License Agreement.
                </p>
                
                <button onClick={() => confirmPlaceOrder(bikeId, pickupDate, dropDate,totalCost,bikeDetails.location)}>Place Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
