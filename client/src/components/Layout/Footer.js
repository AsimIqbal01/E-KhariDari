import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";

const Footer = () => {
  // Newsletter state and logic
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      return;
    }

    // Simulate subscription
    setTimeout(() => {
      console.log("Subscribed:", email);
      setStatus("success");
      setEmail("");
    }, 1000);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Contact Section */}
        <div className="footer-section">
          <h4 className="footer-heading">Contact Us</h4>
          <p className="footer-text">
            <i className="fas fa-map-marker-alt footer-icon-location text-dark"></i>{" "}
            E-KhariDari Retail Head Office, Sahiwal, Pakistan
          </p>
          <p className="footer-text">
            <i className="fas fa-envelope footer-icon-email text-dark"></i>{" "}
            <a href="mailto:wecare@ekharidari.pk">wecare@ekharidari.pk</a>
          </p>
          <p className="footer-text">
            <i className="fas fa-phone-alt footer-icon-phone text-dark"></i> +92
            03111122333
          </p>
          <div className="footer-socials">
            <a href="/" className="footer-icon">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="/" className="footer-icon">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Resources Section */}
        <div className="footer-section">
          <h4 className="footer-heading">Customer Care</h4>
          <ul className="footer-list">
            <li className="footer-item">
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li className="footer-item">
              <Link to="/terms-of-service">Terms of Service</Link>
            </li>
            <li className="footer-item">
              <Link to="/faqs">FAQs</Link>
            </li>
            <li className="footer-item">
              <Link to="/contact">Contact Us</Link>
            </li>
            <li className="footer-item">
              <Link to="/about">About Us</Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Section (Mailchimp Embedded Form) */}
        <div className="footer-section">
          <h4 className="footer-heading">Stay Updated</h4>
          <p className="footer-text">
            Subscribe to our newsletter for the latest updates and offers.
          </p>

          <form
            action="https://gmail.us20.list-manage.com/subscribe/post?u=945976a6c9d3b837102e659a9&amp;id=19b37f7005&amp;f_id=00347feef0"
            method="post"
            target="_blank"
            noValidate
            className="newsletter-form"
          >
            <input
              type="email"
              name="EMAIL"
              id="mce-EMAIL"
              required
              placeholder="Enter your email"
              className="newsletter-input"
            />
            <button
              type="submit"
              name="subscribe"
              id="mc-embedded-subscribe"
              className="newsletter-button"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} E-KhariDari. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
