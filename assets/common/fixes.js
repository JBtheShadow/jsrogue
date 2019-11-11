if (typeof Object.prototype.extend === "undefined") {
    Object.prototype.extend = function (source) {
        var destination = this;
        var property;
        if (source && destination) {
            for (property in source) {
                destination[property] = source[property];
            }
        }
        if (source.prototype && destination.prototype) {
            for (property in source.prototype) {
                destination.prototype[property] = source.prototype[property];
            }
        }

        return destination;
    };
}

if (typeof Array.prototype.randomize === "undefined") {
    Array.prototype.randomize = function() {
        var array = this;
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };
}

if (typeof Array.prototype.random === "undefined") {
    Array.prototype.random = function () {
        var array = this;
        var randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    };
}