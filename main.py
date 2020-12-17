import os
import discord
import random


def read_token():
    with open("token.txt", "r") as f:
        lines = f.readlines()
        return lines[0].strip()


def get_all_members_ids(guild):
    return guild.member_count


token = read_token()

client = discord.Client()

quotes = {"mentionNeng": "叫我的僕人做莫",
          "mentionShan": "Reply please",
          "reply": "Reply 你毛啊",
          "mentionBot": ["Yes~ 寶貝？", "什麽事情啊~ 親？", "叫我嗎~ 親愛的？"]}

berdId = f"<@!353165739852693506>"
nengId = f"<@!474156371147882508>"
shanniId = f"<@!356045052604317697>"


@client.event
async def on_ready():
    print('We have logged in as {0.user}'.format(client))


@client.event
async def on_message(message):

    if message.author == client.user:
        return

    if nengId in message.content:
        await message.channel.send(quotes["mentionNeng"])

    if shanniId in message.content:
        await message.channel.send(quotes["mentionShan"])

    if "reply" in message.content.lower().split():
        await message.channel.send(quotes["reply"])

    if client.user.mentioned_in(message):
        if f"<@!{message.author.id}>" != nengId:
            await message.channel.send(random.choice(list(quotes["mentionBot"])))
        else:
            await message.channel.send("滾！")

    if message.content.startswith("_delete"):
        msg = message.content.split()

        if len(msg) == 2 and msg[1].isdigit():
            await message.channel.purge(limit=int(msg[1]) + 1)
        else:
            await message.channel.send("Nononono... 你要打 _delete 然後要刪多少個， like this: _delete 2")

client.run(token)
