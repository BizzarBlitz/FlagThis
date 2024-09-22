// @ts-check

import Constants from "../constants.mjs"
import DiscordJS from "discord.js"


function createLogMessageCreateOptions(title, flagCount, messageUrl, authorId, actionId, color) {
	return {embeds: [new DiscordJS.EmbedBuilder()
		.setTitle(title)
		.setDescription(`Message had ${flagCount} flags`)
		.setFields([
			{
				name: "Flagged message link",
				value: messageUrl,
			},
			{
				name: "Message author",
				value: `<@${authorId}>`,
			}
		])
		.setFooter({
			text: `Action ID: ${actionId}`,
		})
		.setColor(color)
	]}
}


export class Action {
	id = 0

	constructor(flags, logChannel) {
		this.flags = flags
		this.logChannel = logChannel
	}

	static getActionAddedMessage(actionName, actionId) {
		if (actionId === 0) {
			return "Maximum number of actions reached\nUse `/action list` to view current actions and `/action remove` to remove an action"
		}

		return `\`${actionName}\` action added (ID: ${actionId})\n` +
			"Use the command `/action list` to view all actions"
	}

	trigger(message, messageFlags) {
		throw new Error("Action.trigger() not defined")
	}

	toListItem() {
		throw new Error("Action.toListItem() not defined")
	}

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
			+ (this.deleteMessageHistory ? `; delete messages from last ${this.deleteMessageHistory} hrs` : "")
				+ (this.logChannel ? `; log to <#${this.logChannel.id}>` : "")
	}

	log(message, messageFlags) {
		this.logChannel.send(createLogMessageCreateOptions(
			`User @${message.author.username} was banned`,
			messageFlags.length,
			message.url,
			message.author.id,
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
			+ (this.logChannel ? `; log to <#${this.logChannel.id}>` : "")
	}

	log(message, messageFlags) {
		this.logChannel.send(createLogMessageCreateOptions(
			`Message by @${message.author.username} in #${message.channel.name} was deleted`,
			messageFlags.length,
			"*Unavailable*",
			message.author.id,
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
			+ (this.logChannel ? `; log to <#${this.logChannel.id}>` : "")
	}

	log(message, messageFlags) {
		this.logChannel.send(createLogMessageCreateOptions(
			`User @${message.author.username} was kicked`,
			messageFlags.length,
			message.url,
			message.author.id,
			this.id,
			Constants.Colors.BanLog
		))
	}
}

export class LogAction extends Action {
	trigger = () => {}

	toListItem() {
		return `**${this.flags} flags:** log to <#${this.logChannel.id}>`
	}

	log(message, messageFlags) {
		this.logChannel.send(createLogMessageCreateOptions(
			`Message by @${message.author.username} was flagged`,
			messageFlags.length,
			message.url,
			message.author.id,
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
		const messageAuthorMember = message.member
		console.log(messageAuthorMember, message)
		if (!messageAuthorMember) return

		messageAuthorMember.roles.add(this.role, `${messageFlags.length} flags on message ${message.url} (automated action #${this.id})`)
		if (this.duration) {
			setTimeout(() => {
				const messageAuthorMember = message.member
				if (!messageAuthorMember) return

				messageAuthorMember.roles.remove(this.role, `Temprole expired (automated action #${this.id})`)
			}, this.duration * 3600_000)
		}
	}

	toListItem() {
		return `**${this.flags} flags:** give role <@&${this.role.id}>`
			+ (this.duration ? ` for ${this.duration} hrs` : "")
				+ (this.logChannel ? `; log to ${this.logChannel.name}` : "")
	}

	log(message, messageFlags) {
		this.logChannel.send(createLogMessageCreateOptions(
			`User @${message.author.username} ` +
				(message.member ? `was given the ${this.role.name} role` : `could not be given the ${this.role.name} role because they left the server`),
			messageFlags.length,
			message.url,
			message.author.id,
			this.id,
			this.role.color
		))
	}
}

export class TimeoutAction extends Action {
	constructor(flags, logChannel, duration) {
		super(flags, logChannel)
		this.duration = duration
		this.millisecondDuration = duration * 3600_000
	}

	trigger(message, messageFlags) {
		message.author.timeout(`${messageFlags.length} flags on message ${message.url} (automated action #${this.id})`)
	}

	toListItem() {
		return `**${this.flags} flags:** timeout for ${this.duration} hrs`
			+ (this.logChannel ? `; log to ${this.logChannel.name}` : "")
	}

	log(message, messageFlags) {
		const expirationTimestamp = new Date(Date.now() + this.millisecondDuration)

		this.logChannel.send(createLogMessageCreateOptions(
			`User @${message.author.username} was timeouted for ${this.duration} hours. Timeout expires <t:${expirationTimestamp}:R> (<t:${expirationTimestamp}:F)`,
			messageFlags.length,
			message.url,
			message.author.id,
			this.id,
			Constants.Colors.TimeoutLogEmbed
		))
	}
}