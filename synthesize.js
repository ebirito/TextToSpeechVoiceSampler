const amazonPolly = require("./amazonPolly");
const microsoft = require("./microsoft");
const ibmWatson = require("./ibmWatson");
const apiAi = require("./apiAi");

module.exports = {
    synthesize: function(options, callback) {
        switch(options.vendor){
            case "AmazonPolly":
                amazonPolly.synthesizeSpeech(options.fileName, options.text, callback);
                break;
            case "Microsoft":
                microsoft.synthesizeSpeech(options.fileName, options.text, callback);
                break;
            case "IbmWatson":
                ibmWatson.synthesizeSpeech(options.fileName, options.text, callback);
                break;
            case "ApiAi":
                apiAi.synthesizeSpeech(options.fileName, options.text, callback);
                break;
        }
    }
}