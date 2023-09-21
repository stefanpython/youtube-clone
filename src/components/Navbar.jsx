import "./Navbar.css";
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img
          className="menu-img"
          src="./menu-bar.png"
          alt="menu"
          onClick={onMenuClick}
        />
        <img className="navbar-logo" src="./youtube.png" alt="logo" />
        <span className="navbar-title" onClick={() => navigate("/")}>
          Youtube
        </span>
      </div>
      <div className="navbar-middle">
        <input
          type="text"
          className="search-bar"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchQuery.trim() !== "") {
              navigate(`/search/${searchQuery}`);
              setSearchQuery("");
            }
          }}
        />
        <button
          className="search-btn"
          onClick={() => {
            if (searchQuery.trim() !== "") {
              navigate(`/search/${searchQuery}`);
              setSearchQuery("");
            }
          }}
        >
          <div className="search-icon">&#128269;</div>
        </button>
      </div>
      <div className="navbar-right">
        <div className="dropdown right-btn">
          <img className="user-icon" src="./bell.png" alt="bell" />
          <img className="user-icon" src="./video.png" alt="video" />
          <img className="user-icon" src="./user.png" alt="user" />
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
};

export default Navbar;
