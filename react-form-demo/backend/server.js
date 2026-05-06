require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");

const app = express();

const port = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017";
const dbName = process.env.MONGO_DB_NAME || "registerFormDb";
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
const bcryptSaltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10);

let db;
let usersCollection;

app.use(
  cors({
    origin: clientUrl,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Register Form API is running");
});

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

const connectToMongoDb = async () => {
  const client = new MongoClient(mongoUrl);

  await client.connect();

  db = client.db(dbName);
  usersCollection = db.collection("users");

  await usersCollection.createIndex({ email: 1 }, { unique: true });

  console.log(`Connected to MongoDB database: ${dbName}`);
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

    const existingUser = await usersCollection.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
        errors: {
          email: "Email already exists",
        },
      });
    }

    const passwordHash = await bcrypt.hash(
      req.body.password,
      bcryptSaltRounds
    );

    const newUser = {
      fullName: req.body.fullName.trim(),
      email: normalizedEmail,
      passwordHash,
      course: req.body.course,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      acceptTerms: Boolean(req.body.acceptTerms),
      createdAt: new Date().toISOString(),
    };

    const result = await usersCollection.insertOne(newUser);

    return res.status(201).json({
      message: "User created successfully",
      userId: result.insertedId,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email already exists",
        errors: {
          email: "Email already exists",
        },
      });
    }

    console.error(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await usersCollection
      .find(
        {},
        {
          projection: {
            passwordHash: 0,
          },
        }
      )
      .sort({ createdAt: -1 })
      .toArray();

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

const startServer = async () => {
  try {
    await connectToMongoDb();

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();