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
	Actions.splice(Actions.findIndex(action => action.id === id))
	reassignActionIds()
}

export function listActions() {
	let output = ""

	Actions.forEach(action => {
		output += `${action.id}. ${action.toListItem()}` + (action.id !== Actions.length ? "\n" : "")
	})

	return output === "" ? "*No actions to list*" : output
}