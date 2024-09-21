// @ts-check

import DiscordJS from "discord.js"

import actionAdd from "./actionAdd.mjs"
import actionList from "./actionList.mjs"
import actionRemove from "./actionRemove.mjs"

export default {
	command: new DiscordJS.SlashCommandBuilder()
		.setName("action")
		.setDescription("Contains various commands for managing actions")
		.addSubcommandGroup(actionAdd.command)
		.addSubcommand(actionList.command)
		.addSubcommand(actionRemove.command)
}