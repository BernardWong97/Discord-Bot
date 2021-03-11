const fetch = require('node-fetch');

module.exports = async function(message, splitted){
    var keywords = 'chicken';

    if(splitted.length > 1){
        keywords = splitted.slice(1, splitted.length).join(" ");
    }

    var url = `https://g.tenor.com/v1/search?q=c${keywords}&key=${process.env.TENORKEY}&limit=10`;
    var response = await fetch(url);
    var json = await response.json();
    var index = random_num(json.results.length);

    message.channel.send(json.results[index].url);
}

function random_num(max_length){
    return Math.floor(Math.random() * max_length);
} 