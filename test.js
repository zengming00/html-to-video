var page = require('webpage').create();
page.viewportSize = { width: 480, height: 800 };

var url = 'http://a3.rabbitpre.com/m/U7VRJzs?mobile=1';
var url = 'file:///C:/Users/admin/Downloads/phantomjs-2.1.1-windows/bin/aa.html';


var startRecord = false;
var stopRecord = false;

page.onInitialized = function () {
    page.evaluate(function () {
        (function () {
            window.foooo = function () {
                console.log('fooooo');
            }
            window.startRec = function () {
                console.log('startrec')
                startRecord = true;
            }
            window.stopRec = function () {
                console.log('stoprec')
                stopRecord = true;
            }
        })();
    });
};

page.onConsoleMessage = function (msg) {
    console.log('onConsoleMessage:', msg);
};

page.onCallback = function (msg) {
    if (msg.start) {
        console.log('startttt');
        startRecord = true;
        return 'ok now start';
    }
    if (msg.stop) {
        console.log("stopppp");
        stopRecord = true;
        return 'ok now stop';
    }
    return 'iii';
}


page.open(url, function () {
    var framerate = 25;
    var frame = 0;
    var last = Date.now();
    var nextSec = last + 1000;
    var sec = 1;
    var avg = 0;

    function render() {
        var t = 1;
        if (startRecord) {
            frame++;
            page.render('frames/dragon' + frame + '.bmp', { format: "bmp" });
            // page.render('/dev/null', { format: 'bmp' });

            var n = Date.now();
            var v = n - last;
            avg += v;
            last = n;
            console.log(frame, v);

            if (n <= nextSec) {
                var t0 = nextSec - n;
                var f0 = (framerate * sec) - frame;
                t = t0 / f0;
                console.log('next t:', t);
            } else {
                nextSec = last + 1000;
                sec++;
            }

            // if (frame === endFrame) {
            //     page.evaluate(function () {
            //         var o = document.getElementById('b');
            //         if (o) {
            //             o.innerText = 'helloworld';
            //         }
            //     })
            // }

            if (stopRecord) {
                var a = avg / frame;
                console.log('avg:', a, ', r:', 1000 / a)
                phantom.exit();
            }
        }
        setTimeout(render, t);
    }
    render();
});