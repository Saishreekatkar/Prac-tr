const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const Database = require("better-sqlite3");

const app = express();
const port = 5000;
const db = new Database("app.db");

app.use(cors());
app.use(express.json());

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    passwordHash TEXT NOT NULL,
    course TEXT NOT NULL,
    dateOfBirth TEXT NOT NULL,
    gender TEXT NOT NULL,
    acceptTerms INTEGER NOT NULL,
    createdAt TEXT NOT NULL
  )
`).run();

const validateUser = (data) => {
  const errors = {};

  if (!data.fullName || !data.fullName.trim()) {
    errors.fullName = "Full name is required";
  }

  if (!data.email || !data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!data.password || !data.password.trim()) {
    errors.password = "Password is required";
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!data.confirmPassword || !data.confirmPassword.trim()) {
    errors.confirmPassword = "Confirm password is required";
  } else if (data.confirmPassword !== data.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!data.course) {
    errors.course = "Please select a course";
  }

  if (!data.dateOfBirth) {
    errors.dateOfBirth = "Please select your date of birth";
  }

  if (!data.gender) {
    errors.gender = "Please select your gender";
  }

  if (!data.acceptTerms) {
    errors.acceptTerms = "Please accept the terms";
  }

  return errors;
};

app.post("/api/users", async (req, res) => {
  try {
    const errors = validateUser(req.body);

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors,
      });
    }

    const normalizedEmail = req.body.email.trim().toLowerCase();

    const existingUser = db
      .prepare("SELECT id FROM users WHERE email = ?")
      .get(normalizedEmail);

    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
        errors: {
          email: "Email already exists",
        },
      });
    }

    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const result = db
      .prepare(`
        INSERT INTO users (
          fullName,
          email,
          passwordHash,
          course,
          dateOfBirth,
          gender,
          acceptTerms,
          createdAt
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `)
      .run(
        req.body.fullName.trim(),
        normalizedEmail,
        passwordHash,
        req.body.course,
        req.body.dateOfBirth,
        req.body.gender,
        req.body.acceptTerms ? 1 : 0,
        new Date().toISOString()
      );

    return res.status(201).json({
      message: "User created successfully",
      userId: result.lastInsertRowid,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

app.get("/api/users", (req, res) => {
  const users = db
    .prepare(`
      SELECT
        id,
        fullName,
        email,
        course,
        dateOfBirth,
        gender,
        acceptTerms,
        createdAt
      FROM users
      ORDER BY id DESC
    `)
    .all();

  return res.status(200).json(users);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});