const Discord = require('discord.js');
const client = new Discord.Client();

require("dotenv").config();
client.login(process.env.TOKEN);

process.stdout.write('Warming up Bok Bok Geh');
var interval = setInterval(()=>{
    process.stdout.write(".");
}, 500);

client.on('ready', () => {
    process.stdout.write(`\nLogged in as ${client.user.tag}!\n`);
    process.stdout.write('Bok Bok Geh is listening for Discord messages!\n');
    isReady = true;
    clearInterval(interval);
});

const commandHandler = require('./commands');

client.on('message', commandHandler);