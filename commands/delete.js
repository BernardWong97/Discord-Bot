module.exports = function(message, splitted) {
    var errorMsg = "Nononono... 你要打 \`delete\` 然後要刪多少個， like this: \`delete 2\`, of course, tag 我先";
    var num = Number(splitted[1]);

    if(splitted.length > 2 || isNaN(num)){
        message.channel.send(errorMsg);
    } else {
        errorMsg = "Sorry... I can only delete message that are under 14 days old.";
        message.channel.bulkDelete(num + 1).catch(() => message.channel.send(errorMsg));
    }
}