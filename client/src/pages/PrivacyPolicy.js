import React from "react";
import Layout from "../components/Layout/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout title="Privacy Policy - E-KhariDari">
      <section
        className="privacy-policy-container"
        style={{ padding: "3rem 1rem", maxWidth: "900px", margin: "0 auto" }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "1.5rem",
          }}
        >
          Privacy Policy
        </h1>
        <p>
          At <strong>E-KhariDari</strong>, your privacy is important to us. This
          Privacy Policy outlines how we collect, use, and protect your
          information when you visit our website or use our services.
        </p>

        <h2 style={{ marginTop: "2rem", fontWeight: "bold" }}>
          1. Information We Collect
        </h2>
        <p>We may collect the following types of information:</p>
        <ul>
          <li>
            Personal information such as name, email address, phone number, and
            shipping address
          </li>
          <li>Order and payment information</li>
          <li>
            Usage data such as browser type, IP address, and pages visited
          </li>
        </ul>

        <h2 style={{ marginTop: "2rem", fontWeight: "bold" }}>
          2. How We Use Your Information
        </h2>
        <p>Your information may be used to:</p>
        <ul>
          <li>Process and fulfill your orders</li>
          <li>
            Send updates, promotions, or newsletters (only with your consent)
          </li>
          <li>Improve website performance and customer experience</li>
        </ul>

        <h2 style={{ marginTop: "2rem", fontWeight: "bold" }}>
          3. Sharing of Information
        </h2>
        <p>
          We do not sell or share your personal information with third parties
          except as required to complete your order (e.g., shipping partners) or
          as required by law.
        </p>

        <h2 style={{ marginTop: "2rem", fontWeight: "bold" }}>
          4. Data Security
        </h2>
        <p>
          We implement industry-standard security measures to protect your data.
          However, no method of transmission over the internet is 100% secure.
        </p>

        <h2 style={{ marginTop: "2rem", fontWeight: "bold" }}>
          5. Your Rights
        </h2>
        <p>
          You have the right to access, update, or delete your personal
          information. You may contact us at{" "}
          <a href="mailto:wecare@ekharidari.pk">wecare@ekharidari.pk</a> for any
          such requests.
        </p>

        <h2 style={{ marginTop: "2rem", fontWeight: "bold" }}>6. Cookies</h2>
        <p>
          We use cookies to enhance user experience and analyze website traffic.
          You can choose to disable cookies in your browser settings.
        </p>

        <h2 style={{ marginTop: "2rem", fontWeight: "bold" }}>
          7. Changes to This Policy
        </h2>
        <p>
          This Privacy Policy may be updated occasionally. We encourage you to
          review this page periodically for any changes.
        </p>

        <p style={{ marginTop: "2rem" }}>
          <strong>Effective Date:</strong> June 12, 2025
        </p>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
