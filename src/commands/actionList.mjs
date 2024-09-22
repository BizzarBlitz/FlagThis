// @ts-check

import DiscordJS from "discord.js"
import * as actions from "../actions.mjs"

export default {
	command: new DiscordJS.SlashCommandSubcommandBuilder()
		.setName("list")
		.setDescription("Lists all current actions"),

	callback: () => {
		return actions.listActions()
	},
}