<script>
	import CommentAddIcon from "~icons/bx/comment-add"
	import CommentCheckIcon from "~icons/bx/comment-check"
	import CommentDotsIcon from "~icons/bx/comment-dots"

	/** @type {"add" | "validate" | "loading"} */
	export let state = "add"

	const titles = {
		add: "Write a comment",
		validate: "Publish",
		loading: "Loading...",
	}

	$: title = titles[state]
</script>

<button {title} on:click>
	{#if state == "add"}
		<CommentAddIcon />
	{:else if state == "validate"}
		<CommentCheckIcon />
	{:else if state == "loading"}
		<CommentDotsIcon />
	{/if}
</button>

<style>
	button {
		all: initial;
		color: inherit;
		cursor: pointer;
		font-size: inherit;
		display: flex;
	}
</style>
