<script lang="ts">
	import {onMount, createEventDispatcher} from 'svelte'
	import {getRepositories, setRepo, getCurrentRepo} from './engine.ts'

	const dispatch = createEventDispatcher()
	export let currentRepo = getCurrentRepo()

	function onRepositoryClick(repo) {
		currentRepo = setRepo(repo)
		dispatch('repoChange', {
			repo
		})
	}

</script>

<style>
	.root {

	}

	ul {
		list-style: none;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
	}

	li {
		padding: 8px;
		border: 1px solid black;
		border-radius: 8px;
		cursor: pointer;
	}
	li:not(:last-of-type) {
		margin-right: 4px;
	}
	.selected {
		background-color: dodgerblue;
		color: white;
	}
</style>

<div class="root">
	{#await getRepositories()}
		<span>Loading...</span>
	{:then repos}
		<ul>
		{#each repos as repo}
			<li on:click={() => onRepositoryClick(repo)} class:selected={currentRepo === repo}>
				<span>{repo}</span>
			</li>
		{/each}
		</ul>
	{/await}
</div>
