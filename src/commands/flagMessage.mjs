// @ts-check

import DiscordJS from "discord.js"
// import flags from "../flags.mjs"

export default {
	command: new DiscordJS.ContextMenuCommandBuilder()
		.setName("Flag/Unflag message")
		.setType(DiscordJS.ApplicationCommandType.Message),
	
	callback: interaction => {
		console.log(interaction)
		return "Message flagged"
	},
}