<script>
	import LikeIcon from "~icons/bx/like"
	import LikeSolidIcon from "~icons/bxs/like"

	export let liked = false

	$: title = liked ? "Remove like" : "Like"
</script>

<button {title} on:click>
	{#if liked}
		<LikeSolidIcon />
	{:else}
		<LikeIcon />
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
