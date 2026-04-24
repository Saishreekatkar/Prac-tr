import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.top}>
        <div>
          <h2 style={styles.logo}>GreenSite</h2>
          <p style={styles.description}>
            A simple React website with reusable components, pages, navbar, and
            footer.
          </p>
        </div>

        <div>
          <h3 style={styles.heading}>Quick Links</h3>

          <div style={styles.links}>
            <Link style={styles.link} to="/">
              Home
            </Link>
            <Link style={styles.link} to="/about">
              About
            </Link>
            <Link style={styles.link} to="/services">
              Services
            </Link>
            <Link style={styles.link} to="/contact">
              Contact
            </Link>
          </div>
        </div>
      </div>

      <div style={styles.bottom}>
        <p style={styles.copy}>© 2026 GreenSite. All rights reserved.</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    width: "100%",
    background: "linear-gradient(90deg, #022c22, #064e3b)",
    color: "white",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
  },
  top: {
    padding: "42px 60px",
    display: "flex",
    justifyContent: "space-between",
    gap: "30px",
    flexWrap: "wrap",
  },
  logo: {
    margin: "0 0 12px",
    fontSize: "26px",
  },
  description: {
    maxWidth: "420px",
    color: "#d1fae5",
    lineHeight: "1.7",
    margin: 0,
  },
  heading: {
    margin: "0 0 14px",
    fontSize: "18px",
  },
  links: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  link: {
    color: "#d1fae5",
    textDecoration: "none",
    fontSize: "15px",
  },
  bottom: {
    borderTop: "1px solid rgba(209, 250, 229, 0.2)",
    padding: "16px 60px",
    textAlign: "center",
  },
  copy: {
    margin: 0,
    color: "#a7f3d0",
    fontSize: "14px",
  },
};

export default Footer;