import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSearch } from "../../context/search";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    const recent = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setHistory(recent);
  }, []);

  const updateHistory = (term) => {
    const updated = [term, ...history.filter((h) => h !== term)].slice(0, 6);
    localStorage.setItem("searchHistory", JSON.stringify(updated));
    setHistory(updated);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!values.keyword?.trim()) return;
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      updateHistory(values.keyword);
      navigate("/search");
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleIconClick = () => {
    setShowInput(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div
      className={`animated-search-container ${showInput ? "expanded" : ""}`}
      onFocus={() => setShowHistory(true)}
      onBlur={() => setTimeout(() => setShowHistory(false), 150)}
    >
      {!showInput && (
        <FontAwesomeIcon
          icon={faSearch}
          className="search-icon trigger"
          onClick={handleIconClick}
        />
      )}

      {showInput && (
        <form onSubmit={handleSearch} className="search-form">
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
            placeholder="Search and Own What You Love"
          />
          <button type="submit" className="search-submit-icon">
            <FontAwesomeIcon
              icon={loading ? faSpinner : faSearch}
              className={loading ? "spin" : ""}
            />
          </button>
          {showHistory && history.length > 0 && (
            <ul className="search-history-dropdown">
              {history.map((item, index) => (
                <li
                  key={index}
                  onClick={() => setValues({ ...values, keyword: item })}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </form>
      )}
    </div>
  );
};

export default SearchInput;
