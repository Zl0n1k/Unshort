var pageMod = require("page-mod");
var data = require("self").data;
var mself = require("self");
var Request = require("request").Request;


exports.main = function(options, callbacks) {
    console.log(options.loadReason);
    
    pageMod.PageMod({
        include: "*",
        contentScriptFile: [data.url("jquery-1.6.2.min.js"), data.url("unshorter.js")],
        contentScriptWhen: "start",
    onAttach: function onAttach(worker) {
        worker.on('message', function(url) {
            new Request({
                url: url,
                onComplete: function(){
                    worker.postMessage(this.response.text);
                }
            }).get();
        });
    }


    });
}

