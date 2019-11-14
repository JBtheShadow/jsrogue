var width = 30;
var height = 10;

function getTile( x, y) {
    return x <= 1 || y <= 0 || x >= width - 2 || y >= height - 1 ? "#" : ".";
}

function draw(title, layout, args) {
    var options = { width: width, height: height };
    if (layout) {
        options.layout = layout;
    }
    var tileFunc = getTile;
    var bgFunc = () => "red";
    var border = "";
    if (args) {
        if (args.spacing) {
            options.spacing = args.spacing;
        }
        if (args.fontSize) {
            options.fontSize = args.fontSize;
        }
        if (args.tileFunc && typeof args.tileFunc === "function") {
            tileFunc = args.tileFunc;
        }
        if (args.bgFunc && typeof args.bgFunc === "function") {
            bgFunc = args.bgFunc;
        }
        if (args.border) {
            border = args.border;
        }
    }

    var display = new ROT.Display(options);
    var container = display.getContainer();
    container.style.display = "block";
    container.style.margin = "5px 0";
    if (border) {
        container.style.border = args.border;
    }
    document.body.append(title);
    document.body.appendChild(container);

    for (var y = 0; y < height; y++) {
        for (var x = y % 2; x < width; x += 2) {
            var tile = tileFunc(x, y);
            var bg = bgFunc(x, y);
            display.draw(x, y, tile, "white", bg);
        }
    }

    return display;
}

draw("Hexagonal hack");
draw("Proper hexagons", "hex");
var other = draw("Hexes Indexing", "hex", {
    spacing: 3.5,
    fontSize: 12,
    tileFunc: function (x, y) {
        return `[${y},${x}]`;
    },
    bgFunc: function (x, _y) {
        switch (x % 3) {
            case 0: return "purple";
            case 1: return "magenta";
            case 2: return "violet";
        }
    },
    border: "10px solid black"
});

function colorfulText(text) {
    var colors = ["darkred", "brown", "red", "darkorange", "orange", "goldenrod"];
    var newText = "";
    for (var i = 0; i < text.length; i += 2) {
        newText += "%b{" + colors[i / 2 % colors.length] + "}" + (text[i] || "") + "%b{}" + (text[i+1] || "");
    }
    return newText;
}

other.drawText(1, 9, "%c{white}" + colorfulText("Look at this funky text!") + "%c{}");

var display = new ROT.Display({ bg: "transparent", width: 85, height: 30 });
var container = display.getContainer();
container.style.position = "absolute";
container.style.top = "394px";
container.style.left = "12px";
document.body.appendChild(container);
var ln = 0;
ln += display.drawText(0, ln, "%b{black}" + "Some text to write over the previous display");
ln += display.drawText(0, ln, "%b{black}" + "I just gotta be careful with word wrapping at some point, but I guess we'll see what happens...");
ln += display.drawText(0, ln, "%b{black}" + "Will things break if I do this? Not anymore! drawText returns the amount of lines the text will use up");
ln += display.drawText(0, ln, "%b{black}" + "Which means I can just use it to know where to place the next line. Nice! :D");

/*
 var ln = 0;
display.setOptions({ bg: "black" });
display.clear();
display.setOptions({ height: 0 });
ln += display.drawText(0, ln, "Some text to write over the previous display");
display.setOptions({ height: ln });
ln += display.drawText(0, ln, "I just gotta be careful with word wrapping at some point, but I guess we'll see what happens...");
display.setOptions({ height: ln });
ln += display.drawText(0, ln, "Will things break if I do this? Not anymore! drawText returns the amount of lines the text will use up");
display.setOptions({ height: ln });
ln += display.drawText(0, ln, "Which means I can just use it to know where to place the next line. Nice! :D");
display.setOptions({ height: ln });
 */

//display.drawText(0, 0, "Some text to write over the previous display");