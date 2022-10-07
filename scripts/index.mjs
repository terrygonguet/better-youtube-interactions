const script = document.querySelector("#better-yt-interactions")
const uiURL = script.dataset.uiURL

/** @type {typeof import("./ui.js")} */
const {} = await import(uiURL)

function ensureUIExists() {}

setInterval(ensureUIExists, 1000)
