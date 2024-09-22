// @ts-check

import DiscordJS from "discord.js"
import * as Settings from "../settings.mjs"

export default {
	command: new DiscordJS.SlashCommandSubcommandBuilder()
		.setName("log")
		.setDescription("Log the flagged message to the specified channel")
		.addIntegerOption(new DiscordJS.SlashCommandIntegerOption()
			.setName("flags")
			.setDescription("The number of flags required to trigger this action")
			.setRequired(true)
		)
		.addChannelOption(new DiscordJS.SlashCommandChannelOption()
			.setName("channel")
			.setDescription("The channel to log the message to")
			.setRequired(true)
			.addChannelTypes(Settings.Constants.logChannelTypes)
		),

	callback: interaction => {
		const user = interaction.user

		return "action add log"
	},
}