# Zems-Bot-Template
 Discord bot template using discord.js v13.6.0

## How to run the bot?
* Fill in the necessary fields in template.env then rename it to .env
* Download and setup: [NodeJS](https://nodejs.org)
* Installing the dependencies: `npm install`
* Deploying to guild: `npm run guild` (Recommended for testing)
* Deploying globally: `npm run global`
* Starting the bot: `npm start`

## What are those folders in commands?
* They're example categories with 1 .js command and data.json file each
* The folder names can be changed but try keeping the name in each data.json consistent with the folder names

## What are those files in events/discord?
* They're for interactionCreate/messageCreate/ready events. interactionCreate will run when someone runs a slash command or interacts with an interaction. messageCreate will run when someone sends a message or runs a command with the bot prefix. ready runs when the bot is started.

## What is deploy.js in utils?
* It's for deploying slash commands and allows you and other users to use them