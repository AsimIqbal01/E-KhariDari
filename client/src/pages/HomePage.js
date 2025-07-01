import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import axios from "axios";
import ProductsCarousel from "../components/Layout/ProductsCarousel";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  // Get Total Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTotal();
  }, []);
  return (
    <Layout title="E-KhariDari – Fashion. Tech. Lifestyle.">
      {/* Banner Slider */}
      <section className="banner-slider">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 1000 }}
          loop={true}
          slidesPerView={1}
        >
          <SwiperSlide>
            <img src="/images/banner.png" alt="Banner 1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/images/banner.png" alt="Banner 2" />
          </SwiperSlide>
        </Swiper>
      </section>

      <section className="whats-new-wrapper">
        <h2 className="whats-new-heading">What's New</h2>
        <div className="whats-new-section">
          {[
            { title: "New Arrival", img: "/images/e1.png" },
            { title: "Trending", img: "/images/l1.png" },
            { title: "Alarm Clock", img: "/images/a1.png" },
            { title: "Antique Clock", img: "/images/s2.png" },
            { title: "Boys Watch", img: "/images/m3.png" },
          ].map((item, i) => (
            <div key={i} className="whats-new-item">
              <div className="circle-icon">
                <img src={item.img} alt={item.title} className="circle-image" />
              </div>
              <span className="circle-label">{item.title}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="all-products-section">
        <h2 className="products-heading">All Products</h2>
        <div className="total-products">Total Products: {total}</div>
        <ProductsCarousel />
      </section>

      {/* Shop by Category */}
      <section className="shop-category">
        <h2 className="category-heading">Shop by Category</h2>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2500 }}
          loop={true}
          slidesPerView={3}
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {[
            {
              title: "Smart Watch",
              img: "/images/e2.png",
              slug: "smart-watch",
            },
            { title: "Men", img: "/images/m2.png", slug: "men" },
            {
              title: "Wooden Clock",
              img: "/images/w2.png",
              slug: "wooden-clock",
            },
            { title: "Wall Clock", img: "/images/w3.png", slug: "wall-clock" },
            { title: "Boys Watch", img: "/images/m1.png", slug: "boys-watch" },
            {
              title: "Girls Watch",
              img: "/images/l1.png",
              slug: "girls-watch",
            },
            {
              title: "Antique Clock",
              img: "/images/s2.png",
              slug: "antique-clock",
            },
            {
              title: "Alarm Clock",
              img: "/images/a2.png",
              slug: "alarm-clock",
            },
          ].map((category, i) => (
            <SwiperSlide key={i}>
              <div
                className="category-card"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/category/${category.slug}`)}
              >
                <img src={category.img} alt={category.title} />
                <div className="title">{category.title}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      {/* <section className="shop-category">
        <h2 className="category-heading">Shop by Category</h2>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 1000 }}
          loop={true}
          slidesPerView={3}
          spaceBetween={20}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {[
            { title: "Smart Watch", img: "/images/e2.png" },
            { title: "Men", img: "/images/m2.png" },
            { title: "Wooden Clock", img: "/images/w2.png" },
            { title: "Wall Clock", img: "/images/w3.png" },
            { title: "Boys Watch", img: "/images/m1.png" },
            { title: "Girls Watch", img: "/images/l1.png" },
            { title: "Antique Clock", img: "/images/s2.png" },
            { title: "Alarm Clock", img: "/images/a2.png" },
          ].map((cat, i) => (
            <SwiperSlide key={i}>
              <div className="category-card">
                <img src={cat.img} alt={cat.title} />
                <div className="title">{cat.title}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section> */}
      <section className="more-explore">
        <h2 className="explore-heading">More to Explore</h2>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          slidesPerView={3}
          spaceBetween={20}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {[
            { title: "Wall Clock", img: "/images/w1.png" },
            { title: "Wrist Watch", img: "/images/l3.png" },
            { title: "Wrist Watch", img: "/images/l2.png" },
            { title: "Wrist Watch", img: "/images/e3.png" },
            { title: "Alarm Clock", img: "/images/a1.png" },
            { title: "Alarm Clock", img: "/images/a2.png" },
            { title: "Alarm Clock", img: "/images/a3.png" },
          ].map((item, i) => (
            <SwiperSlide key={i}>
              <div className="explore-card">
                <img src={item.img} alt={item.title} className="explore-img" />
                <div className="explore-title">{item.title}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </Layout>
  );
};

export default HomePage;
