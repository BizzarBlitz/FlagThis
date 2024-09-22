// @ts-check

import DiscordJS from "discord.js"
import * as Settings from "../settings.mjs"

export default {
	command: new DiscordJS.SlashCommandSubcommandBuilder()
		.setName("role")
		.setDescription("Give the flagged message author a role")
		.addIntegerOption(new DiscordJS.SlashCommandIntegerOption()
			.setName("flags")
			.setDescription("The number of flags required to trigger this action")
			.setRequired(true)
		)
		.addRoleOption(new DiscordJS.SlashCommandRoleOption()
			.setName("role")
			.setDescription("The role to give the user")
			.setRequired(true)
		)
		.addNumberOption(new DiscordJS.SlashCommandNumberOption()
			.setName("duration")
			.setDescription("How long before the role is removed, in hours (omit for permanent role)")
		)
		.addChannelOption(new DiscordJS.SlashCommandChannelOption()
			.setName("log-channel")
			.setDescription("The channel to log the action to (omit for no logging)")
			.addChannelTypes(Settings.Constants.logChannelTypes)
		),

	callback: interaction => {
		const user = interaction.user

		return "action add role"
	},
}