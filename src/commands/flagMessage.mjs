// @ts-check

import DiscordJS from "discord.js"
import * as flags from "../flags.mjs"

export default {
	command: new DiscordJS.ContextMenuCommandBuilder()
		.setName("Flag/Unflag message")
		.setType(DiscordJS.ApplicationCommandType.Message),
	
	callback: interaction => {
		const message = interaction.targetMessage
		const user = interaction.user

		if (!flags.hasFlagged(message, user)) {
			flags.addFlag(message, user)
			return "Message flagged for moderation"
		} else {
			flags.removeFlag(message, user)
			return "Message unflagged"
		}
	},
}