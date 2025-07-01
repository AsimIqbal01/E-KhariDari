import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container py-4">
        <h2 className="text-center mb-5 fw-bold">🛒 Your Orders</h2>
        {orders.length === 0 ? (
          <h5 className="text-center text-muted">No orders yet.</h5>
        ) : (
          orders.map((order, index) => (
            <div
              className="card mb-4 shadow-sm border-0"
              key={order._id || index}
            >
              <div className="card-body">
                <div className="d-flex justify-content-between flex-wrap">
                  <div>
                    <h5 className="card-title mb-2">Order #{index + 1}</h5>
                    <p className="text-muted mb-1">
                      Placed: {moment(order?.createAt).format("MMMM Do YYYY")}
                    </p>
                  </div>
                  <div className="text-end">
                    <span
                      className={`badge rounded-pill bg-${
                        order?.status === "Delivered"
                          ? "success"
                          : order?.status === "Processing"
                          ? "warning"
                          : "secondary"
                      } me-2`}
                    >
                      {order?.status}
                    </span>
                    <span
                      className={`badge rounded-pill bg-${
                        order?.payment?.success ? "primary" : "danger"
                      }`}
                    >
                      {order?.payment?.success ? "Paid" : "Failed"}
                    </span>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="mb-1 fw-semibold">
                    Buyer:{" "}
                    <span className="text-dark">{order?.buyer?.name}</span>
                  </p>
                  <p className="mb-1 fw-semibold">
                    Products:{" "}
                    <span className="text-dark">{order?.products?.length}</span>
                  </p>
                </div>

                <div className="row mt-4">
                  {order?.products?.map((p) => (
                    <div className="col-md-4 mb-3" key={p._id}>
                      <div className="card h-100 border shadow-sm">
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          style={{ height: "180px", objectFit: "cover" }}
                        />
                        <div className="card-body">
                          <h6 className="card-title">{p.name}</h6>
                          <p className="card-text text-muted">
                            {p.description?.substring(0, 40)}...
                          </p>
                          <p className="fw-bold mb-0 text-primary">
                            Rs {p.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

export default Order;
