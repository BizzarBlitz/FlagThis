// @ts-check

import dotenv from "dotenv"
dotenv.config()

import {Commands, Subcommands} from "./commands.mjs"
import DiscordJS from "discord.js"

const TOKEN = process.env.TOKEN

const Client = new DiscordJS.Client({intents: [
	DiscordJS.GatewayIntentBits.Guilds
]})



function getCallback(interaction) {
	const callback = Commands[interaction.commandName].callback
	if (callback) return callback

	if (!interaction.isChatInputCommand()) {
		throw new Error("Slash command " + interaction.commandName + " has no callback")
	}
	
	return Subcommands[interaction.options.getSubcommand(true)].callback
}

Client.on(DiscordJS.Events.InteractionCreate, async interaction => {
	if (!interaction.isCommand()) return

	const callback = getCallback(interaction)
	const responseContent = callback(interaction)

	await interaction.reply({
		content: responseContent,
		ephemeral: true,
	})
})

Client.login(TOKEN)