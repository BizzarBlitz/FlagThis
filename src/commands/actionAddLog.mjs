// @ts-check

import * as actions from "../actions.mjs"
import {LogAction} from "../classes/Action.mjs"
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
			.setMinValue(1)
		)
		.addChannelOption(new DiscordJS.SlashCommandChannelOption()
			.setName("channel")
			.setDescription("The channel to log the message to")
			.setRequired(true)
			// @ts-ignore
			.addChannelTypes(Settings.Constants.logChannelTypes)
		),

	callback: interaction => {
		const flags = interaction.options.getInteger("flags")
		const logChannel = interaction.options.getChannel("channel")

		const actionId = actions.addAction(new LogAction(flags, logChannel))

		return LogAction.getActionAddedMessage("log", actionId)
	},
}