const Discord = require('discord.js');
const { Intents, Collection } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const client = new Discord.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    allowedMentions: { parse: ['users'] }
});

client.commandCategories = new Collection();
client.commands = new Discord.Collection();
client.prefix = process.env['PREFIX'];

const commandFolders = fs.readdirSync('./commands');
const discordEventFiles = fs.readdirSync('./events/discord').filter((file) => file.endsWith('.js'));

for (const folder of commandFolders) {
    const data = JSON.parse(fs.readFileSync(`./commands/${folder}/data.json`));
    const name = data.name;
    const description = data.description;

    let commands = [];

    const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter((file) => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
        commands.push(command);
    }

    client.commandCategories.set(folder, [name, description, commands]);
}

for (const file of discordEventFiles) {
    const event = require(`./events/discord/${file}`);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

client.login(process.env['TOKEN']);