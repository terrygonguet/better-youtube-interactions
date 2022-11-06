<script>
	import BetterLikeIcon from "~icons/custom/like"
	import Like from "./Like.svelte"
	import Dislike from "./Dislike.svelte"
	import Comment from "./Comment.svelte"
	import { clearLikeVideo, commentOnVideo, dislikeVideo, likeVideo } from "./data"
	import fsm from "svelte-fsm"
	import { onMount } from "svelte"
	import { querySelectStore } from "./utils"

	const likeBtn = querySelectStore("#top-level-buttons-computed button[aria-label^=like]")
	const dislikeBtn = querySelectStore("#top-level-buttons-computed button[aria-label^=Dislike]")

	let liked = false
	let disliked = false
	let comment = ""

	const state = fsm("icon", {
		icon: { toggle: "actions" },
		actions: {
			like,
			dislike,
			comment: "comment",
			toggle: "icon",
		},
		comment: {
			_enter() {
				comment = ""
			},
			like,
			dislike,
			comment() {
				const id = getVideoId()
				commentOnVideo(comment.trim(), id).then(() => state.done())
				return "loading"
			},
			toggle: "icon",
		},
		loading: {
			done: "actions",
			toggle: "icon",
		},
	})

	async function like() {
		const id = getVideoId()
		if (liked) {
			console.log(await clearLikeVideo(id))
			liked = false
		} else {
			await likeVideo(id)
			liked = true
		}
		disliked = false
		flushState()
	}

	async function dislike() {
		const id = getVideoId()
		if (disliked) {
			await clearLikeVideo(id)
			disliked = false
		} else {
			await dislikeVideo(id)
			disliked = true
		}
		liked = false
		flushState()
	}

	function getVideoId() {
		const url = new URL(location.toString())
		return url.searchParams.get("v")
	}

	/**
	 * @param {KeyboardEvent} e
	 */
	function onKeyDown(e) {
		if (e.key == "Enter" && e.ctrlKey) state.comment()
	}

	function flushState(..._dependencies) {
		$dislikeBtn?.setAttribute("aria-pressed", disliked ? "true" : "false")
		$likeBtn?.setAttribute("aria-pressed", liked ? "true" : "false")
	}

	function getLikedStateFromPage() {
		// HACK: like/dislike data isn't returned by the youtubei api currently
		liked = $likeBtn?.getAttribute("aria-pressed") == "true"
		disliked = $dislikeBtn?.getAttribute("aria-pressed") == "true"
	}

	onMount(() => {
		getLikedStateFromPage()
		const observer = new MutationObserver(getLikedStateFromPage)
		const video = document.querySelector(".html5-main-video")
		if (video) observer.observe(video, { attributes: true })
		return () => observer.disconnect()
	})
</script>

<aside id="better-interactions">
	<button id="show" on:click={state.toggle}>
		<BetterLikeIcon style="width:100%;height:100%;" />
	</button>
	<div id="popup" class:label={$state == "icon"}>
		{#if $state == "icon"}
			<p>Better Interactions</p>
		{:else}
			<div id="actions">
				<div id="buttons">
					<Like {liked} on:click={state.like} />
					<Dislike {disliked} on:click={state.dislike} />
					<Comment
						state={$state == "comment"
							? "validate"
							: $state == "loading"
							? "loading"
							: "add"}
						on:click={state.comment}
					/>
				</div>
				{#if $state == "comment"}
					<textarea
						rows="5"
						autofocus
						placeholder="Add a comment..."
						bind:value={comment}
						on:keydown|stopPropagation={onKeyDown}
						on:keyup|stopPropagation
					/>
				{/if}
			</div>
		{/if}
	</div>
</aside>

<style>
	:global(#better-interactions *::-webkit-scrollbar) {
		width: 9px;
	}
	:global(#better-interactions *::-webkit-scrollbar-track) {
		background: transparent;
	}
	:global(#better-interactions *::-webkit-scrollbar-thumb) {
		background-color: rgba(155, 155, 155, 0.5);
		border: transparent;
	}
	:global(#better-interactions *) {
		scrollbar-width: thin;
		box-sizing: border-box;
	}

	:global(.ytp-autohide #better-interactions) {
		opacity: 0;
	}
	:global(.paused-mode #better-interactions) {
		opacity: 1;
	}
	:global(.ytp-big-mode #better-interactions) {
		display: inline-grid;
	}

	aside {
		display: none;
		position: relative;
		padding-top: 9px;
		grid-template: 1fr / 1fr;
		font-size: 118%;
		font-weight: 500;
		line-height: 22px;
	}
	#show {
		grid-area: 1 / 1;
		width: 54px;
		height: 54px;
		padding: 12px;
	}
	#popup {
		background-color: #222;
		padding: 5px;
		border-radius: 2px;
		position: absolute;
		top: calc(100% + 6px);
		right: 50%;
	}
	aside:hover #popup {
		opacity: 1;
	}
	#popup.label {
		opacity: 0;
		pointer-events: none;
		transform: translate(50%, 0);
	}
	#actions {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: end;
		padding: 0.5rem;
		font-size: 118%;
	}
	#buttons {
		display: flex;
		gap: 1rem;
	}
	button {
		all: initial;
		color: inherit;
		cursor: pointer;
		font-size: inherit;
	}
	textarea {
		grid-column: span 3;
		width: 40ch;
		background: transparent;
		border: 1px solid currentColor;
		color: inherit;
	}
</style>
