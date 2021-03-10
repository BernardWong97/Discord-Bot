const fetch = require('node-fetch');

module.exports = async function (message) {
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