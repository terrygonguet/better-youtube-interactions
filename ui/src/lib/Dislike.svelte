<script>
	import DislikeIcon from "~icons/bx/dislike"
	import DislikeSolidIcon from "~icons/bxs/dislike"

	export let disliked = false

	$: title = disliked ? "Remove dislike" : "Dislike"
</script>

<button {title} on:click>
	{#if disliked}
		<DislikeSolidIcon />
	{:else}
		<DislikeIcon />
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
