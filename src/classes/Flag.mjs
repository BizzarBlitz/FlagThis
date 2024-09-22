// @ts-check

import * as Settings from "../settings.mjs"

export default class Flag {
	onRemoved

	constructor(userId, timestamp) {
		this.timestamp = timestamp
		this.timeoutId = setTimeout(this.remove, Settings.Configurable.flagLifespanHours * 3600_000)
		this.userId = userId
	}

	remove() {
		clearTimeout(this.timeoutId)
		if (this.onRemoved) {
			this.onRemoved()
		}
	}
}