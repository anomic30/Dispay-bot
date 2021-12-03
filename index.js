require('dotenv').config();
const express = require("express");
const randomize = require('randomatic');
const cors = require("cors");
const Razorpay = require("razorpay");
const server = express();
const Discord = require("discord.js"); 
const client = new Discord.Client({
    intents: ['GUILDS', 'DIRECT_MESSAGES', 'GUILD_MESSAGES'],
    partials: ["MESSAGE", "CHANNEL"]
});

const mySecret = process.env.TOKEN;
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

client.on("ready", () => {
    console.log("Im ready");
})

client.on('message', async message => {
    let mentionedUser;
    if (message.content === ".pay") {
        message.channel.send("Please mention a user!");
        return;
    } else {
        if (message.content.includes(".pay")) {
            const amount = message.content.replace(/(.*)#/,"");
            message.channel.send("Payment Initiated").then(
            message.author.send(`You have initiated a payment of ₹${amount} to user: ${message.mentions.members.first().user.tag}`)).then(
            client.users.fetch(message.mentions.users.first()).then((user) => {
                user.send(message.author.tag + ` is paying you ₹${amount}, you will receive a payment link shortly`);
                let id = randomize('A0', 5);
                let link;
                var options = {
                    amount: amount*100,
                    currency: "INR",
                    description: "Payment for the service",
                    reference_id: id
                }
                instance.paymentLink.create(options, (err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        user.send(`Here is your payment link: ${res.short_url}\nClick on the link to pay!`);
                    }
                })
            }))
        }
    }
})

keepAlive()
client.login(mySecret)