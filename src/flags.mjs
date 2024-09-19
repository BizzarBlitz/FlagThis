// @ts-check

import Flag from "./classes/Flag.mjs"

// Structure:
//	{
//		[flaggedUserId]: {
//			{
//				[messageId]: [Flag]
//			}
//		}
//	}

const Flags = {}



function getOrCreateAuthorFlaggedMessages(userId) {
	let flaggedMessages = Flags[userId]

	if (!flaggedMessages) {
		flaggedMessages = {}
		Flags[userId] = flaggedMessages
	}

	return flaggedMessages
}

function getOrCreateMessageFlags(flaggedMessages, messageId) {
	let messageFlags = flaggedMessages[messageId]

	if (!messageFlags) {
		messageFlags = []
		flaggedMessages[messageId] = messageFlags
	}

	return messageFlags
}


export function hasFlagged(message, user) {
	const author = message.author

	const flaggedMessages = Flags[author.id]
	if (!flaggedMessages) return false

	const messageFlags = flaggedMessages[message.id]
	if (!messageFlags) return false

	for (const flag of messageFlags) {
		if (flag.userId === user.id) return true
	}
	
	return false
}

export function addFlag(message, user) {
	if (hasFlagged(message, user)) {
		throw new Error(`User ${user.id} already flagged message ${message.id}`)
	}

	const author = message.author
	const flaggedMessages = getOrCreateAuthorFlaggedMessages(author.id)
	const messageFlags = getOrCreateMessageFlags(flaggedMessages, message.id)

	const flag = new Flag(user.id, Math.floor(Date.now() / 1000))
	messageFlags.push(flag)
}

export function removeFlag(message, user) {
	if (!hasFlagged(message, user)) {
		throw new Error(`User ${user.id} has not flagged message ${message.id}`)
	}

	const author = message.author
	const flaggedMessages = getOrCreateAuthorFlaggedMessages(author.id)
	const messageFlags = getOrCreateMessageFlags(flaggedMessages, message.id)

	messageFlags.forEach((flag, index) => {
		if (flag.userId === user.id) {
			messageFlags.splice(index, 1)
			return
		}
	})
}