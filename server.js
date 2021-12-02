require('dotenv').config();
const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
const server = express();

const RAZORPAY_KEY = process.env.RAZORPAY_KEY;
const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET;

server.use(cors());
server.use(express.json());

var instance = new Razorpay({
    key_id: RAZORPAY_KEY,
    key_secret: RAZORPAY_SECRET,
});

server.all("/", (req, res) => {
    res.send("Bot is running")
})

function keepAlive() {
    server.listen(3000, () => {
        console.log("Server is running on port 3000");
    })
}

module.exports = keepAlive