// @ts-check

import * as actions from "./actions.mjs"
import DiscordJS from "discord.js"
import * as Settings from "./settings.mjs"

// Structure:
//	{
//		(flaggedUserId): {
//			(messageId): [(userId)]
//		}
//	}

// flaggedMessages = Flags[authorId]
// messageFlags = Flags[authorId][messageId]

const Flags = {}



function getOrCreateAuthorFlaggedMessages(userId) {
	let flaggedMessages = getAuthorFlaggedMessages(userId)

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

		const messageCreatedTimestamp = DiscordJS.SnowflakeUtil.deconstruct(messageId).timestamp
		const timeout = messageCreatedTimestamp + BigInt(Settings.Configurable.messageFlaggableHours * 3600_000) - BigInt(Date.now())

		setTimeout(() => {
			delete flaggedMessages[messageId]
		}, Number(timeout))
	}

	return messageFlags
}

function cleanFlags(authorId, flaggedMessages, messageId, messageFlags) {
	// Handled when message expires
	// if (messageFlags.length === 0) {
	// 	delete flaggedMessages[messageId]
	// }

	if (Object.keys(flaggedMessages).length === 0) {
		delete Flags[authorId]
	}
}


export function stringifyMessageFlags(messageFlags) {
	const flagCount = messageFlags.length
	let output = `### ${flagCount} flag${flagCount !== 1? "s" : ""} (${Math.min(flagCount, Settings.Constants.maxListFlags)} displayed)`

	for (let index = 0; index < flagCount; index++) {
		if (index === Settings.Constants.maxListFlags) {
			output += `\n *${flagCount - index} more*`
			break
		}

		const userId = messageFlags[index]
		const newLine = `\n- <@${userId}>`

		output += newLine
	}

	return output
}

export function getAuthorFlaggedMessages(authorId) {
	return Flags[authorId]
}

export function getMessageFlags(authorId, messageId) {
	const authorFlaggedMessages = getAuthorFlaggedMessages(authorId)
	if (!authorFlaggedMessages) return

	return authorFlaggedMessages[messageId]
}

export function getExistingFlag(message, user) {
	const author = message.author

	const flaggedMessages = Flags[author.id]
	if (!flaggedMessages) return

	const messageFlags = flaggedMessages[message.id]
	if (!messageFlags) return
	
	return messageFlags.find(userId => userId === user.id)
}

export function addFlag(message, user) {
	if (getExistingFlag(message, user)) {
		throw new Error(`User ${user.id} already flagged message ${message.id}`)
	}

	const author = message.author
	const flaggedMessages = getOrCreateAuthorFlaggedMessages(author.id)
	const messageFlags = getOrCreateMessageFlags(flaggedMessages, message.id)

	messageFlags.push(user.id)

	actions.triggerActionsAtFlagMilestone(message, messageFlags)
}

export function removeFlag(message, user) {
	const existingFlag = getExistingFlag(message, user)

	if (!existingFlag) {
		throw new Error(`User ${user.id} has not flagged message ${message.id}`)
	}

	const author = message.author
	const flaggedMessages = getOrCreateAuthorFlaggedMessages(author.id)
	const messageFlags = getOrCreateMessageFlags(flaggedMessages, message.id)

	messageFlags.splice(messageFlags.findIndex(userId => userId === user.id), 1)
	cleanFlags(message.author.id, flaggedMessages, message.id, messageFlags)
}