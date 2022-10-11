import { Innertube } from "youtubei.js"

/**
 * @typedef {Object} Playlist
 * @property {Author} author
 * @property {string} id
 * @property {string} title
 * @property {Video[]} videos
 */

/**
 * @typedef {Object} Video
 * @property {Author} author
 * @property {string} duration
 * @property {string} id
 * @property {{ url: string }} thumbnail
 * @property {string} title
 */

/**
 * @typedef {Object} Author
 * @property {string} id
 * @property {string} name
 * @property {string} url
 */

export const innerTube = await Innertube.create({
	cookie: document.cookie,
	fetch: (...args) => fetch(...args),
})

/**
 * @param {string} id
 */
export function likeVideo(id) {
	return innerTube.interact.like(id)
}

/**
 * @param {string} id
 */
export function dislikeVideo(id) {
	return innerTube.interact.dislike(id)
}

/**
 * @param {string} id
 */
export function clearLikeVideo(id) {
	return innerTube.interact.removeLike(id)
}

/**
 * @param {string} text
 * @param {string} id
 */
export function commentOnVideo(text, id) {
	if (!text) return
	return innerTube.interact.comment(id, text)
}

/**
 * @returns {Promise<Playlist>}
 */
async function massagePlaylist(source) {
	return {
		author: massageAuthor(source.author),
		id: source.id,
		title: source.title.text,
		videos: (await innerTube.getPlaylist(source.id)).items.map(massageVideo).reverse(),
	}
}

/**
 * @returns {Video}
 */
function massageVideo(source) {
	return {
		author: massageAuthor(source.author),
		duration: source.duration.text,
		id: source.id,
		thumbnail: source.thumbnails[0],
		title: source.title.text,
	}
}

/**
 * @returns {Author}
 */
function massageAuthor(source) {
	return {
		id: source.id,
		name: source.name,
		url: source.url,
	}
}
