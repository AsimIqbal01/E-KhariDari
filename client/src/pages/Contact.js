import React from "react";
import Layout from "../components/Layout/Layout";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Message sent successfully!");
          form.reset();
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      })
      .catch(() => toast.error("Failed to send message. Try again."));
  };

  return (
    <Layout title={"Contact Us - KhariDari"}>
      <Toaster position="top-center" reverseOrder={false} />
      <section className="contact-container">
        <div className="contact-content">
          <div className="contact-header">
            <h2>Get in Touch</h2>
            <p>Have questions or want to work with us? Reach out today!</p>
          </div>
          <div className="contact-grid">
            {/* Contact Info */}
            <div className="contact-info">
              <h3>Contact Information</h3>
              <ul>
                <li>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>E-KhariDari Retail Head Office, Sahiwal, Pakistan</span>
                </li>
                <li>
                  <i className="fas fa-envelope"></i>
                  <a href="mailto:asimiqbalswl@gmail.com">
                    asimiqbalswl@gmail.com
                  </a>
                </li>
                <li>
                  <i className="fas fa-phone-alt"></i>
                  <span>+92 03111122333</span>
                </li>
              </ul>
            </div>

            {/* Contact Form */}
            <div className="contact-form">
              <h3>Send Us a Message</h3>
              <form
                onSubmit={handleSubmit}
                action="https://formsubmit.co/asimiqbalswl@gmail.com"
                method="POST"
              >
                {/* Hidden Fields */}
                <input
                  type="hidden"
                  name="_subject"
                  value="New Contact Message from E-KhariDari"
                />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />

                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="Write your message here..."
                    required
                  ></textarea>
                </div>

                <button type="submit">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
