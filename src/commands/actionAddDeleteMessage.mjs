// @ts-check

import * as actions from "../actions.mjs"
import {DeleteMessageAction} from "../classes/Action.mjs"
import DiscordJS from "discord.js"
import * as Settings from "../settings.mjs"

export default {
	command: new DiscordJS.SlashCommandSubcommandBuilder()
		.setName("delete-message")
		.setDescription("Delete the flagged message")
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

		const actionId = actions.addAction(new DeleteMessageAction(flags, logChannel))

		return DeleteMessageAction.getActionAddedMessage("delete-message", actionId)
	},
}