// @ts-check

import DiscordJS from "discord.js"

export default {
	command: new DiscordJS.SlashCommandSubcommandBuilder()
		.setName("ban")
		.setDescription("Ban the flagged message author")
		.addIntegerOption(new DiscordJS.SlashCommandIntegerOption()
			.setName("flags")
			.setDescription("The number of flags required to trigger this action")
			.setRequired(true)
		)
		.addNumberOption(new DiscordJS.SlashCommandNumberOption()
			.setName("delete-message-history")
			.setDescription("Range of messages to delete, in hours (omit for no message deletion)")
			.setMaxValue(24 * 7) // Max value is a week
		)
		.addChannelOption(new DiscordJS.SlashCommandChannelOption()
			.setName("log-channel")
			.setDescription("The channel to log the action to (omit for no logging)")
		),

	callback: interaction => {
		const user = interaction.user

		return "action add ban"
	},
}