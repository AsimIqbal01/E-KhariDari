import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faEye,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

const Search = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setShowSearchBar(false);
      } else {
        setShowSearchBar(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleQuickView = (slug) => {
    navigate(`/product/${slug}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", keyword);
  };

  const handleAddToBag = (product) => {
    addToCart(product);
  };

  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Product Found"
              : ` ${values?.results.length} Product(s) Found `}
          </h6>

          {/* Toggle Search Icon for Mobile/Tablet */}
          {!showSearchBar && (
            <div className="d-md-none text-end mb-3">
              <FontAwesomeIcon
                icon={faSearch}
                className="toggle-search-icon"
                onClick={() => setShowSearchBar(!showSearchBar)}
                style={{ cursor: "pointer", fontSize: "1.2rem" }}
              />
            </div>
          )}

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
              {values?.results.map((p) => (
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
