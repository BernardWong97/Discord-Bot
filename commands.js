const mentions = require('./commands/mentions');
const gif = require('./commands/gif');
const send = require('./commands/send');
const del = require('./commands/delete');
const anime = require('./commands/anime');
const { cp } = require('fs');

const commands = {
    mentions,
    gif,
    "delete": del
}

module.exports = async function (message) {
    // If message is from bot itself, ignores
    if(message.author.bot) return;

    // If message is mentioning everyone, ignores
    if(message.content.includes("@here") || message.content.includes("@everyone")) return;

    // If inline reply, ignores
    if(message.reference != null) return;

    // If message is all chat channel
    if(message.channel.id == process.env.ALLCHATCHANNEL || message.channel.id == process.env.TESTCHANNEL){
        // Save each incoming message words into the element of splitted variable
        var splitted = message.content.split(" ");

        // Remove the first element (the mention)
        splitted.shift();

        // Remove noises (white spaces)
        while(splitted[0] == ""){
            splitted.shift();
        }

        // Check if message has mentions
        message.mentions.members.forEach( _ => {
            mentions(message, splitted);
        });

        // Check if message has commands, skip if bot is mentioned later in the message
        if(message.mentions.has(process.env.BOTID) && splitted != 0 && !splitted.includes("<@!" + process.env.BOTID + ">")){
            var command = splitted[0].toLowerCase();

            if(command in commands){
                commands[splitted[0].toLowerCase()](message, splitted);
            } else if(message.channel.id == process.env.TESTCHANNEL && splitted[0].toLowerCase() == "send"){
                send(message, splitted);
            } else{
                message.channel.send(`No command \"${command}\" exists`);
            }

        }
    }

    // If message is anime chat channel
    if(message.channel.id == process.env.ANIMECHANNEL) {
        // Save each incoming message words into the element of splitted variable
        var splitted = message.content.split(" ");

        // Remove the first element (the mention)
        splitted.shift();

        // Remove noises (white spaces)
        while(splitted[0] == ""){
            splitted.shift();
        }

        // Check if message has bot mention, skip if bot is mentioned later in the message
        if(message.mentions.has(process.env.BOTID) && !splitted.includes("<@!" + process.env.BOTID + ">")){

            // Call delete function if the following command is delete
            if(splitted.length != 0 && splitted[0].toLowerCase() == "delete") {
                del(message, splitted);
            } else {
                anime(message, splitted);
            }
        }
    }
}