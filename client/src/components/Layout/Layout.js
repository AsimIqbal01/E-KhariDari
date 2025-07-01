import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import CategoryBar from "./CategoryBar";

const Layout = ({
  children,
  title = "KhariDari - Shop Now",
  descripton = "KhariDari",
  keywords = "watch, wooden clock, alarm clock, wall clock, new arrival wall clock, smart watch, digital watch, old style watches, wrist watch, wrist digital watch, new arrival wrist watch, girls wrist watch, girls smart watch, girls digital watch, boys watch, boys wrist watch, boys smart watch, boys digital watch, boys new arrival watches",
  author = "KhariDari",
}) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={descripton} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <CategoryBar />
      <main style={{ minHeight: "80vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
