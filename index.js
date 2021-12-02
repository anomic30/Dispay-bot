const keepAlive = require("./server");
const axios = require('axios');
require('dotenv').config();
const Discord = require("discord.js"); 
const client = new Discord.Client({
    intents: ['GUILDS', 'DIRECT_MESSAGES', 'GUILD_MESSAGES'],
    partials: ["MESSAGE", "CHANNEL"]
});
const mySecret = process.env.TOKEN;

client.on("ready", () => {
    console.log("Im ready");
})

client.on('message', async message => {
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
            }))
        }
        // if (message.channel.type === "DM" && !message.author.bot) {
        //     console.log(message.content);
        //     message.author.send("You will receive a payment link ");
        // }
    }
})

keepAlive()
client.login(mySecret)