const fs = require('fs');
const path = require('path');
const request = require('request');
const xmlbuilder = require('xmlbuilder');

module.exports = {
    synthesizeSpeech: function(fileName, text, callback) {
        var apiKey = process.env.MICROSOFT_API_KEY || require('./microsoftCredentials').apiKey;
        var ssml_doc = xmlbuilder.create('speak')
            .att('version', '1.0')
            .att('xml:lang', 'en-us')
            .ele('voice')
            .att('xml:lang', 'en-us')
            .att('xml:gender', 'Female')
            .att('name', 'Microsoft Server Speech Text to Speech Voice (en-US, ZiraRUS)')
            .txt(text)
            .end();
        var post_speak_data = ssml_doc.toString();

        request.post({
            url: 'https://api.cognitive.microsoft.com/sts/v1.0/issueToken',
            headers: {
                'Ocp-Apim-Subscription-Key' : apiKey
            }
        }, function (err, resp, access_token) {
            if (err || resp.statusCode != 200) {
                console.log(err, resp.body);
            } else {
                try {
                    request.post({
                        url: 'https://speech.platform.bing.com/synthesize',
                        body: post_speak_data,
                        headers: {
                            'content-type' : 'application/ssml+xml',
                            'X-Microsoft-OutputFormat' : 'audio-16khz-128kbitrate-mono-mp3',
                            'Authorization': 'Bearer ' + access_token,
                            'X-Search-AppId': '07D3234E49CE426DAA29772419F436CA',
                            'X-Search-ClientID': '1ECFAE91408841A480F00935DC390960',
                            'User-Agent': 'TTSNodeJS'
                        },
                        encoding: null
                    }, function (err, resp, speak_data) {
                        if (err || resp.statusCode != 200) {
                            console.log(resp);
                            console.log(err, resp.body);
                        } else {
                            try {
                                fs.writeFile(path.join(__dirname + "/public/" + fileName + ".mp3"), speak_data, function(err) {
                                    if (err) {
                                        return console.log(err)
                                    }
                                    console.log("The file was saved!");
                                    callback();
                                });
                            } catch (e) {
                                console.log(e.message);
                            }
                        }
                    });
                } catch (e) {
                    console.log(e.message);
                }

            }
        });
    }
}