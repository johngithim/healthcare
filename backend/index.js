const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const {
  verifyToken,
  verifyUserTable,
  requireRole,
} = require("./middlewares/auth");

dotenv.config();
const app = express();

app.use(express.json());

// Authentication routes
app.use("/api/auth", authRoutes);

// Protected route example
app.get("/api/profile", verifyToken, (req, res) => {
  res.json({ message: "You are authenticated", userId: req.userId });
});

// protected route with role check
app.get(
  "/patient/profile",
  verifyToken,
  verifyUserTable,
  requireRole("paitent"),
  (req, res) => {
    res.json({ message: "Patient-only profile route", user: req.user });
  },
);

app.get(
  "/doctor/profile",
  verifyToken,
  verifyUserTable,
  requireRole("doctor"),
  (req, res) => {
    res.json({ message: "Doctor-only profile route", user: req.user });
  },
);

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
