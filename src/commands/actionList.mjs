// @ts-check

import DiscordJS from "discord.js"

export default {
	command: new DiscordJS.SlashCommandSubcommandBuilder()
		.setName("list")
		.setDescription("Lists all current actions"),

	callback: interaction => {
		const user = interaction.user

		return "ActionList"
	},
}