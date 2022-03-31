<div id="top"/>

[![LinkedIn][linkedin-shield]][linkedin-url]
[![MIT License][license-shield]][license-url]


<br />
<div align="center">
  <a href="https://discord.com">
    <img src="https://discord.com/assets/3437c10597c1526c3dbd98c737c2bcae.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">BokBokGeh Discord Bot</h3>

  <p align="center">
    A personal Discord server's bot for fun.
    <br />
    <br />
    <a href="https://github.com/BernardWong97/Discord-Bot/issues">Report Bug</a>
    ·
    <a href="https://github.com/BernardWong97/Discord-Bot/issues">Request Feature</a>
  </p>
</div>


<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#disclaimer">Disclaimer</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#suggestion">Suggestion</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


## About The Project

[![Product Name Screen Shot][product-screenshot]](https://github.com/BernardWong97/Discord-Bot)

There are many great Discord Bot available on <a href="https://top.gg">top.gg</a>. However, I didn't find one that really suited my needs so I created this personalized Discord Bot for me and my friends to play around and have fun. I want to create a Discord Bot that will interact with my friend in such a unique manner and humour only we ourselves will understand.

Of course, this bot is far from complete, it will continuously improve and enhance its features and this is what I love to do, exploring new features for every version **discord.js** added and learning new things regarding **Node.js** and even **Javascript** itself!


<p align="right">(<a href="#top">back to top</a>)</p>


### Built With

* [Node.js v17](https://nodejs.org/)
* [discord.js v13](https://discord.js.org/)

<p align="right">(<a href="#top">back to top</a>)</p>


## Disclaimer

This application is not intended to let any users download and use since it is designed for my personal use only since it needs quite a number of environment variables to be functional but if any individuals are interested in the source code, feel free to use the source code as it is available under the <a href="https://github.com/BernardWong97/Discord-Bot/blob/master/LICENSE.txt">MIT license</a>.


## Usage

This bot is only operatable on my Discord server since most of the environmental variables are private, fixed and sensitive. The bot has some of these features below and will be continuously updated for more features and improvements:

* Whenever a server member mentions other members (including the bot itself) on a specific channel, it will send one of the messages specifically tailored to that mentioned individual.
* Server members can mention it and follow up with a command listed below:
  * ***gif [keywords (optional)]*** - Call [Tenor](https://tenor.com) API and select a random GIF from the result with ***[keywords]***. If there is no keyword, it will search for chicken GIFs.
  * ***delete [number (required)]*** - Bulk delete ***[number]*** of messages from the channel that the command is sent. The ***[number]*** does not include this command line and this command line will be auto-deleted as well.
  * ***send [channel id] [message]*** - Send the ***[message]*** to the channel with ***[channel id]***. This command will only work on a specific channel to prevent any abuse.
* On a specific channel, when mentioning the bot, it will call [Jikan API](https://jikan.moe), an unofficial open-source wrapper API that parses [MyAnimeList](https://myanimelist.net) website to get detailed data on animes. There are different ways to tell the bot what to do in this specific channel:
  * When mentioning the bot without any more text, it will send 10 embedded messages consisting of details of the current seasonal animes.
  * When mentioning the bot following with ***[year]*** ***[month/season]***, it will send 10 embedded messages consisting of details of the ***[year]*** ***[month/season]***'s animes.
  * When mentioning the bot following with any ***[text]*** other than year and month/season, it will send 5 search results of anime details with the keyword ***[text]*** in embedded messages.

Keep in mind that these features are constantly improving and increasing to make it a fun and better bot.

<p align="right">(<a href="#top">back to top</a>)</p>


## Roadmap

- [x] Mention members send quotes
- [x] Send GIFs
- [x] Delete messages
- [x] Anime API
- [ ] Discord server slash commands
- [ ] Improve architecture, abstract functions to be more dynamic

See the [open issues](https://github.com/BernardWong97/Discord-Bot/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>


## Suggestion

Suggestions are what make the bot be better over time and gave me a chance to learn, inspire, and create. Any suggestions you make are **greatly appreciated**.

If you have a suggestion that would make this better, you can simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

<p align="right">(<a href="#top">back to top</a>)</p>


## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>


## Contact

LinkedIn: [Bernard Wong][linkedin-url]

Github: [BernardWong97][github-me]

Email: [ben.wc88@gmail.com](mailto:ben.wc88@gmail.com)

Project Link: [https://github.com/BernardWong97/Discord-Bot][github-bot]

<p align="right">(<a href="#top">back to top</a>)</p>


[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/BernardWong97/Discord-Bot/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/bernard-wong-404231152/
[product-screenshot]: attachments/profile_picture.jpeg
[github-bot]: https://github.com/BernardWong97/Discord-Bot
[github-me]: https://github.com/BernardWong97
