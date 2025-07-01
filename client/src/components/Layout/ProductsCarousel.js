import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faEye } from "@fortawesome/free-solid-svg-icons";
import "swiper/css";
import "swiper/css/navigation";
import { useCart } from "../../context/cart";

const ProductsCarousel = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/product/get-product`
        );
        setProducts(data.products);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };

    getAllProducts();
  }, []);

  const handleQuickView = (slug) => {
    navigate(`/product/${slug}`);
  };

  const handleAddToBag = (product) => {
    addToCart(product);
  };

  return (
    <div className="products-carousel-container">
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
                <FontAwesomeIcon icon={faBagShopping} className="btn-icon" />
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsCarousel;
