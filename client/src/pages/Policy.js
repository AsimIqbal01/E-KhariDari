import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy - KhariDari"}>
      <div className="policy-container">
        <h1 className="policy-title">Privacy Policy</h1>
        <p className="policy-intro">
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your information when you use our services.
        </p>
        <div className="policy-section">
          <h2>1. Information We Collect</h2>
          <p>We may collect the following information:</p>
          <ul>
            <li>Personal identification details (e.g., name, email address)</li>
            <li>Transaction data and purchase history</li>
            <li>Browser and device information for analytics</li>
          </ul>
        </div>
        <div className="policy-section">
          <h2>2. How We Use Your Information</h2>
          <p>The information we collect is used to:</p>
          <ul>
            <li>Provide and improve our services</li>
            <li>Process transactions securely</li>
            <li>Send promotional updates (with your consent)</li>
            <li>Analyze user trends to enhance your experience</li>
          </ul>
        </div>
        <div className="policy-section">
          <h2>3. Sharing Your Information</h2>
          <p>
            We do not sell your data to third parties. However, we may share it
            with:
          </p>
          <ul>
            <li>Service providers helping us operate our business</li>
            <li>Legal authorities, if required by law</li>
            <li>Third-party analytics tools for performance insights</li>
          </ul>
        </div>
        <div className="policy-section">
          <h2>4. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access, update, or delete your personal data</li>
            <li>Opt out of marketing communications</li>
            <li>Request a copy of the data we store about you</li>
          </ul>
        </div>
        <div className="policy-section">
          <h2>5. Security Measures</h2>
          <p>
            We use modern security practices to protect your information,
            including:
          </p>
          <ul>
            <li>Encrypted transactions</li>
            <li>Secure servers with restricted access</li>
            <li>Regular security audits</li>
          </ul>
        </div>
        <div className="policy-footer">
          <p>
            If you have any questions or concerns about our Privacy Policy,
            please{" "}
            <a href="/contact" className="policy-link">
              contact us
            </a>
            .
          </p>
          <p>
            This Privacy Policy is effective as of{" "}
            {new Date().toLocaleDateString()} and is subject to updates. Please
            check back periodically for changes.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
