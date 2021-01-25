<script lang="ts">
	import Repositories from "./Repositories.svelte";
	import {getCurrentRepo} from './engine.ts'
	import Manifests from "./Manifests.svelte";

	let currRepo = getCurrentRepo()

  function repoChanged(e) {
	  currRepo = e.detail.repo
  }

</script>

<style>
	.root {
		position: absolute;
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;
		max-width: 1200px;
	}
</style>

<div class="root">
	<Repositories currentRepo={currRepo} on:repoChange={repoChanged}/>
	<Manifests bind:repo={currRepo} />
</div>