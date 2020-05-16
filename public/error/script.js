$(function(){
    var world = document.getElementById('world');
    var world_cx = world.getContext('2d');
    var world_w, world_h;

    var display = document.getElementById('display');
    var rgb = document.getElementById('rgb');
    var interlace = document.getElementById('interlace');

    var cv = document.createElement('canvas');
    var cx = cv.getContext('2d');
    var cw = cv.width = 100;
    var ch = cv.height = 100;
    var dt = cx.createImageData(cw, ch);
    var dd = dt.data, dl = dt.width * dt.height;

    function generateNoise() {
        var p = 0, i = 0;
        for (; i < dl; ++i) {
            dd[p++] = c = Math.floor(Math.random() * 256);
            dd[p++] = c;
            dd[p++] = c;
            dd[p++] = 255;
        }
        cx.putImageData(dt, 0, 0);
    }

    function resize() {
        var w = window.innerWidth;
        var h = window.innerHeight;
        world_w = world.width = w >> 1;
        world_h = world.height = h >> 1;
        world.style.width = w + 'px';
        world.style.height = h + 'px';
    }

    resize();
    window.addEventListener('resize', resize, false);
    window.addEventListener('load', function() {
        var s = +new Date;
        generateNoise();
        world_cx.fillStyle = world_cx.createPattern(cv, 'repeat');
        world_cx.fillRect(0, 0, world_w, world_h);
        setTimeout(arguments.callee, 20);
    }, false);
})