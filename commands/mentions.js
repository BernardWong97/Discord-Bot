module.exports = function(message, splitted) {
    // Quotes
    var selfQuotes = ["Why do you tag me?", "什麽事情啊？親？", "叫我嗎, 寶貝?", "😘", "❤️"];
    var shooQuotes = ["滾!", "走開", "不要叫我", "打擾貴人吃玉米你想被啄嗎？", "💩"];
    var berdQuotes = ["叫我大哥幹嘛？", "不見去", "把我電子化的人"];
    var nengQuotes = ["叫我的僕人做莫？", "每天幫我梳毛的人", "Ewww"];
    var shanniQuotes = ["Reply please", "Do your job, I need electricity to go online"];

    // Libraries
    var quotes = {
        mentionBot: selfQuotes,
        mentionBotNeng: shooQuotes,
        mentionBerd: berdQuotes,
        mentionNeng: nengQuotes,
        mentionShanni: shanniQuotes
    }

    // If message only mention bot without any more words
    if(message.mentions.has(process.env.BOTID)){
        if(message.author.id != process.env.NENGID){
            sendQuote(quotes["mentionBot"]);
        }
        else{
            sendQuote(quotes["mentionBotNeng"]);
        }

    }

    // Mention Berd
    userMention(process.env.BERDID, "mentionBerd");

    // Mention Neng
    userMention(process.env.NENGID, "mentionNeng");

    // Mention Shen
    userMention(process.env.SHANNIID, "mentionShanni");

    function userMention(id, quoteKey){
        if(message.mentions.has(id)){
            sendQuote(quotes[quoteKey]);
        }
    }

    function sendQuote(arr){
        // Select a random quote from library and send
        var random = Math.floor(Math.random() * arr.length);
        var quote = arr[random];
        message.channel.send(quote);
    }
}