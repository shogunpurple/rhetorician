<script>
	import Speech from "../Speech";
	import Button from "./Button.svelte";
	import MicrophoneSlash from "./svg/MicrophoneSlash.svelte";
	import MicrophoneSolid from "./svg/MicrophoneSolid.svelte";

	// TODO: revisit and make sure that continuous works
	export let continuous = false;
	export let language = "en-GB";
	export let transcript

	let listening = false;

	const speech = new Speech({
		continuous,
		lang: language,
		onSpeech: (words) => {
			transcript = words
		},
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
</script>

<Button on:click={handleClick} {listening}>
	{#if listening}
		<MicrophoneSlash />
	{:else}
		<MicrophoneSolid />
	{/if}
</Button>