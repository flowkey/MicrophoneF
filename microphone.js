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
        if (self.flash) return;

        options = options || {};
        var swfLocation = options.swfLocation || "/MicrophoneMain.swf"; // falling back on default MicrophoneSWF position
        var domId = options["domId"] || "__microphoneFFlash__";
        var loader = options["loader"] || defaultLoader;

        var flash = document.createElement("div");
        flash.id = domId;
        document.body.appendChild(flash);
        console.log(swfobject);
        self.flash = flash;
        swfobject.embedSWF(
            swfLocation,
            domId,
            "215",
            "138",
            "10.0.0",
            null, {
                namespace: "MicrophoneF"
            }, {
                hasPriority: true,
                allowScriptAccess: "always"
            },
            null,
            function(e) {
                MicrophoneF.log("Embed " +
                    (e.success ? "succeeded" : "failed"));
                setTimeout(function() {
                    MicrophoneF.flash.__enable()
                }, 1000)


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