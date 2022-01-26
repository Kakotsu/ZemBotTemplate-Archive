const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();
const fs = require('fs');
const guild = process.argv[2]
const rest = new REST().setToken(process.env['TOKEN']);

const commands = [];

const guildId = `${process.env['GUILD_ID']}`;
const clientId = `${process.env['BOT_ID']}`;

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
    const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter((file) => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`../commands/${folder}/${file}`);
        commands.push(command.data.toJSON());
    }
}

(async () => {
    try {
        console.log(`Started refreshing application (/) commands ${guild === 'guild' ? 'in guild' : guild === 'global' ? 'globally' : 'ERROR'}.`);

        if (guild === 'guild') {
            await rest.put(
                Routes.applicationGuildCommands(clientId, guildId), { body: commands }
            );
        } else if (guild === 'global') {
            await rest.put(
                Routes.applicationCommands(clientId), { body: commands }
            );
        }

        console.log(`Successfully reloaded application (/) commands ${guild === 'guild' ? 'in guild' : guild === 'global' ? 'globally' : ''}.`);
    } catch (error) {
        console.error(error);
    }
})();