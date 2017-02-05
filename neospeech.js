const fs = require('fs');
const path = require('path');
const request = require('request');
const querystring = require('querystring');
const extension = 'mp3';

module.exports = {
    synthesizeSpeech: function(fileName, text, callback) {
        var baseUrl = "https://tts.neospeech.com/rest_1_1.php?"
        var params = {
            method: 'ConvertSimple',
            email: 'ebirito@yahoo.com',
            accountId: 'e635115cf5',
            loginKey: 'LoginKeyVts4',
            loginPassword: 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI1ODk2YmYxMjBhOTc1YTdkNmU5YjczNzAiLCJpYXQiOjE0ODYyNzQzMjIsInN1YiI6Im5lb3NwZWVjaC5jb20iLCJpc3MiOiJlNjM1MTE1Y2Y1IiwiZXhwIjoxNTE3ODEwMzIyfQ.N5VP5bAEaFOFkrcDBztxl2CF-2xQlnj4plyLlVa6sDw',
            voice: 'TTS_JULIE_DB',
            outputFormat: 'FORMAT_WAV',
            sampleRate: 16,
            text: text
        }
        request(baseUrl + querystring.stringify(params), function (error, response, body) {
            if(error){
                console.log(error);
            }
            else{
                console.log(body);
            }
        });
    }
}