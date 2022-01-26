module.exports = {
    name: 'messageCreate',
    async execute(message) {
        const client = message.client;
        if (message.author.bot) return;

        if (
            message.content.startsWith(`<@${process.env['BOT_ID']}>`) ||
            message.content.startsWith(`<@!${process.env['BOT_ID']}>`)
        ) return message.reply(`Hi! My prefix is \`${client.prefix}\`. You can also use my slash commands with /.`);

        const args = message.content
            .slice(process.env['PREFIX'].length)
            .trim()
            .split(' ');

        if (message.content.startsWith(client.prefix)) {
            const commandName = args.shift().toLowerCase();
            const command = client.commands.get(commandName);
            if (!command) return;

            if (!message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) return;

            try {
                command.execute(message, args, client);
            } catch (error) {
                console.error(error);
                message.reply('There was an error trying to run that command!');
            }

        }

        // End of messageCreate.js
    }
}