// @ts-check

import DiscordJS from "discord.js"
import * as flags from "../flags.mjs"

export default {
	command: new DiscordJS.ContextMenuCommandBuilder()
		.setName("View message flags")
		.setType(DiscordJS.ApplicationCommandType.Message),

	callback: interaction => {
		const messageFlags = flags.getMessageFlags(interaction.targetMessage.author.id, interaction.targetId)

		return messageFlags ? flags.stringifyMessageFlags(messageFlags) : "No message flags"
	},
}