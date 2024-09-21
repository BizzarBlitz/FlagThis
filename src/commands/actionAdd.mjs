// @ts-check

import DiscordJS from "discord.js"

import actionAddBan from "./actionAddBan.mjs"
import actionAddDeleteMessage from "./actionAddDeleteMessage.mjs"
import actionAddKick from "./actionAddKick.mjs"
import actionAddLog from "./actionAddLog.mjs"
import actionAddRole from "./actionAddRole.mjs"
import actionAddTimeout from "./actionAddTimeout.mjs"

export default {
	command: new DiscordJS.SlashCommandSubcommandGroupBuilder()
		.setName("add")
		.setDescription("Add an action to be triggered when a message gets flagged a specified number of times")
		.addSubcommand(actionAddBan.command)
		.addSubcommand(actionAddDeleteMessage.command)
		.addSubcommand(actionAddKick.command)
		.addSubcommand(actionAddLog.command)
		.addSubcommand(actionAddRole.command)
		.addSubcommand(actionAddTimeout.command)
}