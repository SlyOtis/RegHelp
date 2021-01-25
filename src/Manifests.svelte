<script lang="ts">
	import {getManifests} from './engine.ts'

	export let repo: string
	let manifests

	console.log(repo)

	$: manifests = repo ? getManifests(repo) : null


</script>
<style>
	.root {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	ul {
		list-style: none;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	li {
		width: 100%;
		border-radius: 16px;
		border: 1px solid black;
		padding: 8px 16px;
	}

	li:not(:last-of-type) {
		margin-bottom: 16px;
	}

	.pair {
		width: 100%;
		height: auto;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.pair:not(:last-of-type) {
		margin-bottom: 8px;
	}

	.pair b {
		margin-right: 16px;
	}

	.tag {
		border-radius: 8px;
		padding: 4px 8px;
		background-color: lightgray;
	}
	.tag:not(:last-of-type) {
		margin-right: 8px;
	}
</style>

<div class="root">
    {#if manifests}
        {#await manifests}
					<span>Loading...</span>
        {:then result}
					<ul>
              {#each result as manifest}
								<li>
									<div class="pair">
										<b>Digest:</b>
										<span>{manifest.digest}</span>
									</div>
									<div class="pair">
										<b>Timestamp:</b>
										<span>{manifest.timestamp}</span>
									</div>
									<div class="pair">
										<b>Tags:</b>
                      {#each manifest.tags as tag}
												<span class="tag">{tag}</span>
                      {/each}
									</div>
								</li>
              {/each}
					</ul>
        {/await}
    {:else}
			<span>No repo sat</span>
    {/if}
</div>
