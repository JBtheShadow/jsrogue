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
}

draw("Hexagonal hack");
draw("Proper hexagons", "hex");
draw("Hexes Indexing", "hex", {
    spacing: 3.5,
    fontSize: 12,
    tileFunc: function (x, y) {
        return `[${y},${x}]`;
    },
    bgFunc: function (x, y) {
        switch (x % 3) {
            case 0: return "purple";
            case 1: return "magenta";
            case 2: return "violet";
        }
    },
    border: "10px solid black"
});