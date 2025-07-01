import React from "react";
import Layout from "../components/Layout/Layout";

const TermsOfService = () => {
  return (
    <Layout title="Terms of Service - E-KhariDari">
      <section
        className="terms-service-container"
        style={{ padding: "3rem 1rem", maxWidth: "900px", margin: "0 auto" }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "1.5rem",
          }}
        >
          Terms of Service
        </h1>

        <p>
          These Terms of Service ("Terms") govern your access to and use of the
          E-KhariDari website and services. By accessing or using our platform,
          you agree to these Terms.
        </p>

        <h2 style={{ marginTop: "2rem", fontWeight: "bold" }}>
          1. Acceptance of Terms
        </h2>
        <p>
          By using our website, you confirm that you are at least 18 years old
          and agree to abide by these Terms. If you do not agree, you may not
          use our services.
        </p>

        <h2 style={{ marginTop: "2rem", fontWeight: "bold" }}>
          2. User Accounts
        </h2>
        <p>
          You may be required to create an account to access certain features.
          You are responsible for maintaining the confidentiality of your login
          credentials and all activities that occur under your account.
        </p>

        <h2 style={{ marginTop: "2rem", fontWeight: "bold" }}>
          3. Orders and Payment
        </h2>
        <p>
          When placing an order, you agree that all information provided is
          accurate and complete. We reserve the right to refuse or cancel orders
          at our discretion.
        </p>

        <h2 style={{ marginTop: "2rem", fontWeight: "bold" }}>
          4. Pricing and Availability
        </h2>
        <p>
          All prices are in PKR and may change without notice. Availability of
          products is not guaranteed and may be limited or unavailable at times.
        </p>

        <h2 style={{ marginTop: "2rem", fontWeight: "bold" }}>
          5. Intellectual Property
        </h2>
        <p>
          All content on E-KhariDari, including text, graphics, logos, and
          software, is the property of E-KhariDari and protected by intellectual
          property laws.
        </p>

        <h2 style={{ marginTop: "2rem", fontWeight: "bold" }}>
          6. Prohibited Conduct
        </h2>
        <p>
          You agree not to use our services for any unlawful or abusive purpose,
          including fraud, harassment, or the distribution of harmful content or
          spam.
        </p>

        <h2 style={{ marginTop: "2rem", fontWeight: "bold" }}>
          7. Limitation of Liability
        </h2>
        <p>
          E-KhariDari shall not be held liable for any indirect, incidental, or
          consequential damages arising from your use of our website or
          services.
        </p>

        <h2 style={{ marginTop: "2rem", fontWeight: "bold" }}>
          8. Termination
        </h2>
        <p>
          We reserve the right to terminate or suspend your access to our
          services at any time, without notice, for conduct that violates these
          Terms.
        </p>

        <h2 style={{ marginTop: "2rem", fontWeight: "bold" }}>
          9. Modifications
        </h2>
        <p>
          E-KhariDari may revise these Terms at any time. Continued use of our
          services after changes means you accept the updated Terms.
        </p>

        <h2 style={{ marginTop: "2rem", fontWeight: "bold" }}>
          10. Contact Information
        </h2>
        <p>
          If you have any questions about these Terms, please contact us at:
          <br />
          <a href="mailto:wecare@ekharidari.pk">wecare@ekharidari.pk</a>
        </p>

        <p style={{ marginTop: "2rem" }}>
          <strong>Effective Date:</strong> June 12, 2025
        </p>
      </section>
    </Layout>
  );
};

export default TermsOfService;
