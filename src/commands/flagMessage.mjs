// @ts-check

import DiscordJS from "discord.js"
import * as flags from "../flags.mjs"
import * as Settings from "../settings.mjs"

export default {
	command: new DiscordJS.ContextMenuCommandBuilder()
		.setName("Flag/Unflag message")
		.setType(DiscordJS.ApplicationCommandType.Message),
	
	callback: interaction => {
		const message = interaction.targetMessage

		if (Date.now() - message.createdTimestamp > Settings.Configurable.messageFlaggableHours * 3600_000) {
			return `Cannot flag messages ${Settings.Configurable.messageFlaggableHours} hours past their creation`
		}

		const user = interaction.user
		const existingFlag = flags.getExistingFlag(message, user)

		if (!existingFlag) {
			flags.addFlag(message, user)
			return "Message flagged for moderation"
		} else {
			flags.removeFlag(message, user)
			return "Message unflagged"
		}
	},
}