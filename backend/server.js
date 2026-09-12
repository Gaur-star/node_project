const express = require("express");
const cors = require("cors");
const PORT = 8100;
const app = express();
const db = require("./db");

app.use(cors());
app.use(express.json());


app.post("/api/login", (req, res) => {


  const { email, password } = req.body;

  console.log("Email:", email);
  console.log("Password:", password);

  
  /******save to db ***********/
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users (email, password)
      VALUES (?, ?)
    `;

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

app.get("/", (req,res) => {
    res.send("HI");
} );

app.listen(PORT, 
    () => { console.log(`server started at port ${PORT}`);
    }
);