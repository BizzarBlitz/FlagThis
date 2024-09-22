// @ts-check

import Constants from "../constants.mjs"
import DiscordJS from "discord.js"


function createLogMessageCreateOptions(title, flagCount, messageUrl, actionId, color) {
	return {embeds: new DiscordJS.EmbedBuilder()
		.setTitle(title)
		.setDescription(`Message had ${flagCount} flags`)
		.setFields({
			name: "Flagged message Link",
			value: messageUrl,
		})
		.setFooter({
			text: `Action ID: ${actionId}`,
		})
		.setColor(color)
	}
}


export class Action {
	id = -1

	constructor(flags, logChannel) {
		this.flags = flags
		this.logChannel = logChannel
	}

	trigger(message, messageFlags) {
		throw new Error("Action.trigger() not defined")
	}

	toListItem() {
		throw new Error("Action.toListItem() not defined")
	}

	// Note: Inheritants should have the flagged message as the parameter
	log(message, messageFlags) {
		throw new Error("Action.log() not defined")
	}
}


export class BanAction extends Action {
	constructor(flags, logChannel, deleteMessageHistory) {
		super(flags, logChannel)
		this.deleteMessageHistory = deleteMessageHistory
	}

	trigger(message, messageFlags) {
		message.author.ban({
			reason: `${messageFlags.length} flags on message ${message.url} (automated action #${this.id})`,
			deleteMessageSeconds: (this.deleteMessageHistory || 0) * 3600, // Hours to seconds conversion
		})
	}

	toListItem() {
		return `**${this.flags} flags:** ban`
			+ this.deleteMessageHistory ? `; delete messages from last ${this.deleteMessageHistory} hrs` : ""
				+ this.logChannel ? `; log to <#${this.logChannel.id}>` : ""
	}

	log(message, messageFlags) {
		this.logChannel.send(createLogMessageCreateOptions(
			`User <@${message.author.id}> was banned`,
			messageFlags.length,
			message.url,
			this.id,
			Constants.Colors.BanLogEmbed
		))
	}
}

export class DeleteMessageAction extends Action {
	trigger(message) {
		message.delete()
	}

	toListItem() {
		return `**${this.flags} flags:** delete message`
			+ this.logChannel ? `; log to <#${this.logChannel.id}>` : ""
	}

	log(message, messageFlags) {
		this.logChannel.send(createLogMessageCreateOptions(
			`Message in <#${message.channel.id}> was deleted`,
			messageFlags.length,
			"*Unavailable*",
			this.id,
			Constants.Colors.MessageDeleteLogEmbed
		))
	}
}

export class KickAction extends Action {
	trigger(message, messageFlags) {
		message.author.kick(`${messageFlags.length} flags on message ${message.url} (automated action #${this.id})`)
	}

	toListItem() {
		return `**${this.flags} flags:** kick`
			+ this.logChannel ? `; log to <#${this.logChannel.id}>` : ""
	}

	log(message, messageFlags) {
		this.logChannel.send(createLogMessageCreateOptions(
			`User ${message.author.name} was kicked`,
			messageFlags.length,
			message.url,
			this.id,
			Constants.Colors.BanLog
		))
	}
}

export class LogAction extends Action {
	trigger = this.log

	toListItem() {
		return `**${this.flags} flags:** log to <#${this.logChannel.id}>`
	}

	log(message, messageFlags) {
		this.logChannel.send(createLogMessageCreateOptions(
			`Message by <@${message.author.id}> was flagged`,
			messageFlags.length,
			message.url,
			this.id,
			Constants.Colors.KickLogEmbed
		))
	}
}

export class RoleAction extends Action {
	constructor(flags, logChannel, role, duration) {
		super(flags, logChannel)
		this.role = role
		this.duration = duration
	}

	trigger(message, messageFlags) {
		message.author.roles.add(this.role, `${messageFlags.length} flags on message ${message.url} (automated action #${this.id})`)
	}

	toListItem() {
		return `**${this.flags} flags:** give role <@&${this.role.id}>`
			+ this.duration ? ` for ${this.duration} hrs` : ""
				+ this.logChannel ? `; log to ${this.logChannel.name}` : ""
	}

	log(message, messageFlags) {
		this.logChannel.send(createLogMessageCreateOptions(
			`User ${message.author.name} was banned`,
			messageFlags.length,
			message.url,
			this.id,
			this.role.color
		))
	}
}