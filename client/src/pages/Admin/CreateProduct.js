import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Create product
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData
      );

      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while creating the product");
    }
  };

  return (
    <Layout title="Dashboard - Create Products">
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

          {/* Product Form */}
          <div className="col-md-9 m-1 mt-4 w-50">
            <h1>Create Product</h1>
            <Select
              variant={false}
              placeholder="Select category"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => setCategory(value)}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>

            <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-12">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>

            {photo && (
              <div className="mb-3 text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product"
                  height={"200px"}
                  className="img img-responsive"
                />
              </div>
            )}

            <div className="mb-3">
              <input
                type="text"
                value={name}
                placeholder="Enter product name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <textarea
                value={description}
                placeholder="Enter product description"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="number"
                value={price}
                placeholder="Enter product price"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="number"
                value={quantity}
                placeholder="Enter quantity"
                className="form-control"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <Select
                variant="borderless"
                placeholder="Select Shipping"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setShipping(value)}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>

            <div className="mb-3">
              <button className="btn btn-dark" onClick={handleCreate}>
                CREATE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
