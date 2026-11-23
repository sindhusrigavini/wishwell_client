import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./navbar.css";

import enFlag from "../assets/en.svg";
import iconimg from "../assets/icon.png";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const showMainMenu = location.pathname !== "/";

  const goTo = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const openLogin = () => {
    setShowLogin(true);
    setMenuOpen(false);
  };

  const openSignup = () => {
    setShowSignup(true);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="gifty-navbar">
        {/* LEFT */}
        <div className="gifty-nav-left">
          <img
            src={iconimg}
            alt="Logo"
            className="gifty-logo"
            onClick={() => goTo("/")}
          />
        </div>

        {/* CENTER (Desktop only) */}
        {showMainMenu && (
          <div className="gifty-nav-center">
            <span onClick={() => goTo("/wishlists")} className="nav-link">
              Wishlists
            </span>
            <span onClick={() => goTo("/activity")} className="nav-link">
              Activity
            </span>
            <span onClick={() => goTo("/inspiration")} className="nav-link">
              Inspiration
            </span>
          </div>
        )}

        {/* RIGHT */}
        <div className="gifty-nav-right">
          {/* ✅ Hamburger */}
          <div
            className="gifty-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* ✅ Desktop controls */}
          <div className="gifty-desktop-only">
            <div className="gifty-lang">
              <span>English</span>
              <img src={enFlag} alt="English" className="lang-flag" />
            </div>

            <button className="gifty-login" onClick={() => setShowLogin(true)}>
              LOG IN
            </button>

            <button className="gifty-signup" onClick={() => setShowSignup(true)}>
              SIGN UP
            </button>
          </div>
        </div>
      </nav>

      {/* ✅ Dropdown */}
      {menuOpen && (
        <div className="gifty-mobile-menu">
          {/* English */}
          <div className="mobile-lang">
            <span>English</span>
            <img src={enFlag} alt="English" className="lang-flag" />
          </div>

          {/* Login / Signup */}
          <button className="mobile-login" onClick={openLogin}>
            LOG IN
          </button>

          <button className="mobile-signup" onClick={openSignup}>
            SIGN UP
          </button>

          {/* Pages (Only after login pages) */}
          {showMainMenu && (
            <>
              <span onClick={() => goTo("/wishlists")} className="mobile-link">
                Wishlists
              </span>
              <span onClick={() => goTo("/activity")} className="mobile-link">
                Activity
              </span>
              <span onClick={() => goTo("/inspiration")} className="mobile-link">
                Inspiration
              </span>
            </>
          )}
        </div>
      )}

      {/* Modals */}
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} openLogin ={openLogin}/>
      <SignupModal isOpen={showSignup} onClose={() => setShowSignup(false)} openLogin={openLogin} />
    </>
  );
}
