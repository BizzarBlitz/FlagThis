// @ts-check

import * as actions from "../actions.mjs"
import {KickAction} from "../classes/Action.mjs"
import DiscordJS from "discord.js"
import * as Settings from "../settings.mjs"

export default {
	command: new DiscordJS.SlashCommandSubcommandBuilder()
		.setName("kick")
		.setDescription("Kick the flagged message author from the server")
		.addIntegerOption(new DiscordJS.SlashCommandIntegerOption()
			.setName("flags")
			.setDescription("The number of flags required to trigger this action")
			.setRequired(true)
			.setMinValue(1)
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

		const actionId = actions.addAction(new KickAction(flags, logChannel))

		return KickAction.getActionAddedMessage("kick", actionId)
	},
}