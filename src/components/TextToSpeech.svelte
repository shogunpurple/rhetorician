<script>
    import Button from "./Button.svelte";
	import Speech from "../Speech";
	import { speechStore } from "../stores";
	import SpeechBubble from "./SpeechBubble.svelte";

	const speech = new Speech({
		continuous,
		lang: language,
		onSpeech: (words) => speechStore.set(words),
		onEnd: () => {
			listening = false;
		},
	});

	function speak() {
		speech.speak($speechStore);
	}
</script>

<Button on:click={speak}>
	<SpeechBubble />
</Button>
