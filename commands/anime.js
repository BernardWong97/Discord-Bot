const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = async function(message, splitted){
    var heheBoi = new MessageEmbed().setColor("#FF0000").setImage("https://media.giphy.com/media/dPEJxh06y4OTC/giphy.gif").setDescription("等我去偷數據。。。")
    var monthList = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    var seasonList = ["winter", "spring", "summer", "fall"];
    var selectedUrl = "";
    var jsonData = {}

    var res = {
        year: new Date().getFullYear(),
        season: get_season_now(new Date().getMonth(), seasonList),
    }

    var url = {
        main: "https://myanimelist.net/anime/season/",
        now: "http://api.jikan.moe/v4/seasons/now",
        season: "http://api.jikan.moe/v4/seasons/"
    }

    // Remove the first element (the command)
    splitted.shift();

    // If there are no more inputs after command, set API url to this season's API
    if(splitted.length == 0) {
        selectedUrl = url["now"];
    } else {
        // Try to set API url to call other season's API, if command error, send error message
        try {
            res = season_query(monthList, seasonList, splitted)
            selectedUrl = url["season"] + `${res["year"]}/${res["season"]}`;
        } catch(err) {
            message.channel.send(err);
            return;
        }
    }

    // Send loading message then pull data and send each embed anime messages
    message.channel.send({embeds: [heheBoi]}).then( async gifMessage => {
        // Fetch API url
        var response = await fetch(selectedUrl);
        var json = await response.json();
        var embedMsgArray = [];

        // First header message
        var titleMessage = new MessageEmbed()
            .setColor("0000FF")
            .setTitle(`${res["year"]} ${capitalize(res["season"])} Season Top 10 Anime`)
            .setURL(url["main"] + `${res["year"]}/${res["season"]}`)
            .setAuthor({ name: 'MyAnimeList', iconURL: 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png', url: url["main"] + `${res["year"]}/${res["season"]}` });

        // Slice data to 10 entries
        jsonData = json.data.slice(0, 10);

        // Loop through each anime json data
        jsonData.forEach(anime => {
            anime = parse_json(anime);

            var author = {}

            // Validate author
            if (anime["studios"].length == 0) {
                if(anime["producers"].length != 0) {
                    author = {name: anime["producers"][0]["name"], url: anime["producers"][0]["url"]};
                } else if(anime["licensors"].length != 0) {
                    author = {name: anime["licensors"][0]["name"], url: anime["licensors"][0]["url"]};
                } else {
                    author = {name: "?"};
                }
            } else {
                author = {name: anime["studios"][0]["name"], url: anime["studios"][0]["url"]}
            }

            // Create embed message for each anime
            var embedMessage = new MessageEmbed()
                .setColor("#FF0000")
                .setAuthor(author)
                .setTitle(anime["title"])
                .setDescription(anime["title_japanese"] + "\n" + anime["title_english"] + "\n\n" + anime["synopsis"].split(" ").slice(0, 50).join(" ") + "...")
                .addFields(
                    {name: "Episodes", value: anime["episodes"].toString()},
                    {name: "Duration", value: anime["duration"]},
                    {name: "Rating", value: anime["rating"]},
                    {name: "Type", value: anime["type"], inline: true},
                    {name: "Source", value: anime["source"], inline: true},
                    {name: "Status", value: anime["status"], inline: true},
                    {name: "Score", value: anime["score"].toString(), inline: true},
                    {name: "Rank", value: anime["rank"].toString(), inline: true},
                    {name: "Scored_by", value: anime["scored_by"].toString(), inline: true},
                    {name: "Popularity", value: anime["popularity"].toString(), inline: true},
                    {name: "Members", value: anime["members"].toString(), inline: true},
                    {name: "Favorites", value: anime["favorites"].toString(), inline: true}
                )
                .setURL(anime["url"])
                .setImage(anime["images"]["jpg"]["image_url"])
                .setFooter({text: get_date(anime["aired"]["from"]) + " - " + get_date(anime["aired"]["to"])})


            embedMsgArray.push(embedMessage);
        });

        // Delete loading message
        gifMessage.delete();
        
        message.channel.send({embeds: [titleMessage]}).then(() => {
            message.channel.send({embeds: embedMsgArray});
        });
    }).catch(err => {
        console.log("ANIME ERROR: " + err);
        message.channel.send(`哎呀,有問題...<@${process.env.BERDID}> 緊急救援！！！`);
    });

    function season_query(monthList, seasonList, splitted){
        var yearNow = new Date().getFullYear();
        var monthIndex = new Date().getMonth()
        var monthNow = monthList[monthIndex];
        var seasonNow = get_season_now(monthIndex, seasonList)
        var errorMsg = `Nononono... 你要打 \`anime\` 然後要看第幾年幾月份還是季節.\nLike this: \`\`\`anime ${yearNow} ${monthNow}\nanime ${yearNow} ${monthIndex + 1}\nanime ${yearNow} ${seasonNow}\`\`\`\n沒寫時間就可以看現在的, of course, tag 我先.`;
    
        var regex = /^[0-9]+$/;
    
        var yr = splitted[0]
        var month = splitted[1]
    
        if(yr.length !== 4 || !regex.test(yr)) {
            throw errorMsg;
        }
    
        if(regex.test(month)) {
            switch (parseInt(month)) {
                case 1:
                case 2:
                case 3:
                    return {year: yr, season: seasonList[0]};
                case 4:
                case 5:
                case 6:
                    return {year: yr, season: seasonList[1]};
                case 7:
                case 8:
                case 9:
                    return {year: yr, season: seasonList[2]};
                case 10:
                case 11:
                case 12:
                    return {year: yr, season: seasonList[3]};
                default:
                    throw errorMsg;
            }
        } else {
            switch (monthList.indexOf(month.toLowerCase())) {
                case 0:
                case 1:
                case 2:
                    return {year: yr, season: seasonList[0]};
                case 3:
                case 4:
                case 5:
                    return {year: yr, season: seasonList[1]};
                case 6:
                case 7:
                case 8:
                    return {year: yr, season: seasonList[2]};
                case 9:
                case 10:
                case 11:
                    return {year: yr, season: seasonList[3]};
                default:
                    throw errorMsg;
            }
        }
    }
    
    function get_season_now(monthIndex, seasonList) {
        switch (monthIndex) {
            case 0:
            case 1:
            case 2:
                return seasonList[0];
            case 3:
            case 4:
            case 5:
                return seasonList[1];
            case 6:
            case 7:
            case 8:
                return seasonList[2];
            case 9:
            case 10:
            case 11:
                return seasonList[3];
        }
    }
    
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    function get_date(str) {
        if(str == "?") {
            return str
        }
    
        var currDate = new Date(str);
        var yyyy = currDate.getFullYear();
        var mm = currDate.getMonth() + 1;
        var dd = currDate.getDate();
    
        if (dd < 10) dd = "0" + dd;
        if (mm < 10) dd = "0" + mm;
    
        return `${dd}/${mm}/${yyyy}`;
    }
    
    function parse_json(anime) {
        var replacer = (_, value) => 
            String(value) === "null" || String(value) === "undefined" ? "?" : value;
      
      return JSON.parse(JSON.stringify(anime, replacer));
    }
}