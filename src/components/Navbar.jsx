import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img className="navbar-logo" src="./youtube.png" alt="logo" />
        <span className="navbar-title">Youtube</span>
      </div>
      <div className="navbar-middle">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for movie..."
        />
        <button className="search-btn">&#128269;</button>
      </div>
      <div className="navbar-right">
        <div className="dropdown left-btn">
          <button className="movies-btn">Button</button>
        </div>
        <div className="dropdown right-btn">
          <button className="shows-btn"> Button</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
