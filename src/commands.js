const CommandFiles = [
	require("./commands/flagMessage.js"),
]

const Commands = {}

CommandFiles.forEach((commandData) => {
	commandData.JSON = commandData.command.toJSON()
	Commands[commandData.command.name] = commandData
})

module.exports = Commands