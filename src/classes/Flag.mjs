// @ts-check

import * as Settings from "../settings.mjs"

export default class Flag {
	onFlagAdded
	onFlagRemoved

	constructor(userId, timestamp) {
		this.timestamp = timestamp
		this.timeoutId = setTimeout(this.remove, Settings.Configurable.flagLifespanHours)
		this.userId = userId
	}

	remove() {
		clearTimeout(this.timeoutId)

		if (this.onFlagRemoved) {
			this.onFlagRemoved(this)
		}
	}
}