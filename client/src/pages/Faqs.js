import React from "react";
import Layout from "../components/Layout/Layout";

const Faqs = () => {
  return (
    <Layout title="FAQs - E-KhariDari">
      <section
        className="faqs-container"
        style={{ padding: "3rem 1rem", maxWidth: "900px", margin: "0 auto" }}
      >
        <h1
          style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}
        >
          Frequently Asked Questions
        </h1>

        <div className="faq-item" style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontWeight: "bold" }}>1. What is E-KhariDari?</h3>
          <p>
            E-KhariDari is an online shopping platform offering quality products
            across categories, delivered right to your doorstep.
          </p>
        </div>

        <div className="faq-item" style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontWeight: "bold" }}>2. How can I place an order?</h3>
          <p>
            Simply browse the products, add them to your cart, and proceed to
            checkout. Enter your details, choose a payment method, and place
            your order.
          </p>
        </div>

        <div className="faq-item" style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontWeight: "bold" }}>
            3. What payment methods are accepted?
          </h3>
          <p>
            We accept Cash on Delivery (COD), credit/debit cards, and mobile
            wallet payments.
          </p>
        </div>

        <div className="faq-item" style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontWeight: "bold" }}>4. How can I track my order?</h3>
          <p>
            After placing your order, you’ll receive a tracking link via email
            or SMS. You can also check your order status in your account.
          </p>
        </div>

        <div className="faq-item" style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontWeight: "bold" }}>
            5. Can I return or exchange a product?
          </h3>
          <p>
            Yes, we have a hassle-free return and exchange policy. Please read
            our <a href="/refund-policy">Refund Policy</a> for more details.
          </p>
        </div>

        <div className="faq-item" style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontWeight: "bold" }}>
            6. How can I contact customer support?
          </h3>
          <p>
            You can reach us at{" "}
            <a href="mailto:asimiqbalswl@gmail.com">asimiqbalswl@gmail.com</a>{" "}
            or through our <a href="/contact">Contact Us</a> page.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Faqs;
