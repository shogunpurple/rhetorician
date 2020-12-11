export default class SpeechContext {
  constructor({
    continuous = true,
    lang = "en-GB",
    interimResults = false,
    maxAlternatives = 1,
  }) {
    const Recognition = webkitSpeechRecognition;
    const GrammarList = webkitSpeechGrammarList;
    const RecognitionEvent = webkitSpeechRecognitionEvent;

    this.transcript = "";

    this.recognition = new Recognition();
    this.speechRecognitionList = new GrammarList();
    this.speechSynthesis = speechSynthesis;

    this.recognition.grammars = this.speechRecognitionList;
    this.recognition.continuous = continuous;
    this.recognition.lang = lang;
    this.recognition.interimResults = interimResults;
    this.recognition.maxAlternatives = maxAlternatives;

    this.recognition.onerror = function () {};
    this.recognition.onnomatch = function () {};
    this.recognition.onspeechend = function () {};
    this.recognition.onresult = this.handleResult;
  }

  handleResult = (event) => {
    console.log(event.results);
    const result = event.results[0][0].transcript;
    this.transcript += result;
    // call the handler with the speech results
    this.onSpeech(this.transcript);
  };

  start() {
    this.recognition.start();
  }

  stop() {
    this.recognition.stop();
    this.transcript = "";
  }

  speak(transcript) {
    if (speechSynthesis.speaking) {
      return;
    }

    this.utterance = new SpeechSynthesisUtterance(transcript);

    // Speaking Options
    this.speechSynthesis.voice = this.speechSynthesis.getVoices()[0];
    this.utterance.pitch = 1;
    this.utterance.rate = 1;

    this.speechSynthesis.speak(utterance);
  }
}
