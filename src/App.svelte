<script lang="ts">
	import Sidebar from "./Sidebar.svelte"
	import Router from 'svelte-spa-router'
	import Home from './Home.svelte'
	import NotFound from './NotFound.svelte'

	export let name: string;

	const routes = {
		'/': Home,
		'*': NotFound
	}

</script>

<style>
	main {
		position: relative;
		height: 100%;
		width: 100%;
		flex: 1;
		margin: 0;
		padding: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow-y: auto;
		overflow-x: hidden;
	}
</style>

<Sidebar navOpen="false"/>
<main>
	<Router {routes}/>
</main>
