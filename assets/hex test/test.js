var width = 30;
var height = 10;

document.body.append("Hexagonal 'hack'");

var display = new ROT.Display({ width: width, height: height });
var container = display.getContainer();
container.style.display = "block";
container.style.margin = "5px";
document.body.appendChild(container);

for (var y = 0; y < height; y++) {
    for (var x = y % 2; x < width; x += 2) {
        var tile = x <= 1 || y <= 0 || x >= width - 2 || y >= height - 1 ? "#" : ".";
        display.draw(x, y, tile, "white", "red");
    }
}

document.body.append("Proper hexagons");

var display2 = new ROT.Display({ width: width, height: height, layout: "hex" });
var container2 = display2.getContainer();
container2.style.display = "block";
container2.style.margin = "5px";
document.body.appendChild(container2);

for (y = 0; y < height; y++) {
    for (x = y % 2; x < width; x += 2) {
        tile = x <= 1 || y <= 0 || x >= width - 2 || y >= height - 1 ? "#" : ".";
        display2.draw(x, y, tile, "white", "red");
    }
}