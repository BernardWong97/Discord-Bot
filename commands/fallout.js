const fetch = require('node-fetch');
const cheerio = require('cheerio');
const { MessageEmbed } = require('discord.js');

module.exports = async function(message){
    const url = 'https://nukacrypt.com';
    const response = await fetch(url);
    const body = await response.text();

    // Scrap HTML with cheerio
    const $ = cheerio.load(body);

    // Create embed message
    const messageEmbed = new MessageEmbed()
    .setColor('#FF00FF')
    .setTitle('Nuclear Codes')
    .setURL(url)
    .setDescription('Nukes Codes in [Fallout 76](https://www.falloutbuilds.com/fo76/) are weekly changing codes to launch nuclear missiles.\n\nNuke Codes always have 8 digits and are only valid in their corresponding nuclear silo: Alpha, Bravo, and Charlie. You can use the launch control terminal in any of these silos to specify a location on the [Fallout 76 Map](https://www.falloutbuilds.com/fo76/map/) as a target for your nuclear missile.')
    .addFields({ name: '\u200B', value: '\u200B'});

    const titles = []
    const codes = []

    // Get code title and code numbers from html elements
    $('#nuclearcodess').children().children().children().each((i, child) => {
        if(i == 2) {
            $(child).children().each((_, title) => {
                titles.push($(title).html());
            })
        }

        if(i == 3) {
            $(child).children().each((_, code) => {
                codes.push($(code).html());
            })
        }
    })

    for (let index = 0; index < 3; index++) {
        messageEmbed.addFields({ name: titles[index], value: codes[index], inline: true });
    }

    message.channel.send({ embeds: [messageEmbed] });
}


