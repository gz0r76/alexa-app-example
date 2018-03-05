var express = require("express");
var alexa = require("alexa-app");

var PORT = process.env.PORT || 8080;
var app = express();

// ALWAYS setup the alexa app and attach it to express before anything else.
var alexaApp = new alexa.app("test");

alexaApp.express({
  expressApp: app,
  //router: express.Router(),

  // verifies requests come from amazon alexa. Must be enabled for production.
  // You can disable this if you're running a dev environment and want to POST
  // things to test behavior. enabled by default.
  checkCert: false,

  // sets up a GET route when set to true. This is handy for testing in
  // development, but not recommended for production. disabled by default
  debug: true
});

// now POST calls to /test in express will be handled by the app.request() function

// from here on you can setup any other express routes or middlewares as normal
app.set("view engine", "ejs");

alexaApp.launch(function(request, response) {
  response.say("You launched the app!");
});

alexaApp.dictionary = { "names": ["matt", "joe", "bob", "bill", "mary", "jane", "dawn"] };

alexaApp.intent("nameIntent", {
    "slots": { "NAME": "LITERAL" },
    "utterances": [
      "my {name is|name's} {names|NAME}", "set my name to {names|NAME}"
    ]
  },
  function(request, response) {
   var AmazonSpeech = require('ssml-builder/amazon_speech');

   var speech = new AmazonSpeech()
  .say('Hello')
  .pause('1s')
  .whisper('I can see you when you are sleeping')
  .pause('500ms')
  .say('Is your phone number still')
  .sayAs({
    word: "+1-234-567-8900",
    interpret: "telephone"
  });

  var speechOutput = speech.ssml();
  response.say(speechOutput);
  
  }
);

app.listen(PORT, () => console.log("Listening on port " + PORT + "."));
