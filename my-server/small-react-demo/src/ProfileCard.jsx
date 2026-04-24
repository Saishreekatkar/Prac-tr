import { useState } from "react";

function ProfileCard({ name, role, location }) {
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <div style={styles.card}>
      <h2>{name}</h2>
      <p>{role}</p>
      <p>{location}</p>

      {isAvailable ? (
        <p style={styles.green}>Available for work</p>
      ) : (
        <p style={styles.red}>Not available</p>
      )}

      <button onClick={() => setIsAvailable(!isAvailable)}>
        Change Status
      </button>
    </div>
  );
}

const styles = {
  card: {
    width: "300px",
    padding: "20px",
    margin: "50px auto",
    border: "1px solid #ddd",
    borderRadius: "10px",
    textAlign: "center",
  },
  green: {
    color: "green",
  },
  red: {
    color: "red",
  },
};

export default ProfileCard;