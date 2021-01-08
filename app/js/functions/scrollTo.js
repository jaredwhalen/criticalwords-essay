function noease(t, b, c, d) {
    t /= d;
    return b + c * (t);
}

function ease(t, b, c, d) {
    return Math.round(-c * Math.cos(t / d * (Math.PI / 2)) + c + b);
}

export default function scrollTo(x) {
    //elapsed
    var e;
    //duration in milli seconds
    var d = 30000;
    //b as in begin, where to start (you could get this dynamically)
    var b = 0;
    //start time, when the animation starts
    var s = (new Date()).getTime(); //start time
    //the magic
    var t = setInterval(function () {
        //calculate elapse time
        e = (new Date()).getTime() - s;
        //check if elapse time is less than duration
        if (e < d) {
            //animate using an easing equation
            window.scrollTo(0, noease(e, b, x, d));
        } else {
            //animation is complete, stop interval timer
            clearInterval(t);
            t = null;
        }
    }, 4);
    return t;
}
