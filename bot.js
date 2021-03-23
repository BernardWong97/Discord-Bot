// Imports
const Discord = require('discord.js');
const commandHandler = require('./commands');
const cron = require('cron');
const mysql = require('mysql');
require("dotenv").config();

// Instantiate
global.client = new Discord.Client();

// Login
client.login(process.env.TOKEN); // !!! CHANGE TOKEN HERE FOR TESTING !!!

// Terminal debug
process.stdout.write('Warming up Bok Bok Geh');
var interval = client.setInterval(()=>{
    process.stdout.write(".");
}, 500);

// Logged in
client.on('ready', () => {
    client.clearInterval(interval);
    process.stdout.write(`\nLogged in as ${client.user.tag}!\n`);
    process.stdout.write('Bok Bok Geh is listening for Discord messages!\n');

    // Daily interval job
    var morningCall = new cron.CronJob('00 00 06 * * *', wake_up);
    morningCall.start();

    // var birthdayCall = new cron.CronJob('00 00 00 * * *', birthday);
    // birthdayCall.start();
    birthday();
});

// Listen for messages
client.on('message', commandHandler);

function wake_up(){
    // WAKE UP
    var channel = client.channels.cache.get(process.env.ALLCHATCHANNEL);
    channel.send("@everyone BOK BOK BOK WAKE UP!");
}

function birthday(){
    // HAPPY BIRTHDAY
    var date = new Date();
    var today = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0].slice(5);

    // Connect to MYSQL
    var conn = mysql.createConnection({
        host: process.env.MYSQLHOST,
        user: process.env.MYSQLUSER,
        password: process.env.MYSQLPW,
        database: process.env.MYSQLDB
    });

    today = "06-05";

    conn.connect(err => {
        if(err) return console.log(err);

        console.log("Connected to MYSQL");

        conn.query(`SELECT * FROM ${process.env.MYSQLTABLE} WHERE dob LIKE "%${today}"`, (err, res, fields) => {
            if(err) return console.log(err);

            res.forEach(member => {
                date = new Date(member.dob);
                var birthdate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0].slice(5);

                if(birthdate == today){
                    var channel = client.channels.cache.get(process.env.TESTCHANNEL);
                    channel.send(`Happy Birthday <@${member.id}> !!!`);
                    channel.send('https://tenor.com/bjZJy.gif');
                }
            });
        });
    });
}