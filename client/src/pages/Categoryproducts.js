import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; // ✅ correct import for Swiper v11+
import "swiper/css";
import "swiper/css/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faEye } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const Categoryproducts = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const params = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuickView = (slug) => {
    navigate(`/product/${slug}`);
  };

  const handleAddToBag = (product) => {
    addToCart(product, 1, true);
    // toast.success(`1 ${product.name} added to your bag`);
  };

  return (
    <Layout title={`Category - ${category?.name}`}>
      <h1 className="text-center my-4">{category?.name} Products</h1>
      {/* <h1 className="text-center my-4">{products?.length} Product(s) Found</h1> */}
      <div className="products-carousel-container">
        {products.length > 0 ? (
          <Swiper
            modules={[Navigation]}
            navigation
            loop={true}
            spaceBetween={20}
            slidesPerView={4}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {products.map((p) => (
              <SwiperSlide key={p._id}>
                <div className="product-block">
                  <div className="product-image-container">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      className="product-img"
                    />
                    <div
                      className="quick-view-icon"
                      title="Quick View"
                      onClick={() => handleQuickView(p.slug)}
                      style={{ cursor: "pointer" }}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </div>
                  </div>
                  <div className="product-info">
                    <h5 className="product-name">{p.name}</h5>
                    <p className="product-desc">{p.description}</p>
                    <p className="product-price">Rs {p.price}</p>
                  </div>
                  <button
                    className="add-to-bag-btn"
                    onClick={() => handleAddToBag(p)}
                  >
                    <span className="btn-text">ADD TO BAG</span>
                    <FontAwesomeIcon
                      icon={faBagShopping}
                      className="btn-icon"
                    />
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center">No products found in this category.</p>
        )}
      </div>
    </Layout>
  );
};

export default Categoryproducts;
