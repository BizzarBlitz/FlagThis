import dotenv from "dotenv"
dotenv.config()

import {Commands} from "../src/commands.mjs"
import {REST, Routes} from "discord.js"

const CLIENT_ID = process.env.CLIENT_ID
const GUILD_ID = process.argv[2] || process.env.GUILD_ID
const TOKEN = process.env.TOKEN

if (!TOKEN || !CLIENT_ID) {
	throw new Error("Token and Client ID must be specified in .env config")
}

const CommandList = []
const rest = new REST({ version: "10" }).setToken(TOKEN)



async function restPutGlobalCommands(commands) {
	return await rest.put(
		Routes.applicationCommands(CLIENT_ID),
		{ body: commands }
	)
}

async function restPutGuildCommands(commands, guildId) {
	return await rest.put(
		Routes.applicationGuildCommands(CLIENT_ID, guildId),
		{ body: commands }
	)
}

async function registerCommands(commands, guildId) {
	try {
		console.log("Registering application commands...")

		await guildId ? restPutGuildCommands(commands, guildId) : restPutGlobalCommands(commands)

		console.log("Application commands were registered successfully")
	} catch (error) {
		console.log(`Error regiseting application commands: ${error}`)
	}
}



Object.values(Commands).forEach(command => {
	CommandList.push(command.JSON)
})

registerCommands(CommandList) // Register for all servers
// registerCommands(CommandList, GUILD_ID) // Register for specific server