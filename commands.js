const fetch = require('node-fetch');

module.exports = async function (message) {
    if(message.author.bot) return;

    if(message.content.includes("@here") || message.content.includes("@everyone")) return;

    if(message.channel.id == process.env.TESTCHANNEL){
        var splitted = message.content.toLowerCase().split(" ");
        var command = splitted.shift();

        if(command === 'test'){
            message.reply('hello');
        }

        if(command === "hello"){
            message.channel.send("Hi! I am a discord bot created by Bernard!");
        }

        // If bok bok geh is mentioned
        if(message.mentions.has(client.user.id)){
            if(message.author.id != process.env.NENGID){
                
            }
            else{
                message.channel.send("滾！");
            }
        }
    }
}