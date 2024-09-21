const CommandImports = [
	import("./commands/flagMessage.mjs"),
	import("./commands/viewMessageFlags.mjs"),

	import("./commands/action.mjs"),
	import("./commands/actionAdd.mjs"),
	import("./commands/actionAddBan.mjs"),
	import("./commands/actionAddDeleteMessage.mjs"),
	import("./commands/actionAddKick.mjs"),
	import("./commands/actionAddLog.mjs"),
	import("./commands/actionAddRole.mjs"),
	import("./commands/actionAddTimeout.mjs"),
	import("./commands/actionList.mjs"),
	import("./commands/actionRemove.mjs"),
]

export const Commands = {}
export const Subcommands = {}

const CommandFiles = await Promise.all(CommandImports)


CommandFiles.forEach(async (commandData) => {
	commandData = commandData.default

	if (!commandData.command.setContexts) { // Command is a subcommand
		Subcommands[commandData.command.name] = commandData
		return
	}

	commandData.JSON = commandData.command.toJSON()
	Commands[commandData.command.name] = commandData
})