// @ts-check

import DiscordJS from "discord.js"

export default {
	command: new DiscordJS.SlashCommandSubcommandBuilder()
		.setName("kick")
		.setDescription("Kick the flagged message author from the server")
		.addIntegerOption(new DiscordJS.SlashCommandIntegerOption()
			.setName("flags")
			.setDescription("The number of flags required to trigger this action")
			.setRequired(true)
		)
		.addChannelOption(new DiscordJS.SlashCommandChannelOption()
			.setName("log-channel")
			.setDescription("The channel to log the action to (omit for no logging)")
		),

	callback: interaction => {
		const user = interaction.user

		return "action add kick"
	},
}