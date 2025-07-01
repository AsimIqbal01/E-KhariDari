import React from "react";
import { Link } from "react-router-dom";
import Layout from "./../components/Layout/Layout";

const PageNotFound = () => {
  return (
    <Layout title={"Page Not Found - KhariDari"}>
      <div className="not-found-container">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-text">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link to="/" className="not-found-link">
          <button className="not-found-button">Go to Home</button>
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
