const fetch = require('node-fetch');
const mentions = require('./commands/mentions');

const commands = {
    mentions,
    gifs
}

module.exports = async function (message) {
    // If message is from bot itself, ignores
    if(message.author.bot) return;

    // If message is mentioning everyone, ignores
    if(message.content.includes("@here") || message.content.includes("@everyone")) return;

    // If message is test channel
    if(message.channel.id == process.env.TESTCHANNEL){
        // Save each incoming message words into the element of splitted variable.
        var splitted = message.content.toLowerCase().split(" ");

        // Remove the first element
        var id = splitted.shift();

        mentions(message, splitted);

        // Execute commands
        var command = "gifs";
        commands[command](message, splitted);
    }
}