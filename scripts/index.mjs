const script = document.querySelector("#better-yt-interactions")
const uiURL = script.dataset.uiURL

const { innerTube, Interactions } = await import(uiURL)
globalThis.innerTube = innerTube

function ensureUIExists() {
	const isLoggedIn = !!document.querySelector("#avatar-btn")
	if (!isLoggedIn) return

	const container = document.querySelector(".ytp-iv-video-content")
	if (!container) return

	const elementExists = !!container.querySelector("aside#better-interactions")
	if (!elementExists) {
		const el = new Interactions({ target: container })
	}
}

setInterval(ensureUIExists, 1000)
