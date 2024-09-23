// @ts-check

import * as actions from "../actions.mjs"
import {RoleAction} from "../classes/Action.mjs"
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
			.setMinValue(1)
		)
		.addRoleOption(new DiscordJS.SlashCommandRoleOption()
			.setName("role")
			.setDescription("The role to give the user")
			.setRequired(true)
		)
		.addNumberOption(new DiscordJS.SlashCommandNumberOption()
			.setName("duration")
			.setDescription("How long before the role is removed, in hours (omit for permanent role)")
			.setMinValue(0)
			.setMaxValue(24 * 14) // What kind of psychopath adds a temprole for over 2 weeks
		)
		.addChannelOption(new DiscordJS.SlashCommandChannelOption()
			.setName("log-channel")
			.setDescription("The channel to log the action to (omit for no logging)")
			// @ts-ignore
			.addChannelTypes(Settings.Constants.logChannelTypes)
		),

	callback: interaction => {
		const flags = interaction.options.getInteger("flags")
		const logChannel = interaction.options.getChannel("log-channel")
		const role = interaction.options.getRole("role")
		const duration = interaction.options.getNumber("duration")

		if (role.name === "@everyone") { // No Patrick, you cannot give the @everyone role to someone
			return "Cannot give the `@everyone` role to users\n-# Obviously"
		}

		if (role.managed) {
			return "Cannot give users managed (bot) roles"
		}

		if (role.comparePositionTo(interaction.guild.roles.botRoleFor(interaction.client.user)) >= 0) {
			return "Cannot give users roles higher than this bot's current role"
		}

		const actionId = actions.addAction(new RoleAction(flags, logChannel, role, duration))

		return RoleAction.getActionAddedMessage("role", actionId)
	},
}