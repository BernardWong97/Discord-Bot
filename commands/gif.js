const fetch = require('node-fetch');

module.exports = async function(message, splitted){
    // Default keyword
    var keywords = 'chicken';

    // If there are words after gif command, join into a string
    if(splitted.length > 1){
        keywords = splitted.slice(1, splitted.length).join(" ");
    }

    // Fetch tenor gif
    var url = `https://g.tenor.com/v1/search?q=c${keywords}&key=${process.env.TENORKEY}&limit=10`;
    var response = await fetch(url);
    var json = await response.json();
    var index = random_num(json.results.length);

    // Send URL
    message.channel.send(json.results[index].url);
}

function random_num(max_length){
    return Math.floor(Math.random() * max_length);
} 