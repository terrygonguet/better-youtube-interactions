import { onMount } from "svelte"
import { writable } from "svelte/store"

/**
 * @template T
 * @typedef {import("svelte/store").Writable<T>} Writable<T>
 */

/**
 * @param {string} query
 * @param {Element} parent
 * @return {Writable<Element | null>}
 */
export function querySelectStore(query, parent = undefined) {
	const store = writable(null)
	onMount(() => {
		const result = (parent ?? document).querySelector(query)
		store.set(result)
	})
	return store
}
