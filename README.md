# Rhetorician 

Rhetorician is a svelte wrapper around the experimental [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API). It provides UI components for speech recognition and text to speech.




## Get started

Install the dependencies...

```bash
cd rhetorician
yarn
```

...then start [Rollup](https://rollupjs.org)

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You will see the example application and can play around with it by recording speech and playing it back using the 2 components rhetorician provides.

## Usage

```
<script>
import { SpeechRecognition, TextToSpeech } from "rhetorician"
  
let transcript
</script>
  
<SpeechRecognition bind:transcript />
  
<textarea bind:value={transcript} />
  
<TextToSpeech {transcript} /> 
```

