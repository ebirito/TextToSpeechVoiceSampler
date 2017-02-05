const amazonPolly = require("./amazonPolly");
const microsoft = require("./microsoft");
const ibmWatson = require("./ibmWatson");

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
        }
    }
}