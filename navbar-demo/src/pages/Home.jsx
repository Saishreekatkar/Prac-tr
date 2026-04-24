function Home() {
  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <p style={styles.badge}>Welcome to GreenSite</p>

        <h1 style={styles.title}>Build clean and simple React websites</h1>

        <p style={styles.description}>
          This home page shows a reusable navbar, page content, and footer
          layout using React components.
        </p>

        <button style={styles.button}>Explore More</button>
      </section>

      <section style={styles.cardsSection}>
        <div style={styles.card}>
          <h3>Reusable Components</h3>
          <p>Navbar, footer, and page sections are built as separate parts.</p>
        </div>

        <div style={styles.card}>
          <h3>React Routing</h3>
          <p>Each navbar link opens a different page using React Router.</p>
        </div>

        <div style={styles.card}>
          <h3>Clean UI</h3>
          <p>The layout uses spacing, colors, and sections for a better look.</p>
        </div>
      </section>
    </main>
  );
}

const styles = {
  page: {
    width: "100%",
    minHeight: "calc(100vh - 76px)",
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(135deg, #ecfdf5, #f8fafc)",
  },
  hero: {
    minHeight: "520px",
    padding: "90px 60px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxSizing: "border-box",
  },
  badge: {
    width: "fit-content",
    backgroundColor: "#d1fae5",
    color: "#047857",
    padding: "8px 14px",
    borderRadius: "999px",
    fontWeight: "700",
    marginBottom: "18px",
  },
  title: {
    maxWidth: "760px",
    fontSize: "56px",
    lineHeight: "1.05",
    color: "#064e3b",
    margin: "0 0 22px",
  },
  description: {
    maxWidth: "620px",
    fontSize: "20px",
    lineHeight: "1.7",
    color: "#475569",
    margin: "0 0 30px",
  },
  button: {
    width: "fit-content",
    border: "none",
    backgroundColor: "#059669",
    color: "white",
    padding: "14px 24px",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
  },
  cardsSection: {
    padding: "0 60px 80px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
    boxSizing: "border-box",
  },
  card: {
    backgroundColor: "white",
    padding: "28px",
    borderRadius: "18px",
    boxShadow: "0 12px 30px rgba(6, 78, 59, 0.12)",
    border: "1px solid #d1fae5",
  },
};

export default Home;