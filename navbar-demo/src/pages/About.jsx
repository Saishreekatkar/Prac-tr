function About() {
  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <p style={styles.badge}>About GreenSite</p>

        <h1 style={styles.title}>We build simple, clean, and reusable React websites</h1>

        <p style={styles.description}>
          GreenSite is a small React demo website created to show how different
          pages, reusable components, routing, navbar, footer, and clean UI
          sections work together in a real project.
        </p>
      </section>

      <section style={styles.contentSection}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Who We Are</h2>
          <p style={styles.text}>
            We are focused on building modern websites with a simple structure.
            Each part of the website is separated into components so the code is
            easier to understand, reuse, and maintain.
          </p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>What This Project Shows</h2>
          <p style={styles.text}>
            This project shows important React concepts like components, props,
            routing, page structure, reusable navbar, reusable footer, and clean
            styling using JavaScript objects.
          </p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Why React?</h2>
          <p style={styles.text}>
            React helps us split a website into small pieces. For example, the
            navbar is one component, the footer is another component, and each
            page has its own file. This makes the project easy to manage.
          </p>
        </div>
      </section>

      <section style={styles.missionSection}>
        <div>
          <h2 style={styles.sectionTitle}>Our Mission</h2>
          <p style={styles.text}>
            Our mission is to create websites that are simple, responsive, and
            easy to use. This demo project is designed to explain React basics
            in a clear and practical way.
          </p>
        </div>

        <div style={styles.pointsBox}>
          <h3 style={styles.pointsTitle}>Key Highlights</h3>

          <ul style={styles.list}>
            <li>Reusable Navbar component</li>
            <li>Reusable Footer component</li>
            <li>Multiple pages using React Router</li>
            <li>Clean green color theme</li>
            <li>Simple and beginner-friendly code</li>
          </ul>
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
    padding: "90px 60px 50px",
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
    maxWidth: "850px",
    fontSize: "48px",
    lineHeight: "1.1",
    color: "#064e3b",
    margin: "0 0 22px",
  },
  description: {
    maxWidth: "760px",
    fontSize: "20px",
    lineHeight: "1.7",
    color: "#475569",
    margin: 0,
  },
  contentSection: {
    padding: "20px 60px 50px",
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
  cardTitle: {
    color: "#065f46",
    margin: "0 0 14px",
    fontSize: "22px",
  },
  text: {
    color: "#475569",
    fontSize: "16px",
    lineHeight: "1.7",
    margin: 0,
  },
  missionSection: {
    margin: "0 60px 80px",
    padding: "36px",
    backgroundColor: "#064e3b",
    color: "white",
    borderRadius: "24px",
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    gap: "30px",
    boxSizing: "border-box",
  },
  sectionTitle: {
    fontSize: "32px",
    margin: "0 0 16px",
  },
  pointsBox: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: "24px",
    borderRadius: "18px",
  },
  pointsTitle: {
    margin: "0 0 16px",
    fontSize: "22px",
  },
  list: {
    margin: 0,
    paddingLeft: "20px",
    lineHeight: "1.9",
    color: "#d1fae5",
  },
};

export default About;