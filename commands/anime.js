const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { title } = require('process');

module.exports = async function(message, splitted){
    var heheBoi = new MessageEmbed().setColor("#FF0000").setImage("https://media.giphy.com/media/dPEJxh06y4OTC/giphy.gif").setDescription("等我去偷數據。。。");
    var monthList = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    var seasonList = ["winter", "spring", "summer", "fall"];
    var selectedUrl = "";
    var jsonData = {};
    var isSearch = false;

    var res = {
        year: new Date().getFullYear(),
        season: get_season_now(new Date().getMonth(), seasonList),
    };

    var url = {
        main: "https://myanimelist.net/anime/season/",
        now: "http://api.jikan.moe/v4/seasons/now",
        season: "http://api.jikan.moe/v4/seasons/",
        search: "http://api.jikan.moe/v4/anime?q=",
        searchMain: "https://myanimelist.net/search/all?q="
    };

    // If there are no more inputs after command, set API url to this season's API
    if(splitted.length == 0) {
        selectedUrl = url["now"];
    } else {
        if (splitted[0] == "help") {
            var yearNow = new Date().getFullYear();
            var monthIndex = new Date().getMonth();
            var monthNow = monthList[monthIndex];
            var seasonNow = get_season_now(monthIndex, seasonList);

            message.channel.send(`你tag我先, 然後我就會給你這季新番，不然就打年份季節.\n\`\`\`Winter - January, February, March\nSpring - April, May, June\nSummer - July, August, September\nFall - October, November, December\`\`\`Like this: \`\`\`@BokBokGeh\n@BokBokGeh ${yearNow} ${monthNow}\n@BokBokGeh ${yearNow} ${monthIndex + 1}\n@BokBokGeh ${yearNow} ${seasonNow}\`\`\`不然你也可以tag我後寫你要找的動漫: \`\`\`@BokBokGeh Fate/Zero\`\`\``);
            return;
        } else {
            // Try to set API url to call other season's API, if command error, send error message
            try {
                res = season_query(monthList, seasonList, splitted);
                selectedUrl = `${url["season"]}${res["year"]}/${res["season"]}`;
            } catch(result) {
                isSearch = result;
                selectedUrl = url["search"] + splitted.join("%20") + "&page=1";
            }
        }
    }

    // Send loading message then pull data and send each embed anime messages
    message.channel.send({embeds: [heheBoi]}).then( async gifMessage => {
        // Fetch API url
        var response = await fetch(encodeURI(selectedUrl));
        var json = await response.json();
        var embedMsgArray = [];

        var headerTitle = `${res["year"]} ${capitalize(res["season"])} Season Top 10 Anime`;
        var headerUrl = `${url["main"]}${res["year"]}/${res["season"]}`

        if(isSearch) {
            headerTitle = `${splitted.join(" ")} Anime Search Result`;
            headerUrl = url["searchMain"] + splitted.join(" ") + "&cat=anime";
        }

        // First header message
        var titleMessage = new MessageEmbed()
            .setColor("0000FF")
            .setTitle(headerTitle)
            .setURL(encodeURI(headerUrl))
            .setAuthor({ name: 'MyAnimeList', iconURL: 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png', url: encodeURI(url["main"]) + `${res["year"]}/${res["season"]}` });

        // Slice data to 10 entries
        jsonData = json.data.slice(0, 10);

        if(isSearch) {
            jsonData = json.data.slice(0, 5);
        }

        // Loop through each anime json data
        jsonData.forEach(anime => {
            embedMsgArray.push(create_embed(anime));
        });

        // Delete loading message
        gifMessage.delete();
        
        message.channel.send({embeds: [titleMessage]}).then( titleMsg => {
            if (Object.keys(jsonData).length == 0) {
                titleMsg.delete();
                message.channel.send("沒有結果嘞...");
            } else {
                message.channel.send({embeds: embedMsgArray});
            }
        });
    }).catch(err => {
        console.log("ANIME ERROR: " + err);
        message.channel.send(`哎呀,有問題...<@${process.env.BERDID}> 緊急救援！！！`);
    });

    function season_query(monthList, seasonList, splitted){
        var isSearch = true;
    
        var regex = /^[0-9]+$/;
    
        var yr = splitted[0];
        var month = splitted[1] || "13";
    
        if(yr.length !== 4 || !regex.test(yr)) {
            throw isSearch;
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
                    throw isSearch;
            }
        } else {
            switch (seasonList.indexOf(month.toLowerCase())) {
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
            }

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
                    throw isSearch;
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

    function create_embed(anime) {
        anime = parse_json(anime);

        var author = {};

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
            author = {name: anime["studios"][0]["name"], url: anime["studios"][0]["url"]};
        }

        // Trim description
        var description = anime["synopsis"].split(" ").slice(0, 50).join(" ");

        if(anime["synopsis"].split(" ").length > 50) {
            description += "...";
        }

        // Create embed message for each anime
        var embedMessage = new MessageEmbed()
            .setColor("#FF0000")
            .setAuthor(author)
            .setTitle(anime["title"])
            .setDescription(anime["title_japanese"] + "\n" + anime["title_english"] + "\n\n" + description)
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
            .setURL(encodeURI(anime["url"]))
            .setImage(anime["images"]["jpg"]["image_url"])
            .setFooter({text: get_date(anime["aired"]["from"]) + " - " + get_date(anime["aired"]["to"])});

            return embedMessage;
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