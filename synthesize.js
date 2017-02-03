const amazonPolly = require("./amazonPolly");

module.exports = {
    synthesize: function(options, callback) {
        switch(options.vendor){
            case "AmazonPolly":
                amazonPolly.synthesizeSpeech(options.fileName, options.text, callback);
            break;
        }
    }
}