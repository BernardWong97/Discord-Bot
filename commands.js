const mentions = require('./commands/mentions');
const gif = require('./commands/gif');
const send = require('./commands/send');

const commands = {
    mentions,
    gif,
    send
}

module.exports = async function (message) {
    // If message is from bot itself, ignores
    if(message.author.bot) return;

    // If message is mentioning everyone, ignores
    if(message.content.includes("@here") || message.content.includes("@everyone")) return;

    // If message is test channel
    if(message.channel.id == process.env.TESTCHANNEL){
        // Save each incoming message words into the element of splitted variable.
        var splitted = message.content.split(" ");

        // Remove the first element
        splitted.shift();

        // Check if message has mentions
        if(message.mentions.members.first()){
            mentions(message, splitted);
        }

        // Check if message has commands
        if(message.mentions.has(process.env.BOTID) && splitted != 0){
            commands[splitted[0].toLowerCase()](message, splitted);
        }
    }
}