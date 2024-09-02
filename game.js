var sky = 1;
var sand = 2;
var water = 3;
var wall = 4;

var backgroundPixels = [];
var quality = 60;
var selectedType = sand;



function create_backgroundPixel(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.width = 1;
    this.height = 1;
    this.updatedInCycle = false;
}


function setup() {
    var canvas = createCanvas(quality, quality);
    canvas.parent('sketch-holder');

    backgroundPixels = [];

    for (let x = 0; x < quality; x++) {
        for (let y = 0; y < quality; y++) {
            backgroundPixels.push(new create_backgroundPixel(x, y, sky));
        }
    }
    frameRate(20);
}


function draw() {
    background(30)
    noStroke();

    for (let i = 0; i < backgroundPixels.length; i++) {
        if (backgroundPixels[i].type == sky) {
            fill(color(137, 207, 240));
        }

        if (backgroundPixels[i].type == sand) {
            fill(color(218, 247, 166));
        }

        if (backgroundPixels[i].type == water) {
            fill(color(70, 130, 180));
        }

        if (backgroundPixels[i].type == wall) {
            fill(color(50, 50, 50));
        }

        if (mouseIsPressed) {
            if (floor(mouseX) == backgroundPixels[i].x && floor(mouseY) == backgroundPixels[i].y) {
                backgroundPixels[i].type = selectedType;
            }
        }

        rect(backgroundPixels[i].x, backgroundPixels[i].y, backgroundPixels[i].width, backgroundPixels[i].height);
    }

    requestAnimationFrame(updatePixelsPos);
}


function updatePixelsPos() {
    for (let i = 0; i < backgroundPixels.length; i++) {
        backgroundPixels[i].updatedInCycle = false;
    }

    for (let i = 0; i < backgroundPixels.length; i++) {

        if (backgroundPixels[i].type == sky) {
            continue;
        }

        if (backgroundPixels[i].updatedInCycle == true) {
            continue;
        }

        var getPixelAround = getPixelsAround(backgroundPixels[i]);
        var pixelUnder = getPixelAround[0];
        var pixelLeft = getPixelAround[1];
        var pixelRight = getPixelAround[2];
        var pixelUnderLeft = getPixelAround[3];
        var pixelUnderRight = getPixelAround[4];


        if (backgroundPixels[i].type == sand) {
            if (pixelUnder.type == sky) {
                pixelUnder.type = sand;
                backgroundPixels[i].type = sky;
                pixelUnder.updatedInCycle = true;
                backgroundPixels[i].updatedInCycle = true;
                continue;
            }

            if (pixelUnder.type == water) {
                pixelUnder.type = sand;
                backgroundPixels[i].type = water;
                pixelUnder.updatedInCycle = true;
                backgroundPixels[i].updatedInCycle = true;
                continue;
            }

            if (pixelUnder.type == sand && pixelLeft.type == sky && pixelUnderLeft.type == sky) {
                pixelUnderLeft.type = sand;
                backgroundPixels[i].type = sky;
                pixelUnderLeft.updatedInCycle = true;
                backgroundPixels[i].updatedInCycle = true;
                continue;
            }


            if (pixelUnder.type == sand && pixelRight.type == sky && pixelUnderRight.type == sky) {
                pixelUnderRight.type = sand;
                backgroundPixels[i].type = sky;
                pixelUnderRight.updatedInCycle = true;
                backgroundPixels[i].updatedInCycle = true;
                continue;
            }

        }

        if (backgroundPixels[i].type == water) {
            if (pixelUnder.type == sky) {
                pixelUnder.type = water;
                backgroundPixels[i].type = sky;
                pixelUnder.updatedInCycle = true;
                backgroundPixels[i].updatedInCycle = true;
                continue;
            }

            if (randomInt(0, 1) == 0) {
                if (pixelLeft.type == sky) {
                    pixelLeft.type = water;
                    backgroundPixels[i].type = sky;
                    pixelLeft.updatedInCycle = true;
                    backgroundPixels[i].updatedInCycle = true;
                    continue;
                }
            } else {
                if (pixelRight.type == sky) {
                    pixelRight.type = water;
                    backgroundPixels[i].type = sky;
                    pixelRight.updatedInCycle = true;
                    backgroundPixels[i].updatedInCycle = true;
                    continue;
                }
            }


        }
    }



}

