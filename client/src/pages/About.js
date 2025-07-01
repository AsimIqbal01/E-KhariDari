import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title="About Us - E-KhariDari">
      <section
        className="about-container"
        style={{ padding: "3rem 1rem", maxWidth: "900px", margin: "0 auto" }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "1.5rem",
          }}
        >
          About E-KhariDari
        </h1>

        <p style={{ marginBottom: "1rem" }}>
          <strong>E-KhariDari</strong> is a modern e-commerce platform based in
          Sahiwal, Pakistan, created to bring quality, convenience, and trust to
          your shopping experience. We aim to bridge the gap between technology
          and traditional retail by delivering a seamless online shopping
          journey.
        </p>

        <h2
          style={{ fontSize: "1.25rem", fontWeight: "bold", marginTop: "2rem" }}
        >
          Our Mission
        </h2>
        <p style={{ marginBottom: "1rem" }}>
          To empower customers with easy access to reliable products at fair
          prices—anytime, anywhere. We strive to build a trustworthy platform
          that combines modern tech with local understanding.
        </p>

        <h2
          style={{ fontSize: "1.25rem", fontWeight: "bold", marginTop: "2rem" }}
        >
          What Makes Us Different?
        </h2>
        <ul style={{ paddingLeft: "1.5rem", listStyle: "disc" }}>
          <li>🛍️ Carefully curated quality products</li>
          <li>🚚 Fast and secure delivery across Pakistan</li>
          <li>📞 Dedicated support to answer your queries</li>
          <li>📦 Easy returns & transparent policies</li>
          <li>🌐 A user-friendly, mobile-optimized platform</li>
        </ul>

        <h2
          style={{ fontSize: "1.25rem", fontWeight: "bold", marginTop: "2rem" }}
        >
          Meet the Team
        </h2>
        <p style={{ marginBottom: "1rem" }}>
          Founded by <strong>Asim Iqbal</strong>, a passionate MERN stack and
          full-stack developer, E-KhariDari blends cutting-edge technology with
          a deep commitment to customer satisfaction and e-commerce excellence.
        </p>

        <h2
          style={{ fontSize: "1.25rem", fontWeight: "bold", marginTop: "2rem" }}
        >
          Join Us on the Journey
        </h2>
        <p>
          Whether you're a customer, partner, or supporter—thank you for being a
          part of our journey. We’re just getting started 🚀.
        </p>
      </section>
    </Layout>
  );
};

export default About;
