const CommandImports = [
	import("./commands/flagMessage.mjs"),
]

const CommandFiles = await Promise.all(CommandImports)
const Commands = {}


CommandFiles.forEach(async (commandData) => {
	commandData = commandData.default

	commandData.JSON = commandData.command.toJSON()
	Commands[commandData.command.name] = commandData
})


export default Commands