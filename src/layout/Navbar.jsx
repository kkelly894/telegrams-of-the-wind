import { useState } from "react";
import { NavLink, useNavigate } from "react-router";

import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="menu-container">
        <button className="menu-button" type="button" onClick={toggleMenu}>
          Menu
        </button>

        {menuOpen && (
          <div className="dropdown-menu">
            <NavLink to="/telegrams" onClick={closeMenu}>
              All Telegrams
            </NavLink>

            {token && (
              <>
                <NavLink to="/telegrams/create" onClick={closeMenu}>
                  Create New Telegram
                </NavLink>

                <NavLink to="/account/telegrams" onClick={closeMenu}>
                  My Telegrams
                </NavLink>

                <NavLink to="/drafts" onClick={closeMenu}>
                  Drafts
                </NavLink>
              </>
            )}
          </div>
        )}
      </div>

      <NavLink className="brand" to="/">
        Telegrams of the Wind
      </NavLink>

      <nav className="navbar-links">
        <NavLink to="/">About</NavLink>

        {token ? (
          <button
            className="logout-button"
            type="button"
            onClick={handleLogout}
          >
            Log Out
          </button>
        ) : (
          <>
            <NavLink to="/register">Register</NavLink>

            <NavLink to="/login">Log In</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
