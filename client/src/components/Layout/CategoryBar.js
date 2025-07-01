import React from "react";
import useCategory from "../../hooks/useCategory";
import { useNavigate } from "react-router-dom";

const CategoryBar = () => {
  const categories = useCategory();
  const navigate = useNavigate();

  return (
    <div className="category-bar">
      {categories?.map((category) => (
        <span
          key={category._id}
          className="category-item"
          onClick={() => navigate(`/category/${category.slug}`)}
          style={{ cursor: "pointer" }}
        >
          {category.name}
        </span>
      ))}
    </div>
  );
};

export default CategoryBar;
