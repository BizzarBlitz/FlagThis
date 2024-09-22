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
		const existingFlag = flags.getExistingFlag(message, user)

		if (!existingFlag) {
			flags.addFlag(message, user)
			return "Message flagged for moderation"
		} else {
			existingFlag.remove()
			return "Message unflagged"
		}
	},
}