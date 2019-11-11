let canvas = document.querySelector("canvas");
if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 500;
    canvas.style.display = "none";
    document.body.append(canvas);
}
let ctx = canvas.getContext("2d");
ctx.textBaseline = "bottom";

const defaults = {
    fonts: {
        normal: "14px Consolas",
        title: "20px Consolas",
    },
    dimensions: {
        title: { w: canvas.width, h: 24 }
    },
    colors: {
        system: "blue",
        text: "white",
    }
}

function clear(x, y, w, h) {
    ctx.clearRect(x, y, w, h);
}

function clearAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color || defaults.colors.system;
    ctx.fillRect(x, y, w, h);
}

function forceWordWrap(text, width) {
    var letters = text.split("");
    var strings = [];
    var aux = "";
    while (letters && letters.length) {
        var letter = letters.shift();
        if (ctx.measureText(aux + letter).width > width) {
            strings.push(aux);
            aux = letter;
        }
        else {
            aux += letter;
        }
    }
    if (aux && aux.length) {
        strings.push(aux);
    }
    return strings;
}

function wordWrap(text, width) {
    var words = text.split(" ");
    var strings = [];
    var aux = "";
    while (words && words.length) {
        var word = words.shift();
        var candidate = (aux + " " + word).trim();
        if (ctx.measureText(word).width > width) {
            split = forceWordWrap(word, width);
            words.splice(0, 0, ...split);
        }
        else if (ctx.measureText(candidate).width > width) {
            strings.push(aux);
            aux = word;
        }
        else {
            aux = candidate;
        }
    }
    if (aux && aux.length) {
        strings.push(aux);
    }
    return strings;
}

function drawText(text, x, y, font, color) {
    ctx.font = font || defaults.fonts.normal;
    ctx.fillStyle = color || defaults.colors.text;
    ctx.fillText(text, x, y)
}

function drawTitle(text) {
    drawRect(0, 0, defaults.dimensions.title.w, defaults.dimensions.title.h, null);
    drawText(text, 5, defaults.dimensions.title.h, defaults.fonts.title, null);
}

clearAll();
drawTitle("Welcome to this roguelike test made with Javascript!");
drawText("There's not much at the moment but please enjoy this black screen with (most) everything drawn on a canvas :P", 5, 43);

drawText("Sadly I still have to figure out a less tedious way to draw text on a canvas without manually setting the coordinates. Another concern of mine is word ", 5, 75);
drawText("wrapping. I had to manually break the previous line and draw this one anew.", 5, 91);

drawText("Now why in heck am I doing this instead of just writing characters on the screen? Honestly, I dunno! Maybe to prevent copy and paste, maybe because I'm a ", 5, 123)
drawText("masochist, but whichever the case, I want to try this. xP", 5, 139)