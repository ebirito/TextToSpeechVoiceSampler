const fs = require('fs');
const path = require('path');
const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
const extension = 'ogg';

function IbmWatson() {
    this.textToSpeech = new TextToSpeechV1({
        // If unspecified here, the TEXT_TO_SPEECH_USERNAME and
        // TEXT_TO_SPEECH_PASSWORD env properties will be checked
        // After that, the SDK will fall back to the bluemix-provided VCAP_SERVICES environment property
        username: process.env.TEXT_TO_SPEECH_USERNAME || require('./credentials/ibmWatsonCredentials').username,
        password: process.env.TEXT_TO_SPEECH_PASSWORD || require('./credentials/ibmWatsonCredentials').password,
    });
}

IbmWatson.prototype.synthesizeSpeech = function(options, callback) {
    var requestParams = {
            text: options.text,
            voice: options.voiceId,
            download: true
        };

        const fullFilePath = path.join(__dirname + '/public/' + options.fileName + '.' + extension);

        this.textToSpeech.synthesize(requestParams).on('error', function(error) {
            console.log('Error:', error);
        }).on('end', function() {
            console.log(`The audio file was saved at ${fullFilePath}`);
            callback(extension);
        }).pipe(fs.createWriteStream(fullFilePath));
}

IbmWatson.prototype.getVoices = function(callback) {
    this.textToSpeech.voices(null, function(error, data) {
        if (error) {
            console.log('Error:', error);
        }
        else {
            var voicesArray = data.voices.filter(function(voice) {
                return voice.language === 'en-US';
            }).map(function(voice) {
                return {
                    sex: voice.gender,
                    name: voice.description,
                    voiceId: voice.name
                }
            });
            callback(voicesArray);
        }
    });
}

module.exports = IbmWatson;
