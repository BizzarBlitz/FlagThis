// @ts-check

const DiscordJS = require("discord.js")

module.exports = {
	command: new DiscordJS.ContextMenuCommandBuilder()
		.setName("Flag/Unflag message")
		.setType(DiscordJS.ApplicationCommandType.Message),
	
	callback: interaction => {
		// [TODO] Flag/Unflag message
		return "Message flagged"
	},
}