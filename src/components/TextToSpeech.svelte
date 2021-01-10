<script>
	import Button from "./Button.svelte";
	import SpeechBubble from "./svg/SpeechBubble.svelte";

	export let transcript;

	let speechSynthesis = window.speechSynthesis;

	speechSynthesis.voice = speechSynthesis.getVoices()[0];

	function speak() {
		if (speechSynthesis.speaking) {
			console.warn("Cannot speak while still recording");
			return;
		}

		const utterance = new SpeechSynthesisUtterance(transcript);

		// Speaking Options
		utterance.pitch = 1;
		utterance.rate = 1;

		speechSynthesis.cancel();
		speechSynthesis.speak(utterance);
	}
</script>

<Button on:click={speak}>
	<SpeechBubble />
</Button>
