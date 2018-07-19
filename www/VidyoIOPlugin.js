var exec = require('cordova/exec');

exports.prototype.launchVidyoIO = function(args) {
    exec(function(res){}, function(err){}, "VidyoIOPlugin", "launchVidyoIO", args);
}

