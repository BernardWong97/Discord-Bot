import os
import discord
import random
import asyncio
from datetime import datetime


def read_token():
    with open("token.txt", "r") as f:
        lines = f.readlines()
        return lines[0].strip()


token = read_token()
client = discord.Client()

quotes = {"mentionNeng": "叫我的僕人做莫",
          "mentionShan": "Reply please",
          "reply": "Reply 你毛啊",
          "mentionBot": ["Yes~ 寶貝？", "什麽事情啊~ 親？", "叫我嗎~ 親愛的？"]}

channel_id = 692783419553218570
berd_id = f"<@!353165739852693506>"
neng_id = f"<@!474156371147882508>"
shanni_id = f"<@!356045052604317697>"

alarm = "16:00"


async def time_check():
    await client.wait_until_ready()
    channel = client.get_channel(channel_id)
    alarm_bool = True

    while not client.is_closed():
        try:
            message = "@everyone 起來小便咯!"
            time_format = "%H:%M"
            now = datetime.strftime(datetime.now(), time_format)
            diff = (datetime.strptime(alarm, time_format) - datetime.strptime(now, time_format)).total_seconds()

            if diff == 0 and alarm_bool:
                alarm_bool = False
                await channel.send(message)

            if diff != 0:
                alarm_bool = True

            await asyncio.sleep(1)
        except Exception as e:
            print(str(e))
            await asyncio.sleep(1)


@client.event
async def on_ready():
    print('Bot online as {0.user}'.format(client))
    client.loop.create_task(time_check())


@client.event
async def on_message(message):

    if message.author == client.user:
        return

    if neng_id in message.content:
        await message.channel.send(quotes["mentionNeng"])

    if shanni_id in message.content:
        await message.channel.send(quotes["mentionShan"])

    if "reply" in message.content.lower().split():
        await message.channel.send(quotes["reply"])

    if client.user.mentioned_in(message):
        if f"<@!{message.author.id}>" != neng_id:
            await message.channel.send(random.choice(list(quotes["mentionBot"])))
        else:
            await message.channel.send("滾！")

    if message.content.startswith("_send"):
        cmd = message.content.split()
        msg = " ".join(cmd[2:])

        try:
            if len(cmd) > 2 and cmd[1].isdigit():
                send_to_chnl = client.get_channel(int(cmd[1]))
                await send_to_chnl.send(msg)
            else:
                await message.channel.send("Wrong command. Need _send [channel id] [message]")
        except Exception:
            await message.channel.send("No such channel exists.")

    if message.content.startswith("_delete"):
        msg = message.content.split()

        if len(msg) == 2 and msg[1].isdigit():
            await message.channel.purge(limit=int(msg[1]) + 1)
        else:
            await message.channel.send("Nononono... 你要打 _delete 然後要刪多少個， like this: _delete 2")


client.run(token)
