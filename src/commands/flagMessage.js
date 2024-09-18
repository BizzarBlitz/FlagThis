// @ts-check

const DiscordJS = require("discord.js")

module.exports = {
	command: new DiscordJS.ContextMenuCommandBuilder()
		.setName("Flag/Unflag message")
		.setType(DiscordJS.ApplicationCommandType.Message),
	
	callback: async interaction => {
		await interaction.reply({
			content: "Dawg",
			ephemeral: true,
		})
	}
}