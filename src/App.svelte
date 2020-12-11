<script>
	import Speech from "./Speech";

	export let name;

	let spokenText = "";

	const speech = new Speech({});
	speech.onSpeech = (transcript) => (spokenText = transcript)

	function start() {
		speech.listen();
	}

	function speak() {
		speech.speak(spokenText);
	}
</script>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
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
	<h1>Hello {name}!</h1>
	<p>
		Visit the
		<a href="https://svelte.dev/tutorial">Svelte tutorial</a>
		to learn how to build Svelte apps.
	</p>

	<button on:click={start}>Start</button>
	<button on:click={speak}>Speak</button>

	<textarea bind:value={spokenText} />
</main>
