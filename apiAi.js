const fs = require('fs');
const path = require('path');
var apiai = require("apiai");
const extension = 'wav';

module.exports = {
    synthesizeSpeech: function(fileName, text, callback) {

        var apiKey = process.env.APIAI_API_KEY || require('./credentials/apiAiCredentials').apiKey;
        var app = apiai(apiKey);
        const fullFilePath = path.join(__dirname + '/public/' + fileName + '.' + extension);
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

        var tts_request = app.ttsRequest(text, tts_request_options);

        tts_request.end();
    }
}