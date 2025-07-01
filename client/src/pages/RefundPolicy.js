import React from "react";
import Layout from "../components/Layout/Layout";

const RefundPolicy = () => {
  return (
    <Layout title="Refund Policy - E-KhariDari">
      <section
        className="refund-policy-container"
        style={{ padding: "3rem 1rem", maxWidth: "900px", margin: "0 auto" }}
      >
        <h1
          style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}
        >
          Refund & Return Policy
        </h1>

        <p>
          At <strong>E-KhariDari</strong>, we want you to be completely
          satisfied with your purchase. If you're not happy with a product,
          we’ll do our best to make it right.
        </p>

        <h2 style={{ marginTop: "2rem", fontWeight: "bold" }}>
          1. Eligibility for Returns
        </h2>
        <p>
          Items may be returned or exchanged within <strong>7 days</strong> of
          delivery if they:
        </p>
        <ul style={{ paddingLeft: "1.5rem", listStyle: "disc" }}>
          <li>Are unused and in their original packaging</li>
          <li>Have not been damaged or altered</li>
          <li>Include a valid proof of purchase</li>
        </ul>

        <h2 style={{ marginTop: "2rem", fontWeight: "bold" }}>
          2. Non-Returnable Items
        </h2>
        <p>The following items cannot be returned or exchanged:</p>
        <ul style={{ paddingLeft: "1.5rem", listStyle: "disc" }}>
          <li>Items on clearance or sale</li>
          <li>Personal care and hygiene products</li>
          <li>Customized or made-to-order items</li>
        </ul>

        <h2 style={{ marginTop: "2rem", fontWeight: "bold" }}>
          3. How to Request a Return
        </h2>
        <p>
          To initiate a return, please contact our customer support at{" "}
          <a href="mailto:wecare@ekharidari.pk">wecare@ekharidari.pk</a> or
          visit the <a href="/contact">Contact Us</a> page.
        </p>

        <h2 style={{ marginTop: "2rem", fontWeight: "bold" }}>
          4. Refund Processing
        </h2>
        <p>
          Once we receive and inspect your return, we will notify you of the
          status. If approved, your refund will be processed within{" "}
          <strong>7–10 business days</strong> through your original payment
          method.
        </p>

        <h2 style={{ marginTop: "2rem", fontWeight: "bold" }}>
          5. Shipping Costs
        </h2>
        <p>
          Customers are responsible for return shipping costs unless the item
          was damaged or incorrect. Shipping charges are non-refundable.
        </p>

        <h2 style={{ marginTop: "2rem", fontWeight: "bold" }}>6. Need Help?</h2>
        <p>
          If you have questions about your order, refund status, or anything
          else, email us at{" "}
          <a href="mailto:wecare@ekharidari.pk">wecare@ekharidari.pk</a>.
        </p>

        <p style={{ marginTop: "2rem" }}>
          <strong>Effective Date:</strong> June 12, 2025
        </p>
      </section>
    </Layout>
  );
};

export default RefundPolicy;
