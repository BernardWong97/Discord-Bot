const Discord = require('discord.js');
const client = new Discord.Client();

client.login("Nzg4Njg0NDUyNTk4OTA2OTMx.X9nFog.ps7M5dO0h72cSckzappjf3ULtDI");

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
    if(msg.channel.id == '788685165240516609' && msg.content === 'test'){
        msg.reply('hello');
    }
}