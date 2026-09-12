const express = require("express");

const PORT = 8100;

const app = express();


app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  console.log("Email:", email);
  console.log("Password:", password);

  res.json({
    message: "Data received successfully",
  });
  
});

app.get("/", (req,res) => {
    res.send("HI");
} );

app.listen(PORT, 
    () => { console.log(`server started at port ${PORT}`);
    }
);