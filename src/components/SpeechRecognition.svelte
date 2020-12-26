<script>
	import Speech from "../Speech";
	import Button from "./Button.svelte";
	import MicrophoneSlash from "./svg/MicrophoneSlash.svelte";
	import SpeechBubble from "./svg/SpeechBubble.svelte";
	import MicrophoneSolid from "./svg/MicrophoneSolid.svelte";
	import { speechStore } from "../stores";

	// TODO: revisit and make sure that continuous works
	export let continuous = false;
	export let language = "en-GB";

	let listening = false;

	const speech = new Speech({
		continuous,
		lang: language,
		onSpeech: (words) => speechStore.set(words),
		onEnd: () => {
			listening = false;
		},
	});

	function handleClick() {
		if (listening) {
			speech.stopListening();
		} else {
			speech.listen();
		}

		listening = !listening;
	}

	function speak() {
		speech.speak($speechStore);
	}
</script>

<Button on:click={handleClick} {listening}>
	{#if listening}
		<MicrophoneSlash />
	{:else}
		<MicrophoneSolid />
	{/if}
</Button>
<Button on:click={speak}>
	<SpeechBubble />
</Button>
