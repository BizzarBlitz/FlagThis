const CommandFiles = [
	require("./commands/flagMessage.js"),
]

const Commands = {}

CommandFiles.forEach((commandData) => {
	Commands[commandData] = commandData.command.toJSON()
})

module.exports = Commands