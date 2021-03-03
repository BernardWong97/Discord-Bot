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
    process.stdout.write('Bok Bok Geh is listening for Discord messages!');
    isReady = true;
    clearInterval(interval);
});

client.on('message', gotMessage);

function gotMessage(msg) {
    if (msg.author == client.user){
        return;
    }

    if(msg.channel.id == '788685165240516609' && msg.content.toLowerCase().localeCompare('test') == 0){
        msg.reply('hello');
    }
}