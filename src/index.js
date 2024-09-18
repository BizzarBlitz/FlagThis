// @ts-check

const DiscordJs = require("discord.js")
const TOKEN = "TOKEN."

const Client = new DiscordJs.Client({ intents: [] })



Client.on("ready", () => {
	
})

Client.login(TOKEN)