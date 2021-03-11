// Imports
const Discord = require('discord.js');
const commandHandler = require('./commands');
const cron = require('cron');
require("dotenv").config();

// Instantiate
global.client = new Discord.Client();

// Login
client.login(process.env.TOKEN);

// Terminal debug
process.stdout.write('Warming up Bok Bok Geh');
var interval = client.setInterval(()=>{
    process.stdout.write(".");
}, 500);

// Logged in
client.on('ready', () => {
    client.clearInterval(interval);
    process.stdout.write(`\nLogged in as ${client.user.tag}!\n`);
    process.stdout.write('Bok Bok Geh is listening for Discord messages!\n');

    // Daily interval job
    var cronJob = new cron.CronJob('00 00 06 * * *', wake_up);
    cronJob.start();
});

// Listen for messages
client.on('message', commandHandler);

function wake_up(){
    // WAKE UP
    var channel = client.channels.cache.get(process.env.ALLCHATCHANNEL);
    channel.send("@everyone BOK BOK BOK WAKE UP!");
}