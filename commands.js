const mentions = require('./commands/mentions');
const gif = require('./commands/gif');
const send = require('./commands/send');
const del = require('./commands/delete');

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
        // Save each incoming message words into the element of splitted variable.
        var splitted = message.content.split(" ");

        // Remove the first element (the mention)
        splitted.shift();

        // Remove noises (white spaces)
        while(splitted[0] == ""){
            splitted.shift();
        }

        // Check if message has mentions
        if(message.mentions.members.first()){
            mentions(message, splitted);
        }

        // Check if message has commands
        if(message.mentions.has(process.env.BOTID) && splitted != 0){ // !!! CHANGE ID HERE FOR TESTING !!!
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
}