import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faBagShopping,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    if (slug) getProduct();
  }, [slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${slug}`
      );
      setProduct(data?.product);
      getRelatedProducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const getRelatedProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products || []);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToBag = () => {
    addToCart(product, quantity, true);
    // toast.success(`${quantity} item(s) added to your bag`);
    navigate("/cart");
  };

  const handleQuickView = (slug) => {
    navigate(`/product/${slug}`);
  };

  const handleAddRelatedToCart = (product) => {
    addToCart(product, 1, true);
  };

  if (!product) {
    return (
      <Layout>
        <div className="product-loading">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout title={"Detail - KhariDari"}>
      <div className="product-detail-wrapper">
        <div className="product-image-area">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
          />
        </div>

        <div className="product-info-area">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-description">{product.description}</p>
          <h2 className="product-price">Rs {product.price}</h2>

          <div className="quantity-container">
            <button onClick={handleDecrement}>
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <span>{quantity}</span>
            <button onClick={handleIncrement}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>

          <button className="add-to-bag-btn" onClick={handleAddToBag}>
            <span className="text-slide-wrapper">
              <span className="btn-text">ADD TO BAG</span>
              <span className="bag-icon">
                <FontAwesomeIcon icon={faBagShopping} />
              </span>
            </span>
          </button>
        </div>
      </div>

      <div className="related-products-section">
        <h2>Related Products</h2>
        {relatedProducts.length === 0 ? (
          <p>Coming Soon...</p>
        ) : (
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
              {relatedProducts.map((p) => (
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
                      onClick={() => handleAddRelatedToCart(p)}
                    >
                      <span className="text-slide-wrapper">
                        <span className="btn-text">ADD TO BAG</span>
                        <span className="bag-icon">
                          <FontAwesomeIcon icon={faBagShopping} />
                        </span>
                      </span>
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
