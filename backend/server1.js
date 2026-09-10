const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  console.log("Email:", email);
  console.log("Password:", password);

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  // Temporary login check
  if (email === "test@gmail.com" && password === "123456") {
    return res.json({
      message: "Login successful",
      user: {
        email: email,
      },
    });
  }

  return res.status(401).json({
    message: "Invalid email or password",
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
