const Recognition = window.SpeechRecognition || webkitSpeechRecognition;
const GrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
const RecognitionEvent =
  window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

export default class Speech {
  constructor({
    continuous = true,
    lang = "en-GB",
    interimResults = false,
    maxAlternatives = 1,
    onEnd = () => {},
    onSpeech = () => {},
    onError = () => {},
    onNoMatch = () => {},
  }) {
    this.transcript = "";
    this.onEnd = onEnd;
    this.onSpeech = onSpeech;
    this.onError = onError;
    this.onNoMatch = onNoMatch;

    // Speech Related Constructors
    this.recognition = new Recognition();
    this.speechRecognitionList = new GrammarList();
    this.speechSynthesis = speechSynthesis;
    this.speechSynthesis.voice = this.speechSynthesis.getVoices()[0];

    // Recognition Config
    this.recognition.grammars = this.speechRecognitionList;
    this.recognition.continuous = continuous;
    this.recognition.lang = lang;
    this.recognition.interimResults = interimResults;
    this.recognition.maxAlternatives = maxAlternatives;

    // Recognition Handlers
    this.recognition.onerror = this.handleError;
    this.recognition.onnomatch = this.handleNoMatch;
    this.recognition.onspeechend = this.handleEnd;
    this.recognition.onresult = this.handleResult;
  }

  handleResult = (event) => {
    console.log(event.results);
    const result = event.results[0][0].transcript;
    this.transcript += result;
    // call the handler with the speech results
    this.onSpeech(this.transcript);
  };

  handleError = (err) => {
    console.error(err);
    this.onError();
  };

  handleEnd = () => {
    console.log("Speech has ended");
    this.recognition.stop();
    this.onEnd();
  };

  handleNoMatch = () => {
    console.log("No match handler fired");
    this.onNoMatch();
  };

  listen() {
    this.transcript = "";
    this.recognition.start();
  }

  stopListening() {
    this.recognition.stop();
  }

  speak(transcript) {
    if (speechSynthesis.speaking) {
      console.warn("Cannot speak while still recording");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(transcript);

    // Speaking Options
    utterance.pitch = 1;
    utterance.rate = 1;

    this.speechSynthesis.cancel();
    this.speechSynthesis.speak(utterance);
  }
}
