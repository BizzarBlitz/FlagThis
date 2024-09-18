// @ts-check

require("dotenv").config()

const DiscordJs = require("discord.js")
const TOKEN = process.env.TOKEN

const Client = new DiscordJs.Client({ intents: [] })



Client.on(DiscordJs.Events.InteractionCreate, interaction => {
	if (!interaction.isCommand()) return

	console.log("New interaction:", interaction)
})

Client.login(TOKEN)