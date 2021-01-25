<script lang="ts">
	import {getCurrentNamespace, setNamespace} from './engine.ts'
	import Modal from "./Modal.svelte";

	export let navOpen = false;
	let nsOpen = false
	let currNs = getCurrentNamespace()

	function toggleMenu() {
		navOpen = !navOpen
	}

	function toggleNamespace() {
		nsOpen = !nsOpen
	}

	let nsInput: HTMLInputElement
	function updateNamespace() {
		const ns = nsInput?.value
		if (!ns) {
			console.error('Failed to retrieve the input value')
			return
		}

		currNs = setNamespace(ns)
		nsOpen = !nsOpen
	}

</script>

<style>
	.collapsed {
		width: 64px !important;
	}

	.sidebar {
		position: relative;
		transition: all 350ms ease-in;
		width: 300px;
		height: 100%;
		background-color: #424242;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;
		overflow: hidden;
	}

	.nav-item {
		position: relative;
		width: 100%;
		height: 64px;
		overflow: hidden;
		color: white;
		fill: white;
		cursor: pointer;
	}

	.nav-item-inner {
		position: absolute;
		width: 300px;
		left: 0;
		top: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		color: inherit;
	}

	.nav-item-icon {
		width: 64px;
		height: 64px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.nav-item-text {
		flex: 1;
		padding: 16px 8px;
		text-align: start;
		color: inherit;
	}

	.nav-item-icon svg {
		position: relative;
		width: 24px;
		height: 24px;
	}

	.invalid {
		color: red;
		fill: red;
	}
</style>

<nav class="sidebar" class:collapsed={!navOpen}>
	<button class="nav-item" on:click={toggleMenu}>
		<div class="nav-item-inner">
			<span class="nav-item-icon">
				{#if navOpen}
					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path
							d="M4.7070312 3.2929688L3.2929688 4.7070312L10.585938 12L3.2929688 19.292969L4.7070312 20.707031L12 13.414062L19.292969 20.707031L20.707031 19.292969L13.414062 12L20.707031 4.7070312L19.292969 3.2929688L12 10.585938L4.7070312 3.2929688 z"/></svg>
        {:else}
					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path
							d="M2 5L2 7L22 7L22 5L2 5 z M 2 11L2 13L22 13L22 11L2 11 z M 2 17L2 19L22 19L22 17L2 17 z"/></svg>
        {/if}
			</span>
			<span class="nav-item-text">{navOpen ? 'Collapse' : 'Expand'}</span>
		</div>
	</button>
	<button class="nav-item" on:click={toggleNamespace}>
		<div class="nav-item-inner" class:invalid={!currNs}>
			<span class="nav-item-icon">
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M12 2C7.5 3.601563 5.101563 14.898438 5 22L6 22C6.898438 19 12.101563 14.398438 15 14C16.101563 14.5 17.699219 17.800781 18 20L19 20C18.898438 13 16.5 3.601563 12 2 Z M 13 10L14 12L12 10L10 12L11 10L9 9L11 9L12 4L13 9L15 9Z"/></svg>
			</span>
			<span class="nav-item-text">
				{currNs || 'No namespace sat'}
			</span>
		</div>
	</button>
</nav>

{#if nsOpen}
	<Modal on:cancel={toggleNamespace} on:ok={updateNamespace} title="Namespace">
		<span>Specify the namespace to use below:</span>
		<input type="text" bind:this={nsInput} placeholder="namespace">
	</Modal>
{/if}