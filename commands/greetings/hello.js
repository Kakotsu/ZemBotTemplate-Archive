const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'hello',
    description: 'Say hello to the bot!',
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Say hello to the bot!'),
    async slashExecute(interaction, client) {
        interaction.reply({ content: `Hi there! I\'m ${client.user.username}.` })
    },
    async execute(message, args, client) {
        message.reply({ content: `Hi there! I\'m ${client.user.username}.` })
    }
}