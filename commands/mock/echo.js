const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'echo',
    description: 'Repeats after you!',
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Repeats after you!')
        .addStringOption(option =>
            option.setName('content')
                .setDescription('What you want the bot to repeat.')),
    async slashExecute(interaction) {
        const content = interaction.options.getString('content');

        const embed = new MessageEmbed()
            .setTitle(`${content}`)
            .setDescription('')

        interaction.reply({ embeds: [embed] });
    },
    async execute(message, args) {
        const content = args.join(' ');

        const embed = new MessageEmbed()
            .setTitle(`${content}`)
            .setDescription('')

        message.reply({ embeds: [embed] });
    }
}