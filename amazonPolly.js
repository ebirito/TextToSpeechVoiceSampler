const fs = require('fs');
const AWS = require('aws-sdk');
const path = require('path');
const extension = 'mp3';

module.exports = {
    synthesizeSpeech: function(fileName, text, callback) {
        // Load AWS credentials
        if (!process.env.AWS_ACCESS_KEY_ID){
            AWS.config.loadFromPath('./credentials/amazonCredentials.json');
        }

        // Create an Polly client
        const Polly = new AWS.Polly({
            signatureVersion: 'v4',
            region: 'us-east-1'
        });

        // For troubleshooting purposes
        /*Polly.describeVoices(function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else console.log(data); // successful response
        });*/

        const params = {
            'Text': text,
            'OutputFormat': 'mp3',
            'VoiceId': 'Joanna'
        };

        Polly.synthesizeSpeech(params, (err, data) => {
            if (err) {
                console.log(err.code)
            } else if (data) {
                if (data.AudioStream instanceof Buffer) {
                    const fullFilePath = path.join(__dirname + '/public/' + fileName + '.' + extension);
                    fs.writeFile(fullFilePath, data.AudioStream, function(err) {
                        if (err) {
                            return console.log(err)
                        }
                        console.log(`The audio file was saved at ${fullFilePath}`);
                        callback(extension);
                    });
                }
            }
        })
    }
}
