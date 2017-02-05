const fs = require('fs');
const path = require('path');
const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
const extension = 'ogg';

module.exports = {
    synthesizeSpeech: function(fileName, text, callback) {
        const textToSpeech = new TextToSpeechV1({
            // If unspecified here, the TEXT_TO_SPEECH_USERNAME and
            // TEXT_TO_SPEECH_PASSWORD env properties will be checked
            // After that, the SDK will fall back to the bluemix-provided VCAP_SERVICES environment property
            username: process.env.TEXT_TO_SPEECH_USERNAME || require('./credentials/ibmWatsonCredentials').username,
            password: process.env.TEXT_TO_SPEECH_PASSWORD || require('./credentials/ibmWatsonCredentials').password,
        });

        var requestParams = {
            text: text,
            voice: 'en-US_AllisonVoice',
            download: true
        };

        const fullFilePath = path.join(__dirname + '/public/' + fileName + '.' + extension);

        textToSpeech.synthesize(requestParams).on('error', function(error) {
            console.log('Error:', error);
        }).on('end', function() {
            console.log(`The audio file was saved at ${fullFilePath}`);
            callback(extension);
        }).pipe(fs.createWriteStream(fullFilePath));
    }
}
