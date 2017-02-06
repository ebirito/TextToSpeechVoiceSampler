const fs = require('fs');
const path = require('path');
var apiai = require("apiai");
const extension = 'wav';

function ApiAi() {
    var apiKey = process.env.APIAI_API_KEY || require('./credentials/apiAiCredentials').apiKey;
    this.app = apiai(apiKey);
}

ApiAi.prototype.synthesizeSpeech = function(options, callback) {
    const fullFilePath = path.join(__dirname + '/public/' + options.fileName + '.' + extension);
    var file = fs.createWriteStream(fullFilePath);

    file.on('finish',function() {
        console.log(`The audio file was saved at ${fullFilePath}`);
        callback(extension);
    });

    file.on('error', function(err) {
        console.log(err);
    });

    var tts_request_options = {
        language: 'en-US',
        writeStream: file
    };

    var tts_request = this.app.ttsRequest(options.text, tts_request_options);

    tts_request.end();
}

ApiAi.prototype.getVoices = function(callback) {
    const voicesArray = [
        {
            sex: 'Female',
            name: 'Leydidi',
            voiceId: 'Leydidi'
        }
    ]
    callback(voicesArray);
}

module.exports = ApiAi;