// @ts-check

import * as Settings from "./settings.mjs"


const Actions = []


function reassignActionIds() {
	Actions.sort((a, b) => {
		return a.flags - b.flags // Sort least to greatest
	})

	Actions.forEach((action, index) => {
		action.id = index
	})
}

export function addAction(action) {
	Actions.push(action)
	reassignActionIds()
}

export function removeAction(id) {
	// [TODO] Implement
}