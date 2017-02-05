const amazonPolly = require("./amazonPolly");
const microsoft = require("./microsoft");
const ibmWatson = require("./ibmWatson");
const apiAi = require("./apiAi");
//const neospeech = require("./neospeech");

function Synthesize(vendor) {
   switch(vendor){
        case "AmazonPolly":
            this.vendor = new amazonPolly();
            break;
        case "Microsoft":
            this.vendor =  new microsoft();
            break;
        case "IbmWatson":
            this.vendor = new ibmWatson();
            break;
        case "ApiAi":
            this.vendor = new apiAi();
            break;
        /*case "Neospeech":
            this.vendor = require("./neospeech");
            break;*/
    }
}

Synthesize.prototype.synthesize = function(options, callback) {
    this.vendor.synthesizeSpeech(options, callback);
}

Synthesize.prototype.getVoices = function(callback) {
    this.vendor.getVoices(callback);
}

module.exports = Synthesize;