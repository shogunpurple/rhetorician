<script>
	import Speech from "./Speech";

    export let name;
    export let continuous = false
    export let language 
    export let transcript = "";

    let listening = false

	const speech = new Speech({
        continuous,
        lang: language,
    });

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
</style>

<main>
	<button on:click={start}>Listen</button>
	<textarea bind:value={transcript} />
</main>
