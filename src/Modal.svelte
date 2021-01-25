<script lang="ts">
	import {createEventDispatcher} from 'svelte'
  const dispatch = createEventDispatcher()
  export let title

  function onCancel() {
    dispatch('cancel')
  }

  function onOk() {
	  dispatch('ok')
  }
</script>

<style>
	.root {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.modal {
		position: relative;
		width: 400px;
    min-height: 200px;
		height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
		z-index: 1000;
		box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    background-color: white;
    border-radius: 16px;
    overflow: hidden;
	}

	.header {
    position: relative;
		width: 100%;
		height: auto;
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
	}

  .header * {
    margin: 0;
    padding: 0;
  }
  .content {
	  position: relative;
    width: 100%;
    height: auto;
    flex: 1;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: flex-start;
    padding: 8px 16px;
  }

  .footer {
    position: relative;
	  padding: 8px 16px;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    background-color: lightgray;
  }
  .backdrop {
	  position: absolute;
    z-index: 1;
    background-color: rgba(0, 0, 0, .25);
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  button {
    border-radius: 4px;
    padding: 8px 16px;
    background-color: cornflowerblue;
    color: white;
  }

  button:not(:last-of-type) {
    margin-right: 8px;
  }
</style>

<div class="root">
	<div class="modal">
		<div class="header">
			<h4>{title}</h4>
		</div>
		<div class="content">
			<slot/>
		</div>
    <div class="footer">
      <button on:click={onCancel}>Cancel</button>
      <button on:click={onOk}>Ok</button>
    </div>
	</div>
  <div class="backdrop" on:click={onCancel}>
  </div>
</div>