import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.logo}>
        GreenSite
      </Link>

      <ul style={styles.menu}>
        <li>
          <Link style={styles.link} to="/">
            Home
          </Link>
        </li>

        <li>
          <Link style={styles.link} to="/about">
            About
          </Link>
        </li>

        <li>
          <Link style={styles.link} to="/services">
            Services
          </Link>
        </li>

        <li>
          <Link style={styles.contactButton} to="/contact">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    width: "100%",
    minHeight: "76px",
    padding: "0 60px",
    background: "linear-gradient(90deg, #064e3b, #047857, #10b981)",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "0 8px 24px rgba(6, 78, 59, 0.28)",
  },
  logo: {
    color: "white",
    textDecoration: "none",
    fontSize: "26px",
    fontWeight: "700",
    letterSpacing: "0.5px",
  },
  menu: {
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    gap: "32px",
    margin: 0,
    padding: 0,
  },
  link: {
    color: "#ecfdf5",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "500",
  },
  contactButton: {
    color: "#064e3b",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "700",
    backgroundColor: "#d1fae5",
    padding: "10px 18px",
    borderRadius: "999px",
    boxShadow: "0 8px 18px rgba(209, 250, 229, 0.28)",
  },
};

export default Navbar;