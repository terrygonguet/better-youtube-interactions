const script = document.querySelector("#better-yt-interactions")
const uiURL = script.dataset.uiURL

const { innerTube, Interactions } = await import(uiURL)
globalThis.innerTube = innerTube

function ensureUIExists() {
	const isLoggedIn = !!document.querySelector("#avatar-btn")
	if (!isLoggedIn) return

	const container = document.querySelector(".ytp-chrome-top-buttons")
	if (!container) return

	const elementExists = !!container.querySelector("aside#better-interactions")
	if (!elementExists) {
		const el = new Interactions({ target: container, anchor: container.firstChild })
	}
}

setInterval(ensureUIExists, 1000)
