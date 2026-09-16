const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "elpdev",
  password: "elphill123",
  database: "node_project",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err);
    return;
  }

  console.log("MySQL connected!");
});

module.exports = db;
