import { useState } from "react";
import { NavLink } from "react-router";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="navbar">
      <div className="menu-container">
        <button className="menu-button" onClick={toggleMenu}>
          ☰ Menu
        </button>

        {menuOpen && (
          <div className="dropdown-menu">
            <NavLink to="/telegrams" onClick={closeMenu}>
              All Telegrams
            </NavLink>

            <NavLink to="/telegrams/create" onClick={closeMenu}>
              Create New Telegram
            </NavLink>
          </div>
        )}
      </div>

      <NavLink className="brand" to="/">
        Telegrams of the Wind
      </NavLink>

      <nav className="navbar-links">
        <NavLink to="/">About</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/login">Log In</NavLink>
      </nav>
    </header>
  );
}
