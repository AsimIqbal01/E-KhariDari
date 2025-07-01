import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { Select } from "antd";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../context/auth";

const { Option } = Select;

const AdminOrders = () => {
  const [statusValues] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  // Fetch all orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`,
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

  // Update order status
  const handleChangeStatus = async (orderId, value) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        { status: value },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title="Admin Orders">
      <div className="container py-4">
        <h2 className="text-center mb-5 fw-bold">📦 Admin - Manage Orders</h2>

        {orders.length === 0 ? (
          <h5 className="text-center text-muted">No orders found.</h5>
        ) : (
          orders.map((order, index) => (
            <div
              className="card mb-4 shadow-sm border-0"
              key={order._id || index}
            >
              <div className="card-body">
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                  <div className="mb-3">
                    <h5 className="card-title">Order #{index + 1}</h5>
                    <p className="text-muted mb-1">
                      Placed:{" "}
                      {moment(order?.createdAt).format("MMMM Do YYYY, h:mm A")}
                    </p>
                    <p className="mb-1">
                      <strong>Buyer:</strong> {order?.buyer?.name}
                    </p>
                    <p className="mb-1">
                      <strong>Items:</strong> {order?.products?.length}
                    </p>
                  </div>

                  <div className="text-end mb-3">
                    <div className="mb-2">
                      <Select
                        bordered={false}
                        onChange={(value) =>
                          handleChangeStatus(order._id, value)
                        }
                        defaultValue={order?.status}
                        style={{ width: 160 }}
                      >
                        {statusValues.map((s, i) => (
                          <Option key={i} value={s}>
                            {s}
                          </Option>
                        ))}
                      </Select>
                    </div>
                    <span
                      className={`badge rounded-pill bg-${
                        order?.payment?.success ? "success" : "danger"
                      }`}
                    >
                      {order?.payment?.success ? "Paid" : "Payment Failed"}
                    </span>
                  </div>
                </div>

                <div className="row mt-3">
                  {order?.products?.map((p) => (
                    <div className="col-md-4 mb-3" key={p._id}>
                      <div className="card h-100 border-0 shadow-sm">
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          style={{ height: "180px", objectFit: "cover" }}
                        />
                        <div className="card-body">
                          <h6 className="card-title">{p.name}</h6>
                          <p className="card-text text-muted">
                            {p.description?.substring(0, 50)}...
                          </p>
                          <p className="fw-semibold text-primary mb-0">
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

export default AdminOrders;
