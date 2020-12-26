<script>
	import Rhetorician from "./components/SpeechRecognition.svelte"
	import { speechStore } from "./stores"
</script>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

<main>
	<h1>Rhetorician Speech Bot</h1>

	<Rhetorician />
	<textarea bind:value={$speechStore} />
</main>
