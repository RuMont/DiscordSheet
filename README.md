<p align=center><img src="https://i.imgur.com/WRxHsVN.png"><img></p>

> Version 2.0 - Discord Bot that manages a Google Sheets File

A Discord Bot that extracts information from a Google Sheets File. It was created to manage a ~~*New World's*~~ World of Warcraft Classic players list.

## Changelog
    2022-09-04
    - Spreadsheet is now dedicated to World of Warcraft Classic
    - Moved the entire codebase from JavaScript to TypeScript
    - Created a folder structure.
    - Moved from functional programming to OOP.
    - Improved security.
    - Improved the process of getting the OAuth2 token.
    - Changed from config.json to a .env file and a config folder.
    - Upgraded from Discord.js v13 to v14, API version is 10.
    - Now commands are not message based but interaction based.

## About this project

This project uses the Google Sheets API v4 and Discord API 10.

Requires node.js v16+.

Requires a [Google Cloud Console](https://console.cloud.google.com) project to generate credentials.

## Prerequisites

You first need to create a project in [Google Cloud Console](https://console.cloud.google.com) and get the credentials.json file. Place this JSON file inside __src\config__.

After getting the credentials, you need to create a [Discord Bot app](https://discord.com/developers/applications).

You will also need the spreadsheet URL you want to work in.

Copy the .env.example and rename it to .env. You need to fill the variables with your data.

Now we can move to the code.

## Usage

To start running this project you need to execute `npm install` to install dependencies.

You can run the bot in development mode or in production mode.

If you want to run the bot in development mode just execute `npm run dev`.

Otherwise, you can transpile the TypeScript code and have a JavaScript Bot with `tsc --build`. This will generate a new **\dist** folder.

## Available commands

- /showplayers - Shows the entire list of players
- /show - Shows a selector with all the players inside the sheet.
- /test - A test command showing a button and a selector

## Useful references
- [Google Sheets API](https://developers.google.com/sheets/api/quickstart/nodejs)
- [How to create a Google Cloud Project](https://developers.google.com/workspace/guides/create-project)
- [Discord.js Guide](https://discordjs.guide/#before-you-begin)
- [Discord.js Documentation](https://discord.js.org/#/docs/main/stable/general/welcome)
- [Discord API Documentation](https://discord.com/developers/docs/intro)
