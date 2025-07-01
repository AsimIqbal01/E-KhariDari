import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faTrash,
  faShoppingCart,
  faSpinner,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import toast from "react-hot-toast";
const CartPage = () => {
  const { cart, setCart } = useCart();
  const [auth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState({ token: false, payment: false });
  const [paymentError, setPaymentError] = useState(null);
  const navigate = useNavigate();

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error("Error parsing cart data:", error);
        localStorage.removeItem("cart");
        setCart([]);
      }
    }
  }, [setCart]);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cart]);

  // Total calculation
  const { totalPrice, totalItems } = cart.reduce(
    (acc, item) => ({
      totalPrice: acc.totalPrice + item.price * (item.quantity || 1),
      totalItems: acc.totalItems + (item.quantity || 1),
    }),
    { totalPrice: 0, totalItems: 0 }
  );

  // Quantity logic
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    toast.success("Item removed from cart");
  };

  // Get Braintree token
  const getToken = async () => {
    if (!auth?.token) return;
    setLoading((prev) => ({ ...prev, token: true }));
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`,
        {
          headers: { Authorization: auth.token },
        }
      );
      if (!data?.clientToken) throw new Error("Invalid token");
      setClientToken(data.clientToken);
    } catch (error) {
      console.error("Token Error:", error);
      setPaymentError("Failed to load payment gateway");
    } finally {
      setLoading((prev) => ({ ...prev, token: false }));
    }
  };

  // Handle payment
  const handlePayment = async () => {
    console.log("Clicked Pay");
    if (!instance) {
      toast.error("Payment gateway not ready");
      return;
    }

    setLoading((prev) => ({ ...prev, payment: true }));
    toast.loading("Processing your payment...", { id: "payment" });

    try {
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
          amount: totalPrice,
        },
        {
          headers: { Authorization: auth.token },
        }
      );

      if (!data?.success) {
        throw new Error(data?.message || "Payment failed");
      }

      toast.success("Payment successful!", { id: "payment" });
      localStorage.removeItem("cart");
      setCart([]);

      navigate("/dashboard/user/user-order", {
        state: {
          orderId: data.order._id,
          amount: data.order.payment.transaction.amount,
          products: cart,
        },
      });
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error.response?.data?.message || "Payment failed", {
        id: "payment",
      });
    } finally {
      setLoading((prev) => ({ ...prev, payment: false }));
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  return (
    <Layout title={`Your Cart (${totalItems})`}>
      <div className="container py-4">
        <h2 className="text-center mb-4">
          <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
          Your Shopping Cart
        </h2>

        {cart.length === 0 ? (
          <div className="text-center py-5">
            <FontAwesomeIcon
              icon={faShoppingCart}
              size="3x"
              className="text-muted mb-3"
            />
            <h4>Your cart is empty</h4>
            <button className="btn btn-dark mt-3" onClick={() => navigate("/")}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {/* Cart Items */}
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  {cart.map((item) => (
                    <div
                      key={item._id}
                      className="row g-3 mb-3 align-items-center"
                    >
                      <div className="col-md-3">
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${item._id}`}
                          className="img-fluid rounded"
                          alt={item.name}
                          style={{ height: "120px", objectFit: "contain" }}
                        />
                      </div>
                      <div className="col-md-5">
                        <h5>{item.name}</h5>
                        <p className="text-muted">
                          Rs {item.price.toLocaleString()}
                        </p>
                        {item.stock && (
                          <small
                            className={`d-block ${
                              item.stock < 5 ? "text-danger" : "text-success"
                            }`}
                          >
                            {item.stock < 5
                              ? `Only ${item.stock} left!`
                              : "In stock"}
                          </small>
                        )}
                      </div>
                      <div className="col-md-4">
                        <div className="d-flex align-items-center mb-2">
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() =>
                              updateQuantity(item._id, (item.quantity || 1) - 1)
                            }
                            disabled={(item.quantity || 1) <= 1}
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                          <span className="mx-2">{item.quantity || 1}</span>
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() =>
                              updateQuantity(item._id, (item.quantity || 1) + 1)
                            }
                            disabled={
                              item.stock && (item.quantity || 1) >= item.stock
                            }
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>
                        <button
                          className="btn btn-outline-danger btn-sm w-100"
                          onClick={() => removeFromCart(item._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} className="me-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="col-lg-4">
              <div className="card sticky-top" style={{ top: "20px" }}>
                <div className="card-body">
                  <h5 className="border-bottom pb-2">Order Summary</h5>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Items ({totalItems}):</span>
                    <span>Rs {totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Shipping:</span>
                    <span className="text-success">FREE</span>
                  </div>
                  <div className="d-flex justify-content-between fw-bold fs-5 border-top pt-2">
                    <span>Total:</span>
                    <span>Rs {totalPrice.toLocaleString()}</span>
                  </div>

                  <div className="d-grid gap-2 mt-3">
                    <button
                      className="btn btn-dark"
                      onClick={() => navigate("/checkout")}
                    >
                      Proceed to Checkout
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => navigate("/")}
                    >
                      Continue Shopping
                    </button>
                  </div>

                  {auth?.token && (
                    <div className="mt-4">
                      <h6 className="mb-3 border-bottom pb-2">
                        <FontAwesomeIcon icon={faCreditCard} className="me-2" />
                        Credit Card Payment
                      </h6>

                      {loading.token ? (
                        <div className="text-center py-3">
                          <FontAwesomeIcon icon={faSpinner} spin />
                          <span className="ms-2">
                            Loading payment gateway...
                          </span>
                        </div>
                      ) : clientToken ? (
                        <>
                          <DropIn
                            options={{
                              authorization: clientToken,
                              paypal: false,
                              venmo: false,
                              applePay: false,
                              googlePay: false,
                            }}
                            onInstance={(instance) => setInstance(instance)}
                            onError={(error) => {
                              console.error("DropIn error:", error);
                              setPaymentError("Payment gateway error");
                            }}
                          />

                          {paymentError && (
                            <div className="alert alert-danger mt-2">
                              {paymentError}
                            </div>
                          )}

                          <button
                            className="btn btn-success w-100 mt-3"
                            onClick={handlePayment}
                            disabled={!instance || loading.payment}
                          >
                            {loading.payment ? (
                              <>
                                <FontAwesomeIcon icon={faSpinner} spin />{" "}
                                Processing...
                              </>
                            ) : (
                              "Pay with Credit Card"
                            )}
                          </button>
                        </>
                      ) : (
                        <div className="alert alert-warning">
                          Payment gateway not available
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
