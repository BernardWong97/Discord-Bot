const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');
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

client.on('message', gotMessage);

async function gotMessage(message) {
    if(message.author.bot) return;

    if(message.content.includes("@here") || message.content.includes("@everyone")) return;

    if(message.channel.id == process.env.TESTCHANNEL){
        var splitted = message.content.toLowerCase().split(" ");

        if(splitted[0] === 'test'){
            message.reply('hello');
        }

        if(splitted[0] === "hello"){
            message.channel.send("Hi! I am a discord bot created by Bernard!");
        }

        if(message.mentions.has(client.user.id)){
            if(message.author.id != process.env.NENGID){
                var keywords = 'chicken';

                if(splitted.length > 1){
                    keywords = splitted.slice(1, splitted.length).join(" ");
                }

                var url = `https://g.tenor.com/v1/search?q=c${keywords}&key=${process.env.TENORKEY}&limit=10`;
                var response = await fetch(url);
                var json = await response.json();
                var index = random_num(json.results.length);
                
                message.channel.send(json.results[index].url);
            }
            else{
                message.channel.send("滾！");
            }
        }
    }
}

function random_num(max_length){
    return Math.floor(Math.random() * max_length);
}