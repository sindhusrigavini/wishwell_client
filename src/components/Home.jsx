


import React, { useEffect, useRef, useState } from "react";
import "./home.css";

import icon2 from "../assets/icon2.png";
import iconimg from "../assets/icon.png";
import getingoogle from "../assets/getInGoogle.svg";
import getinapple from "../assets/getInApple.svg";
import footerimg from "../assets/FooterImage.png";

import AddWishModal from "./AddWishModal";

import { useNavigate } from "react-router-dom";

export default function Home() {
  const [showAddWish, setShowAddWish] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const navigate = useNavigate();

  // 🔐 JWT AUTH CHECK + FETCH USER
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }
      console.log(token)
      try {
        const res = await fetch("https://wishwell-server-1.onrender.com/api/profile", {
          headers: {
            Authorization: token,
          },
        });


        if (!res.ok) {
          localStorage.removeItem("token");
          navigate("/");
          return;
        }

        const data = await res.json();
        setUser(data);

      } catch (err) {
        console.log(err);
        navigate("/");
      }
    };

    fetchProfile();
  }, [navigate]);

  // ✅ Close hamburger when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  // 🧠 Get initials from JWT user
  const getInitials = () => {
    if (!user) return "";

    if (user.name) {
      const parts = user.name.split(" ");
      return (parts[0][0] + (parts[1] ? parts[1][0] : "")).toUpperCase();
    }

    return user.email?.slice(0, 2).toUpperCase();
  };

  // 🚪 Logout (JWT)
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // 🔁 Navigation helper
  const goTo = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const openAddWish = () => {
    setShowAddWish(true);
    setMenuOpen(false);
  };

  const openProfile = () => {
    setShowProfile(true);
    setMenuOpen(false);
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header className="home-navbar">
        <div className="home-navbar-left">
          <img
            src={iconimg}
            alt="WishWell"
            className="home-logo"
            onClick={() => goTo("/home")}
          />
        </div>

        <nav className="home-navbar-center">
          <span onClick={() => goTo("/wishlists")}>Wishlists</span>
          <span onClick={() => goTo("/activity")}>Activity</span>
          <span onClick={() => goTo("/inspiration")}>Inspiration</span>
        </nav>

        <div className="home-navbar-right">
          {/* Hamburger */}
          <div
            className="home-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* Desktop Actions */}
          <div className="home-desktop-actions">
            <button
              className="add-wish-btn"
              onClick={() => setShowAddWish(true)}
            >
              ADD WISH
            </button>

            <span
              className="profile-circle"
              onClick={() => setShowProfile(true)}
            >
              {getInitials()}
            </span>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="home-mobile-menu" ref={menuRef}>
          <button className="home-menu-btn" onClick={openAddWish}>
            ➕ Add Wish
          </button>

          <button className="home-menu-btn" onClick={openProfile}>
            👤 Profile
          </button>

          <div className="home-menu-divider"></div>

          <span onClick={() => goTo("/wishlists")}>Wishlists</span>
          <span onClick={() => goTo("/activity")}>Activity</span>
          <span onClick={() => goTo("/inspiration")}>Inspiration</span>

          <div className="home-menu-divider"></div>

          <button className="home-menu-logout" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      )}

      {/* PROFILE PANEL */}
      {showProfile && (
        <div className="profile-overlay" onClick={() => setShowProfile(false)}>
          <div
            className="profile-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="profile-header">
              <h3>Profile</h3>
              <span
                className="close-btn"
                onClick={() => setShowProfile(false)}
              >
                ×
              </span>
            </div>

            <div className="profile-user">
              <div className="profile-circle big">{getInitials()}</div>

              <div>
                <p className="profile-name">{user?.name || "User"}</p>
                <p className="profile-email">{user?.email}</p>
              </div>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
              LOG OUT
            </button>
          </div>
        </div>
      )}

      {/* ABOUT */}
      <main className="home-content about-page">
        <article className="about-container">
          <header className="about-header">
            <h1>About Us</h1>
            <p className="about-intro">
              Learn more about WishWell and our mission to fix gifting.
            </p>
          </header>

          <section className="about-section">
            <h2>About WishWell</h2>
            <p>
              <strong>WishWell</strong> is a leading app for wishlists and social
              shopping, empowering millions of users worldwide.
            </p>
            <p className="highlight">Wish. Share. Compare.</p>
          </section>

          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              Our mission is <strong>Fixing Gifting</strong>.
            </p>
          </section>

          <section className="about-section">
            <h2>Our Vision</h2>
            <p>
              WishWell aims to become the{" "}
              <strong>Global Genie of Social Shopping</strong>.
            </p>
          </section>
        </article>
      </main>

      {/* FOOTER */}
      <footer className="home-footer">
        <div className="home-footer-container">
          <img src={icon2} alt="WishWell" className="footer-logo" />

          <div className="footer-links">
            <div>
              <h4>Customer Service</h4>
              <p>mail@wishwell.com</p>
            </div>

            <div>
              <h4>Inspirations</h4>
              <p>Creators</p>
              <p>Brands</p>
              <p>Trending</p>
            </div>
          </div>

          <div className="footer-buttons">
            <img src={getinapple} alt="App Store" />
            <img src={getingoogle} alt="Google Play" />
          </div>

          <div className="footer-phone">
            <img src={footerimg} alt="App preview" />
          </div>
        </div>
      </footer>

      {/* ADD WISH */}
      <AddWishModal
        isOpen={showAddWish}
        onClose={() => setShowAddWish(false)}
      />
    </>
  );
}