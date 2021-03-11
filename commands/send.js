module.exports = function(message, splitted) {
    var word = "🐓";
    var channel_id = splitted[1]

     // If there are words after gif command, join into a string
    if(splitted.length > 2){
        word = splitted.slice(2, splitted.length).join(" ");
    }
    
    var channel = client.channels.cache.get(channel_id);
    channel.send(word);
}