module.exports = {
    name: 'interactionCreate',
    execute(interaction, client) {
        if (interaction.user.bot) return;

        if (interaction.isCommand()) {
            let commandName = interaction.commandName
            let command = client.commands.get(commandName)

            if (!command) return;

            try {
                command.slashExecute(interaction, client)
            } catch (error) {
                console.error(error)
                interaction.reply({ content: 'An error occured while executing that command on our end.' })
            }
        }

        // End of interactionCreate.js
    }
}