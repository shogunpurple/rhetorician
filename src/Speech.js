const Recognition = window.SpeechRecognition || webkitSpeechRecognition;
const GrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
const RecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

export default class Speech {
  constructor({
    continuous = true,
    lang = "en-GB",
    interimResults = false,
    maxAlternatives = 1,
  }) {

    this.transcript = "";

    // setup 
    this.recognition = new Recognition();
    this.speechRecognitionList = new GrammarList();
    this.speechSynthesis = speechSynthesis;
    this.speechSynthesis.voice = this.speechSynthesis.getVoices()[0];

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

  listen() {
    this.recognition.start();
  }

  stopListening() {
    this.recognition.stop();
    this.transcript = "";
  }

  speak(transcript) {
    if (speechSynthesis.speaking) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(transcript);

    // Speaking Options
    utterance.pitch = 1;
    utterance.rate = 1;

    this.speechSynthesis.speak(utterance);
  }
}
