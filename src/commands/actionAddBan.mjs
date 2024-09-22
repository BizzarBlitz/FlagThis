// @ts-check

import * as actions from "../actions.mjs"
import {BanAction} from "../classes/Action.mjs"
import DiscordJS from "discord.js"
import * as Settings from "../settings.mjs"

export default {
	command: new DiscordJS.SlashCommandSubcommandBuilder()
		.setName("ban")
		.setDescription("Ban the flagged message author")
		.addIntegerOption(new DiscordJS.SlashCommandIntegerOption()
			.setName("flags")
			.setDescription("The number of flags required to trigger this action")
			.setRequired(true)
			.setMinValue(1)
		)
		.addNumberOption(new DiscordJS.SlashCommandNumberOption()
			.setName("delete-message-history")
			.setDescription("Range of messages to delete, in hours (omit for no message deletion)")
			.setMinValue(0)
			.setMaxValue(24 * 7) // Max value is a week
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
		const deleteMessageHistory = interaction.options.getNumber("delete-message-history")

		const actionId = actions.addAction(new BanAction(flags, logChannel, deleteMessageHistory))

		return BanAction.getActionAddedMessage("ban", actionId)
	},
}