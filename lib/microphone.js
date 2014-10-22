ns = window;

if (!swfobject.hasFlashPlayerVersion("10.0.0")) {
    if (typeof console != "undefined") {
        console.error("Flash Player >= 10.0.0 is required");
    }
}

// function MicrophoneF() { }
MicrophoneF = function() {
    this.debug = false;
    this.readyHandlers = [];
    this.dataHandlers = [];
    this.flash;
};


_.extend(MicrophoneF.prototype, {
    enable: function() {
        if (this.flash) this.flash.__enable();
    },
    disable: function() {

        if (this.flash) this.flash.__disable()
    },
    ondata: function(handler) {
        this.dataHandlers.push(handler);
    },
    onready: function(handler) {
        if (this.flash) {
            handler();
            return;
        }
        self.readyHandlers.push(handler);
    },
    initialize: function(options) {
        var self = this;
        // if (!swfobject.hasFlashPlayerVersion("10.0.0")) return;
        if (self.flash) return;

        options = options || {};

        var swfLocation = options.swfLocation || "/MicrophoneMain.swf"; // falling back on default MicrophoneSWF position
        var domId = options["domId"] || "__microphoneFFlash__";
        var loader = options["loader"] || defaultLoader;
        var wrapper = options.wrapper || document.body;


        // var $flash = $('<div>').appendTo('body');
        // $flash.attr('id', domId);

        // var flash = $("<div>");
        // $(flash).attr('id', domId);
        // $("body").append(flash);

        var flash = document.createElement("div");
        flash.id = domId;

        console.log(wrapper, flash)
        wrapper.appendChild(flash);


        self.flash = flash;


        swfobject.embedSWF(
            swfLocation, //swfUrlStr
            domId, //replaceElemIdStr
            "215", //widthStr
            "138", //heightStr
            "10.0.0", //swfVersionStr
            null, //xiSwfUrlStr
            {
                namespace: "MicrophoneF" //flashvarsObj
            }, {
                hasPriority: true, //parObj
                allowScriptAccess: "always"
            },
            null, //attObj
            function(e) { //callbackFn
                MicrophoneF.log("Embed " +
                    (e.success ? "succeeded" : "failed"));
                if (e.success) {
                    try {
                        setTimeout(function() {
                            try{
                                MicrophoneF.flash.__enable();   
                            }catch(e){
                                setTimeout(function() {
                                   MicrophoneF.flash.__enable();    
                               }, 1000)
                            }
        
                        }, 700)
                    } catch (e) {
                        console.log("Enable failed", e);
                    }
                }

                if (!e.success) {
                    jQuery("#__microphoneFFlash__").remove();
                }

            }
        );
    },
    log: function(msg, obj, method) {
        method = method || "log";
        console[method]("[MicrophoneF] " + msg);
        if (typeof obj != "undefined") {
            console[method](obj);
        }
    },
    __onFlashInitialized: function() {
        var self = this;
        self.initialized = true;
        self.flash = document.getElementById(MicrophoneF.flash.id);
        setTimeout(function() {
            self.log("Initialized and ready");
            self.flash.__setDebug(MicrophoneF.debug);
            self.flash.__initialize();
            for (var i = 0; i < MicrophoneF.readyHandlers.length; i++) {
                self.readyHandlers[i]();
                console.log("Clicked yess")
            }
        }, 0);
    },
    __onLog: function(msg) {
        var self = this;
        self.log(msg);
    },
    __onQueuedSamples: function(framesLength) {
        var self = this;
        setTimeout(function() {
            var data = self.flash.__receiveFrames();
            for (var i = 0; i < self.dataHandlers.length; i++) {
                var handler = self.dataHandlers[i];
                handler(data);
            }
        }, 0);
    }
})






// Loader gets  an flash DOM OBJECT and an EmbedCallback
function defaultLoader(flash, embedCallback) {

    document.body.appendChild(flash);
    embedCallback();


};





MicrophoneF = new MicrophoneF();

ns.MicrophoneF = MicrophoneF;