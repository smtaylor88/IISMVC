//$(function () {
//    $("#slider-vertical").slider({
//        orientation: "vertical",
//        range: "min",
//        min: 0,
//        max: 10,
//        value: 5,
//        slide: function (event, ui) {
//            $("#amount").val(ui.value);
//        }
//    });
//    $("#amount").val($("#slider-vertical").slider("value"));
//});

function ScrollingObjectsArea(canvas, thingCnt, top, left, mheight, width,
            fillstyle, background, direction, scrollSpeed, stringType, leftPos, scrollSeparation, variableScrollSpeed) {

    // make sure all parameters are in the correct type
    mheight = parseInt(mheight);
    width = parseInt(width);
    scrollSpeed = parseInt(scrollSpeed);
    stringType = parseInt(stringType);
    leftPos = parseInt(leftPos);
    scrollSeparation = parseInt(scrollSeparation);
    variableScrollSpeed = parseInt(variableScrollSpeed);

    // canvas definition
    canvas.style.zIndex = 8;
    canvas.style.position = "absolute";
    canvas.style.border = "1px solid";
    canvas.style.top = top + "px";
    canvas.style.left = left + "px";
    canvas.style.background = background;

    // stop the cukrrent timer
    clearInterval(scrollTimer);

    // get a reference to the canvas context object & set it's size & position features
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.clearRect(0, 0, width, mheight);
    ctx.canvas.top = top;
    ctx.canvas.height = mheight;
    ctx.canvas.width = width;

    // define the context within the canvas object
    ctx.top = parseInt(top);
    ctx.left = parseInt(left);
    ctx.height = parseInt(mheight);
    ctx.width = parseInt(width);
    ctx.fillStyle = fillstyle;
    fontSize = 32;

    // load some data into an array (either single characters or long strings of text)
    var data = singleCharacters(); // default is single characters
    if (stringType > 0)
        var data = longTextStrings();

    // define n objects (things) with properties:
    //   - x :    vertical coordinate
    //   - y :    horizontal coordinate
    //   - strval:  some string value to scroll
    //   - speed: an integer value to reposition the data
    // store the requested # of things in an array for processing
    var things = [];
    things.length = 0;
    var THINGCOUNT = thingCnt;
    var rowcount = 1;
    for (var i = 0; i < THINGCOUNT; i++) {
        var a = {};
        //randomly pick one string object from the array
        a.strval = data[Math.round(Math.random() * data.length)];
        if (a && a.strval) {
            // where to position the string from left border
            if (leftPos == 0)
                a.x = Math.random() * width; //random distance from the left border
            else
                a.x = 5;

            if (direction == 'DOWN') {
                if (scrollSeparation == 0) {
                    a.y = Math.random() * mheight; // - height; // random Y that is above the screen
                }
                else {
                    a.y = 1 * mheight + rowcount; // - mheight; // random Y that is above the screen
                    rowcount -= fontSize;
                }
            }
            else {
                if (scrollSeparation == 0) {
                    a.y = Math.random() * mheight + mheight; // random Y that is below the screen
                }
                else {
                    a.y = 1 * mheight + rowcount; // random Y that is below the screen
                    rowcount += fontSize;
                    //a.y = 1 * mheight + mheight; // random Y that is below the screen
                }
            }

            if (variableScrollSpeed) {
                a.speed = Math.random() * scrollSpeed;
            }
            else {
                a.speed = scrollSpeed;
            }

            a.forecolor = randomForeColor();

            //if (scrollSpeed == 0) {
            //    if (variableScrollSpeed) {
            //        a.speed = Math.random() * scrollSpeed;
            //    }
            //    else {
            //        a.speed = Math.random() * ;
            //    }
            //}
            //else {

            //    a.speed = scrollSpeed;
            //}

            things.push(a);
        }
    }

    startScrolling(ctx, width, mheight, THINGCOUNT, things, direction, ctx.fillStyle, fontSize)
}

function killTheTimer(killTimer) {
    if (killTimer) {
        clearInterval(scrollTimer);
        scrollTimer = null;
    }
    if (!killTimer)
        setInterval(scrollTimer, 50);
}

var scrollTimer;
function startScrolling(ctx, width, mheight, THINGCOUNT, things, direction, originalfillStyle, fontSize) {
    scrollTimer = setInterval(function () {
        ctx.clearRect(0, 0, width, mheight);
        ctx.font = fontSize + "px Arial";
        if (originalfillStyle=='#000000') // randomly switch the font color each iteration
            ctx.fillStyle = randomForeColor();
        for (var i = 0; i < THINGCOUNT; i++) {
            var a = things[i];
            if (a && a.strval) {
                ctx.fillText(a.strval, a.x, a.y);
                if (direction == 'DOWN') {
                    a.y += a.speed; // drop by the speed amount
                    console.log(a.y);
                    if (a.y > (((fontSize * THINGCOUNT))))    // mheight)
                        a.y = (fontSize*-1); // if off the screen at bottom put back to top
                }
                else {
                    a.y -= a.speed; // rise by the speed amount
                    if (a.y < (((fontSize * THINGCOUNT)-mheight) * -1)) { // -50) {
                        a.y = mheight - 20; // if off the screen at top put back to bottom
                        //console.log(a.y);
                    }
                }
            }
        }
    }, 50);
}

function randomForeColor() {
    var colors = ['red', 'green', 'blue', 'cyan', 'yellow', 'white', 'gray', 'magenta'];
    var randomcolor = 'yellow';
    randomcolor = colors[Math.floor(Math.random() * colors.length)];
    return randomcolor;
}

//var randomtext = "some random text";
function randomString() {
    var chars = ",.-_()!#$%&*(0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 8;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += ' ' + chars.substring(rnum, rnum + 1);
    }
    randomtext += ' ' + randomstring;
    return randomtext;
}

function SentencesFromParagraph() {
    var examplex = "This is an example of a paragraph! It contains three sentences? And the average sentence has many words.";
    var example = "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin." +
        "He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections." +
        "The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of" +
        "him, waved about helplessly as he looked. It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four" +
        "familiar walls. A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he" +
        "had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright," +
        "raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather.";
    var sentences = example.match(/[^\.!\?]+[\.!\?]+/g);
    var sentenceCnt = sentences.length;
}

function longTextStrings() {
    return [
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. ",
        "Aenean commodo ligula eget dolor.",
        "Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        "Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
        "Aenean vulputate eleifend tellus.",
        "Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.",
        "Aenean imperdiet.",
        "Etiam ultricies nisi vel augue. ",
        "Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero,",
        "Nam eget dui.",
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
        "illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
        "When, while the lovely valley teems with vapour around me,",
        "I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine.",
    ];
}

function singleCharacters() {
    return ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
        ".", "-", "_", "(", ")", "!", "#", "$", "%", "&", "*", "("];
}

