// app.js
// Inside app.js 
const express = require('express');
const Razorpay = require('razorpay'); 

// This razorpayInstance will be used to
// access any resource from razorpay
const razorpayInstance = new Razorpay({

    key_id: rzp_test_fiIwmRET6CApc2,     // Replace with your key_id

    key_secret: YAEUthsup8SijNs3iveeVlL1    // Replace with your key_secret
});

const app = express();
const PORT = process.env.PORT || '5000';

// Here we will create two routes one 
// /createOrder and other /verifyOrder 
// Replace these comments with the code 
// provided later in step 2 & 8 for routes

app.listen(PORT, ()=>{
    console.log("Server is Listening on Port ", PORT);
});