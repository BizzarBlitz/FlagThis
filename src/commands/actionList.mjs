// @ts-check

import * as actions from "../actions.mjs"
import DiscordJS from "discord.js"

export default {
	command: new DiscordJS.SlashCommandSubcommandBuilder()
		.setName("list")
		.setDescription("Lists all current actions"),

	callback: () => {
		return actions.listActions()
	},
}