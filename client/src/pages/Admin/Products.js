import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";

const Products = () => {
  const [products, setProducts] = useState([]);

  //Getall Products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong While Getting Products");
    }
  };

  //Lifecycle Method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout title={"Products-Dashboard"}>
      <div className="container-fluid">
        <div className="row">
          {/* Admin Sidebar */}
          <div className="col-md-3 admin-card">
            <h2 className="admin-heading">Admin Panel</h2>
            <nav className="admin-nav">
              <NavLink
                to="/dashboard/admin/create-category"
                className={({ isActive }) =>
                  isActive ? "admin-link active-link" : "admin-link"
                }
              >
                Create Category
              </NavLink>
              <NavLink
                to="/dashboard/admin/create-product"
                className={({ isActive }) =>
                  isActive ? "admin-link active-link" : "admin-link"
                }
              >
                Create Products
              </NavLink>
              <NavLink
                to="/dashboard/admin/products"
                className={({ isActive }) =>
                  isActive ? "admin-link active-link" : "admin-link"
                }
              >
                Products
              </NavLink>
              <NavLink
                to="/dashboard/admin/admin-orders"
                className={({ isActive }) =>
                  isActive ? "admin-link active-link" : "admin-link"
                }
              >
                Orders
              </NavLink>
            </nav>
          </div>
          <div className="col-md-9 ">
            <h1 className="text-center">All Products</h1>
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/product/${p.slug}`}
                  className="product-link"
                >
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
