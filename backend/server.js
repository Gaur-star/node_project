const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const PORT = process.env.PORT || 8100;
const app = express();
const db = require("./db");

app.use(cors());
app.use(express.json());


app.post("/api/login", async (req, res) => {


  const { email, password } = req.body;

  console.log("Email:", email);
  console.log("Password:", password);

   // Check input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

  
  /******save to db ***********/
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users (email, password)
      VALUES (?, ?)
    `;

    db.query(sql, [email, hashedPassword], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Failed to save user"
      });
    }

    res.json({
      message: "User saved successfully",
      id: result.insertId
    });
  });
  

    db.query(sql, [email, hashedPassword], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({
          message: "Could not save user",
        });
      }

      console.log("User saved! ID:", result.insertId);

  /******save to db ***********/

  res.json({
    message: "Data received successfully",
  });
    });
});

// app.get("/", (req,res) => {
//     res.send("HI");
// } );

app.listen(PORT, 
    () => { console.log(`server started at port ${PORT}`);
    }
);