function getPixelsAround(backgroundPixel) {
    var PixelArray = [];

    for (let i2 = 0; i2 < backgroundPixels.length; i2++) {
        if (backgroundPixel.updatedInCycle == true) {
            continue;
        }

        if (backgroundPixels[i2].updatedInCycle == true) {
            continue;
        }

        if ((backgroundPixel.y + 1) == backgroundPixels[i2].y && backgroundPixel.x == backgroundPixels[i2].x) {
            if (backgroundPixels[i2].updatedInCycle == false) {
                PixelArray[0] = backgroundPixels[i2];
            }
        }

        if (backgroundPixel.y == backgroundPixels[i2].y && (backgroundPixel.x - 1) == backgroundPixels[i2].x) {
            if (backgroundPixels[i2].updatedInCycle == false) {
                PixelArray[1] = backgroundPixels[i2];
            }
        }

        if (backgroundPixel.y == backgroundPixels[i2].y && (backgroundPixel.x + 1) == backgroundPixels[i2].x) {
            if (backgroundPixels[i2].updatedInCycle == false) {
                PixelArray[2] = backgroundPixels[i2];
            }
        }

        if ((backgroundPixel.y + 1) == backgroundPixels[i2].y && (backgroundPixel.x - 1) == backgroundPixels[i2].x) {
            if (backgroundPixels[i2].updatedInCycle == false) {
                PixelArray[3] = backgroundPixels[i2];
            }
        }

        if ((backgroundPixel.y + 1) == backgroundPixels[i2].y && (backgroundPixel.x + 1) == backgroundPixels[i2].x) {
            if (backgroundPixels[i2].updatedInCycle == false) {
                PixelArray[4] = backgroundPixels[i2];
            }
        }

        if (PixelArray[0] != undefined && PixelArray[1] != undefined && PixelArray[2] != undefined && PixelArray[3] != undefined && PixelArray[4] != undefined) {
            continue;
        }
    }

    for (let i2 = 0; i2 < 5; i2++) {
        if (PixelArray[i2] == undefined) {
            PixelArray[i2] = [];
        }
    }

    return PixelArray;
}

function removeType(type) {
    for (let i = 0; i < backgroundPixels.length; i++) {
        if (backgroundPixels[i].type == type) {
            backgroundPixels[i].type = sky;
        }
    }
}

function randomPattern() {
    var randomInteger = randomInt(1, 3);
    var randomPixel = "";

    for (let i = 0; i < backgroundPixels.length; i++) {
        backgroundPixels[i].type = sky;
    }

    if (randomInt(0, 1) == 0) {
        randomPixel = sand;
    } else {
        randomPixel = water;
    }

    if (randomInteger == 1) {
        randomLength = randomInt(0, backgroundPixels.length);
        for (let i = 0; i < randomLength; i++) {
            backgroundPixels[i].type = randomPixel;
        }
    }

    if (randomInteger == 2) {
        for (let i = 0; i < backgroundPixels.length; i++) {
            if (randomInt(0, 1) == 0) {
                backgroundPixels[i].type = sand;
            } else {
                backgroundPixels[i].type = water;
            }
        }
    }

    if (randomInteger == 3) {
        for (let i = 0; i < (backgroundPixels.length / 2); i++) {
            if (i.toString().includes(1)) {
                backgroundPixels[i].type = sand;
            } else {
                backgroundPixels[i].type = water;
            }
        }
    }

}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function changeSelectedType(changeSelectedType, thisElement) {
    selectedType = changeSelectedType;
    var selectedTypeButtons = document.querySelectorAll('.selectedTypeButton');
    selectedTypeButtons.forEach(element => {
        element.style.background = "rgb(240, 240, 240)";
    });
    thisElement.style.background = "lightgreen";
}



updatePixelsPos();