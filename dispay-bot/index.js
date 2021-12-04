require('dotenv').config();
const payoutJSON = require("./payoutResponse.json");
const express = require("express");
const randomize = require('randomatic');
const cors = require("cors");
const Razorpay = require("razorpay");
const server = express();
const Discord = require("discord.js"); 
const { default: axios } = require('axios');
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

let money = 1500

server.get("/payout/:id",(req, res) => {
    const id = req.params.id;
    res.send("hello" + money);
})

client.on("ready", () => {
    console.log("Im ready");
})

client.on('message', async message => {
    let mentionedUser;
    if (message.content === "*pay") {
        message.channel.send("Please mention a user!");
        return;
    } else {
        if (message.content.includes("*pay")) {
            const amount = message.content.replace(/(.*)#/, "");
            authorDmEmbed = new Discord.MessageEmbed()
                .setColor("#36598c")
                .setTitle('Congratulations!')
                .setDescription(`You have initiated payment for the service\nand will receive the payment link shortly.`)
                .setThumbnail('https://i.postimg.cc/Vvk8y6rW/logo.png')
                .addFields(
                    { name: `**To:**`, value: `${message.mentions.members.first().user.tag}`, inline: true },
                    { name: `**Amount:**`, value: `₹${amount}`, inline: true },
                )
                .setTimestamp()
            message.author.send({ embeds: [authorDmEmbed] }).then(() => {
                let id = randomize('A0', 5);
                let paymentLinkRes;
                var options = {
                    amount: amount*100,
                    currency: "INR",
                    description: "Payment for the service",
                    reference_id: id
                }
                paymentLinkRes = instance.paymentLink.create(options, (err, res) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    paymentLinkEmbed = new Discord.MessageEmbed()
                        .setColor("#36598c")
                        .setAuthor("Dispay")
                        .setTitle("Here's your payment link")
                        .setDescription(`Click on the link to pay **${message.mentions.members.first().user.tag}**.\n**Link:** ${res.short_url}`)
                        .setThumbnail("https://i.postimg.cc/Vvk8y6rW/logo.png")
                        .setTimestamp()
                    message.author.send({ embeds: [paymentLinkEmbed] });

                    setTimeout(() => {
                        checkoutLinkEmbed = new Discord.MessageEmbed()
                            .setColor("#36598c")
                            .setAuthor("Dispay")
                            .setTitle(`Here's your payout link from **${message.author.tag}**`)
                            .setDescription(`Click on the link to get the money\ndeposited in your bank account!\n\n**Link:** ${payoutJSON.data.short_url}`)
                            .setThumbnail("https://i.postimg.cc/Vvk8y6rW/logo.png")
                            .setTimestamp()
                        client.users.fetch(message.mentions.users.first()).then((userr) => {
                            const payload = {
                                id: res.reference_id,
                                from: message.author.tag,
                                amount: res.amount/100,
                                contact: {
                                    name: userr.tag,
                                    email: `${userr.username}@gmail.com`
                                },
                                description: `Payout link for ${userr.tag}`
                            }
                            axios.patch("http://localhost:3000/data", payload).then((res) => {
                                console.log(payoutJSON);
                            })
                            userr.send({embeds: [checkoutLinkEmbed]});
                        })
                    },5000)
                })
            })
        }
    }
})

server.listen(3001, () => {
    console.log("Server is running on port 3001");
})
client.login(mySecret)