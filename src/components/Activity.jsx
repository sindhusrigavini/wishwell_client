import React, { useEffect, useRef, useState } from "react";
import "./activity.css";
import "./home.css";
import icon2 from "../assets/icon2.png";
import icon1 from "../assets/icon.png";
import iconimg from "../assets/iconimg.png";
import getingoogle from "../assets/getInGoogle.svg";
import getinapple from "../assets/getInApple.svg";
import footerimg from "../assets/FooterImage.png";
import AddWishModal from "./AddWishModal";
import { useNavigate } from "react-router-dom";

export default function Activity() {
  const [showAddWish, setShowAddWish] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [followed, setFollowed] = useState(false);
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

  // 👤 Get initials
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

  const goTo = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const handleAddWish = (wish) => {
    // Activity page doesn't manage wishes locally, but modal handles API call
    console.log("Wish added:", wish);
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header className="home-navbar">
        <div className="home-navbar-left">
          <img
            src={icon1}
            alt="WishWell"
            className="home-logo"
            onClick={() => goTo("/home")}
          />
        </div>

        {/* ✅ Desktop center menu only */}
        <nav className="home-navbar-center">
          <span onClick={() => goTo("/wishlists")}>Wishlists</span>
          <span className="active">Activity</span>
          <span onClick={() => goTo("/inspiration")}>Inspiration</span>
        </nav>

        <div className="home-navbar-right">
          {/* ✅ hamburger for mobile/tablet */}
          <div className="home-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* ✅ desktop actions only */}
          <div className="home-desktop-actions">
            <button className="add-wish-btn" onClick={() => setShowAddWish(true)}>
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

      {/* ✅ Hamburger dropdown */}
      {menuOpen && (
        <div className="home-mobile-menu" ref={menuRef}>
          <button
            className="home-menu-btn"
            onClick={() => {
              setShowAddWish(true);
              setMenuOpen(false);
            }}
          >
            ➕ Add Wish
          </button>

          <button
            className="home-menu-btn"
            onClick={() => {
              setShowProfile(true);
              setMenuOpen(false);
            }}
          >
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

      {/* ================= PROFILE ================= */}
      {showProfile && (
        <div className="profile-overlay" onClick={() => setShowProfile(false)}>
          <div className="profile-panel" onClick={(e) => e.stopPropagation()}>
            <div className="profile-header">
              <h3>Profile</h3>
              <span className="close-btn" onClick={() => setShowProfile(false)}>
                ×
              </span>
            </div>

            <div className="profile-user">
              <div className="profile-circle big">{getInitials()}</div>
              <div>
                <p className="profile-name">{user?.displayName || "User"}</p>
                <p className="profile-email">{user?.email}</p>
              </div>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
              LOG OUT
            </button>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY LAYOUT ================= */}
      <main className="activity-page">
        {/* LEFT SIDEBAR */}
        <aside className="activity-sidebar">
          <ul>
            <li className="active">All</li>
            <li>Wishlists</li>
            <li>Brands</li>
            <li>Creator</li>
          </ul>

          <div className="suggested-brands">
            <h4>Suggested brands</h4>

            <div className="brand-row">
              <div className="brand-info">
                <img src={iconimg} alt="GoWish" />
                <span>GoWish</span>
              </div>

              <button
                className={followed ? "unfollow" : "follow"}
                onClick={() => setFollowed(!followed)}
              >
                {followed ? "UNFOLLOW" : "FOLLOW"}
              </button>
            </div>

            <p className="show-more">SHOW MORE</p>
          </div>
        </aside>

        {/* FEED */}
        <section className="activity-feed">
          <h2>Feed</h2>

          {followed && (
            <div className="toast">✔ Brand GoWish followed successfully</div>
          )}

          <p className="empty-text">
            You are out of suggestions, come back later to check for more.
          </p>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
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

      {/* ================= ADD WISH MODAL ================= */}
      <AddWishModal isOpen={showAddWish} onClose={() => setShowAddWish(false)} onAddWish={handleAddWish} />
    </>
  );
}
