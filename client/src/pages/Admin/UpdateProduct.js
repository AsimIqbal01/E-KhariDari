import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

  // Get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );

      const p = data?.product;

      if (!p) {
        toast.error("Product not found");
        return;
      }

      setName(p.name || "");
      setId(p._id || "");
      setDescription(p.description || "");
      setPrice(p.price || "");
      setQuantity(p.quantity || "");
      setCategory(p.category?._id || "");
      setShipping(p.shipping ? "1" : "0");
    } catch (err) {
      console.log(err);
      toast.error("Error fetching product details");
    }
  };

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data.category || []);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    getSingleProduct();
    getAllCategory();
  }, []);

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData
      );

      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message || "Update failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong during update");
    }
  };

  //   Handle Delete Product
  const handleDelete = async () => {
    try {
      const answer = window.prompt("Type 'yes' to confirm product deletion.");
      if (answer?.toLowerCase() !== "yes") {
        toast("Product deletion canceled");
        return;
      }

      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
      );
      toast.success("Product deleted successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Error while deleting product");
    }
  };

  return (
    <Layout title="Dashboard - Update Product">
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
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
            <h1>Update Product</h1>

            <Select
              variant="outlined" // Changed from deprecated `bordered` to `variant`
              placeholder="Select category"
              size="large"
              className="form-select mb-3"
              value={category || undefined} // prevent controlled/uncontrolled warning
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
                {photo ? photo.name : "Upload New Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>

            <div className="mb-3 text-center">
              {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product preview"
                  height={"200px"}
                />
              ) : (
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                  alt="product"
                  height={"200px"}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/no-image.png"; // fallback image if no photo
                  }}
                />
              )}
            </div>

            <div className="mb-3">
              <input
                type="text"
                value={name || ""}
                placeholder="Enter product name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <textarea
                value={description || ""}
                placeholder="Enter product description"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="number"
                value={price || ""}
                placeholder="Enter product price"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="number"
                value={quantity || ""}
                placeholder="Enter quantity"
                className="form-control"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <Select
                variant="outlined" // Changed deprecated prop here too
                placeholder="Select Shipping"
                size="large"
                className="form-select mb-3"
                value={shipping || undefined} // avoid controlled/uncontrolled warning
                onChange={(value) => setShipping(value)}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>

            <div className="mb-3">
              <button className="btn btn-dark" onClick={handleUpdate}>
                UPDATE PRODUCT
              </button>
            </div>
            <div className="mb-3">
              <button className="btn btn-dark" onClick={handleDelete}>
                DELETE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
