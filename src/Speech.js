const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const GrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
const RecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

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
    const result = event.results?.[0]?.[0]?.transcript ?? "";
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
}
