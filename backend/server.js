const express = require("express");

const PORT = 8100;

const app = express();

app.get("/", (req,res) => {
    res.send("HI");
} );

app.listen(PORT, 
    () => { console.log(`server started at port ${PORT}`);
    }
);