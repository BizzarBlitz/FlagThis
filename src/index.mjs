// @ts-check

import dotenv from "dotenv"
dotenv.config()

import Commands from "./commands.mjs"
import DiscordJS from "discord.js"

const TOKEN = process.env.TOKEN

const Client = new DiscordJS.Client({intents: []})



Client.on(DiscordJS.Events.InteractionCreate, async interaction => {
	if (!interaction.isCommand()) return

	const commandData = Commands[interaction.commandName]
	if (!commandData) {
		throw new Error("Invalid command interaction received:" + interaction.toString())
	}

	const responseContent = commandData.callback(interaction)

	await interaction.reply({
		content: responseContent,
		ephemeral: true,
	})
})

Client.login(TOKEN)