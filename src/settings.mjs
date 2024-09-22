import {ChannelType} from "discord.js"

export const Constants = {
	maxListFlags: 20,
	maxActions: 5,
	logChannelTypes: [
		ChannelType.AnnouncementThread,
		ChannelType.GuildAnnouncement,
		ChannelType.GuildText,
		ChannelType.PrivateThread,
		ChannelType.PublicThread,
	],
}

export const Configurable = {
	flagLifespanHours: 24,
}