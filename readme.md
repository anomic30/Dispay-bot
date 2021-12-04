# Dispay bot (Theme 1: Made with Razorpay)

A simple discord bot that automates the process of p2p payments using Razorpay APIs. Dispay is the only bot you need to automate your payments in your discord community.

 ## Checkout our website to learn more!
[dispay.netlify.app](https://dispay.netlify.app/)

<img src="./website.png" width="400px">


## Getting started

First, make sure you have all the required tools installed on your local machine then continue with these steps.

* Node.js
* NPM

### Installation

```bash
# Clone the repository
git clone https://github.com/anomic30/Dispay-bot.git
# Enter into the directory
cd dispay-bot/
# Install the dependencies
npm install
```
### ⚠️ Important!
In order to use this for your own purpose, you need to provide the Discord BOT Token, Razorpay API Key & Secret in the .env file

### Starting the application

```bash
# To start the Dispay-bot which will run at port 3001
node index.js
```
```bash
# To start the local JSON server which will run at port 3000
json-server --watch payoutResponse.json
```

## Features & Commands

* 💸 Pay a discord user 

`*pay @payee_name #amount`

<br />
<img src="./payto.png" width="300px">

## Contributing

There's still a lot more features to be add in this bot, you are welcome to contribute by submitting a Pull Request to the repository. 

## Contrubutors

[Anom Chakravorty](https://github.com/anomic30)
<br/>
[Aditya Mondal](https://github.com/Sneakad)
<br/>
[Tuhin Paul]()
