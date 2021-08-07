const { MessageAttachment } = require("discord.js");

module.exports = function(message, splitted) {
    // Quotes
    var selfQuotes = ["Why do you tag me?", "什麽事情啊？親？", "叫我嗎, 寶貝?", "😘", "❤️"];
    var shooQuotes = ["滾!", "走開", "不要叫我", "打擾貴人吃玉米你想被啄嗎？", "💩"];
    var berdQuotes = ["叫我大哥幹嘛？", "https://tenor.com/4Bne.gif", "把我電子化的人"];
    var nengQuotes = ["叫我的僕人做莫？", "每天幫我梳毛的人", "Ewww"];
    var shanniQuotes = ["Reply please", "Do your job, I need electricity to go online", "Gorgc's child"];
    var shenQuotes = ["シルフィエットの夫", "癡漢", "變態", "https://tenor.com/view/mushoku-tensei-mushoku-tensei-isekai-anime-gif-20583298"];
    var cicakQuotes = ["https://10yearchallenge.files.wordpress.com/2012/05/henhunter2.jpg", "https://tenor.com/48mx.gif", "我最愛的食物"];
    var marvinQuotes = ["討人tips的人", "黏土人比朋友還多", "初級演員", "Attachment-marvinbest.gif"];
    var shangQuotes = ["即是小丑，即是演員", "🤡", "https://tenor.com/6nYf.gif"]

    // Libraries
    var quotes = {
        mentionBot: selfQuotes,
        mentionBotNeng: shooQuotes,
        mentionBerd: berdQuotes,
        mentionNeng: nengQuotes,
        mentionShanni: shanniQuotes,
        mentionShen: shenQuotes,
        mentionCicak: cicakQuotes,
        mentionMarvin: marvinQuotes,
        mentionShang: shangQuotes
    }

    var found = false;

    // If message only mention bot without any more words
    if(message.mentions.has(process.env.BOTID) && splitted.length == 0){
        if(message.author.id != process.env.NENGID){
            sendQuote(quotes["mentionBot"]);
        }
        else{
            sendQuote(quotes["mentionBotNeng"]);
        }

        found = true;
    // If message mention bot in general
    } else if(message.mentions.has(process.env.BOTID)){
        found = true;
    }

    // Mentions
    userMention(process.env.BERDID, "mentionBerd");
    userMention(process.env.NENGID, "mentionNeng");
    userMention(process.env.SHANNIID, "mentionShanni");
    userMention(process.env.SHENID, "mentionShen");
    userMention(process.env.CICAKID, "mentionCicak");
    userMention(process.env.MARVINID, "mentionMarvin");
    userMention(process.env.SHANGID, "mentionShang");

    // If mentioned user not in library, send quote
    if(!found){
        message.channel.send(`<@${process.env.BERDID}> 沒有教我要怎樣應gok...`);
    }

    function userMention(id, quoteKey){
        // If mention matches id, send quote
        if(message.mentions.has(id)){
            sendQuote(quotes[quoteKey]);
            found = true;
        }
    }

    function sendQuote(arr){
        // Select a random quote from library and send
        var random = Math.floor(Math.random() * arr.length);
        var quote = arr[random];

        if(String(quote).startsWith("Attachment")){
            var fileName = String(quote).split("-")[1];
            quote = new MessageAttachment("./attachments/" + fileName)
        }
            

        message.channel.send(quote);
    }
}