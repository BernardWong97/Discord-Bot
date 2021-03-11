#coding=utf-8

import discord

def read_token():
    with open("token.txt", "r") as f:
        lines = f.readlines()
        return lines[0].strip()

token = read_token()
client = discord.Client()

@client.event
async def on_message(message):

    if message.content.startswith("_delete"):
        msg = message.content.split()

        if len(msg) == 2 and msg[1].isdigit():
            await message.channel.purge(limit=int(msg[1]) + 1)
        else:
            await message.channel.send("Nononono... 你要打 _delete 然後要刪多少個， like this: _delete 2")


client.run(token)
