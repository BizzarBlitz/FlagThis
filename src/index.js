// @ts-check

require("dotenv").config()

const Commands = require("./commands.js")
const DiscordJs = require("discord.js")

const TOKEN = process.env.TOKEN

const Client = new DiscordJs.Client({ intents: [] })



Client.on(DiscordJs.Events.InteractionCreate, async interaction => {
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