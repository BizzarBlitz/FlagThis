// @ts-check

import DiscordJS from "discord.js"
import * as Settings from "../settings.mjs"

export default {
	command: new DiscordJS.SlashCommandSubcommandBuilder()
		.setName("timeout")
		.setDescription("Timeout the flagged message author")
		.addIntegerOption(new DiscordJS.SlashCommandIntegerOption()
			.setName("flags")
			.setDescription("The number of flags required to trigger this action")
			.setRequired(true)
		)
		.addNumberOption(new DiscordJS.SlashCommandNumberOption()
			.setName("duration")
			.setDescription("How long the timeout should last, in hours")
		)
		.addChannelOption(new DiscordJS.SlashCommandChannelOption()
			.setName("log-channel")
			.setDescription("The channel to log the action to (omit for no logging)")
			.addChannelTypes(Settings.Constants.logChannelTypes)
		),
	
	callback: interaction => {
		const user = interaction.user

		return "action add timeout"
	},
}