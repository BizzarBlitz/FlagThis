// @ts-check

import DiscordJS from "discord.js"
import * as flags from "../flags.mjs"

export default {
	command: new DiscordJS.SlashCommandSubcommandBuilder()
		.setName("remove")
		.setDescription("Removes a specified action by its ID")
		.addIntegerOption(new DiscordJS.SlashCommandIntegerOption()
			.setName("id")
			.setDescription("The ID of the action to remove")
			.setRequired(true)
			.setChoices(
				{name: "1", value: 1},
				{name: "2", value: 2},
				{name: "3", value: 3},
				{name: "4", value: 4},
				{name: "5", value: 5},
			)
		),

	callback: interaction => {
		const messageFlags = flags.getMessageFlags(interaction.targetMessage.author.id, interaction.targetId)

		return messageFlags ? flags.stringifyMessageFlags(messageFlags) : "No message flags"
	},
}