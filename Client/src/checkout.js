import "./checkout.css";
import img1 from "./img/img4.jpg";

function Checkout() {
  return (
    <div class="checkout">
      <div class="checkout-body">
        <div class="row">
          <div class="col-8">
            <div class="checkout-payment">
              <div class="d-flex justify-content-between">
                <h1>Checkout</h1>
                <h1>
                  <span class="material-symbols-outlined">person</span> Navin096
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
                  <span class="material-symbols-outlined">close</span>
                </h1>
              </div>
              <div class="d-flex">
                <img src={img1} />
                <div class="checkout-product-name">
                  <h2>Continental GT650</h2>
                  <h3>$5000</h3>
                </div>
              </div>

              <div class="checkout-product-price">
                <div class="d-flex justify-content-between">
                  <h3>Price</h3>
                  <h3>$5000</h3>
                </div>
                <div class="d-flex justify-content-between">
                  <h3>(GST if applicable)</h3>
                  <h3>$0.00</h3>
                </div>
                <div class="d-flex justify-content-between">
                  <h3>(Discount applicable)</h3>
                  <h3>$0.00</h3>
                </div>
                <hr />
                <div class="d-flex justify-content-between">
                  <h4>Total</h4>
                  <h4>$5000</h4>
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
                <button>Place Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
