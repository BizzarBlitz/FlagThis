// @ts-check

import * as actions from "../actions.mjs"
import {TimeoutAction} from "../classes/Action.mjs"
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
			.setMinValue(1)
		)
		.addNumberOption(new DiscordJS.SlashCommandNumberOption()
			.setName("duration")
			.setDescription("How long the timeout should last, in hours")
			.setMinValue(0)
			.setMaxValue(24 * 28) // Max timeout duration
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
		const duration = interaction.options.getNumber("duration")

		const actionId = actions.addAction(new TimeoutAction(flags, logChannel, duration))

		return TimeoutAction.getActionAddedMessage("timeout", actionId)
	},
}