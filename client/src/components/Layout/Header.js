import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBagShopping,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import SearchInput from "../Form/SearchInput";

const Header = () => {
  const [auth] = useAuth();
  const { cart } = useCart();
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const dashboardPath =
    auth?.user?.role === 1 ? "/dashboard/admin" : "/dashboard/user";

  const handleMobileSearchSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?keyword=${keyword}`);
    }
  };

  return (
    <>
      <div className="tagline-container text-center py-0">
        <span className="tagline-text">Find It. Love It. Own It.</span>
      </div>

      <nav className="navbar py-0">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <NavLink to="/" className="navbar-brand">
            <strong>E-KhariDari</strong>
          </NavLink>

          <ul className="navbar-nav d-flex flex-row align-items-center mb-0 gap-2">
            {/* 🔍 Mobile Search Icon */}
            <li className="nav-item d-md-none">
              <FontAwesomeIcon
                icon={faSearch}
                className="nav-link"
                style={{ cursor: "pointer" }}
                onClick={() => setShowMobileSearch(!showMobileSearch)}
              />
            </li>

            {/* 📱 Toggle Search Input (mobile only) */}
            {showMobileSearch && (
              <li className="nav-item d-md-none">
                <form
                  onSubmit={handleMobileSearchSubmit}
                  className="d-flex align-items-center"
                >
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Search..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    style={{ maxWidth: "150px" }}
                  />
                </form>
              </li>
            )}

            {/* 💻 Desktop Search Bar */}
            <li className="nav-item d-none d-md-block">
              <SearchInput />
            </li>

            {/* 👤 User/Login */}
            <li className="nav-item">
              <NavLink
                to={auth?.user ? dashboardPath : "/account"}
                className="nav-link"
              >
                {auth?.user ? (
                  auth.user.name
                ) : (
                  <FontAwesomeIcon icon={faUser} />
                )}
              </NavLink>
            </li>

            {/* 🛒 Cart */}
            <li className="nav-item position-relative">
              <NavLink to="/cart" className="nav-link">
                <FontAwesomeIcon icon={faBagShopping} />
                <span className="cart-badge">{cart?.length || 0}</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
