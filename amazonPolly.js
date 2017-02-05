const fs = require('fs');
const AWS = require('aws-sdk');
const path = require('path');
const extension = 'mp3';

function AmazonPolly() {
    // Load AWS credentials
    if (!process.env.AWS_ACCESS_KEY_ID){
        AWS.config.loadFromPath('./credentials/amazonCredentials.json');
    }

    // Create an Polly client
    this.Polly = new AWS.Polly({
        signatureVersion: 'v4',
        region: 'us-east-1'
    });
}

AmazonPolly.prototype.synthesizeSpeech = function(options, callback) {
    const params = {
        'Text': options.text,
        'OutputFormat': 'mp3',
        'VoiceId': options.voiceId
    };

    this.Polly.synthesizeSpeech(params, (err, data) => {
        if (err) {
            console.log(err.code)
        } else if (data) {
            if (data.AudioStream instanceof Buffer) {
                const fullFilePath = path.join(__dirname + '/public/' + options.fileName + '.' + extension);
                fs.writeFile(fullFilePath, data.AudioStream, function(err) {
                    if (err) {
                        return console.log(err)
                    }
                    console.log(`The audio file was saved at ${fullFilePath}`);
                    callback(extension);
                });
            }
        }
    });
}

AmazonPolly.prototype.getVoices = function(callback) {
    this.Polly.describeVoices(function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else { 
            var voicesArray = data.Voices.filter(function(voice) {
                return voice.LanguageCode === 'en-US';
            }).map(function(voice) {
                return {
                    sex: voice.Gender,
                    name: voice.Name,
                    voiceId: voice.Id
                }
            })
            callback(voicesArray);
        }
    });
}

module.exports = AmazonPolly;
