var sky = 1;
var dirt = 2;
var water = 3;
var wall = 4;
var seed = 5;
var tree_base = 6;
var tree_roots = 7;
var tree_leafs = 8;
var tree_height = 0;

var backgroundPixels = [];
var quality = 60;
var selectedType = 5;



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

    for (let i = 0; i < backgroundPixels.length; i++) {
        if (backgroundPixels[i].y > quality - 15) {
            if (randomInt(0, 1) == 1) {
                backgroundPixels[i].type = dirt;
            }
        }
    }

    frameRate(20);
}


function draw() {
    background(30)
    noStroke();

    for (let i = 0; i < backgroundPixels.length; i++) {
        if (backgroundPixels[i].type == sky) {
            fill(color(181, 229, 245));
        }

        if (backgroundPixels[i].type == dirt) {
            fill(color(84, 69, 18));
        }

        if (backgroundPixels[i].type == water) {
            fill(color(70, 130, 180));
        }

        if (backgroundPixels[i].type == wall) {
            fill(color(50, 50, 50));
        }

        if (backgroundPixels[i].type == seed) {
            fill(color(82, 163, 20));
        }

        if (backgroundPixels[i].type == tree_base) {
            fill(color(230, 199, 147));
        }

        if (backgroundPixels[i].type == tree_roots) {
            fill(color(135, 121, 103));
        }

        if (backgroundPixels[i].type == tree_leafs) {
            fill(color(82, 163, 20));
        }

        if (mouseIsPressed) {
            if (floor(mouseX) == backgroundPixels[i].x && floor(mouseY) == backgroundPixels[i].y && selectedType > 0) {
                backgroundPixels[i].type = selectedType;
                selectedType = 0;
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
        var pixelAbove = getPixelAround[5];


        if (backgroundPixels[i].type == dirt) {
            if (pixelUnder.type == sky) {
                pixelUnder.type = dirt;
                backgroundPixels[i].type = sky;
                pixelUnder.updatedInCycle = true;
                backgroundPixels[i].updatedInCycle = true;
                continue;
            }

            if (pixelUnder.type == water) {
                pixelUnder.type = dirt;
                backgroundPixels[i].type = water;
                pixelUnder.updatedInCycle = true;
                backgroundPixels[i].updatedInCycle = true;
                continue;
            }

            if (pixelUnder.type == dirt && pixelLeft.type == sky && pixelUnderLeft.type == sky) {
                pixelUnderLeft.type = dirt;
                backgroundPixels[i].type = sky;
                pixelUnderLeft.updatedInCycle = true;
                backgroundPixels[i].updatedInCycle = true;
                continue;
            }


            if (pixelUnder.type == dirt && pixelRight.type == sky && pixelUnderRight.type == sky) {
                pixelUnderRight.type = dirt;
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

        if (backgroundPixels[i].type == seed) {
            if (pixelUnder.type == sky) {
                pixelUnder.type = seed;
                backgroundPixels[i].type = sky;
                pixelUnder.updatedInCycle = true;
                backgroundPixels[i].updatedInCycle = true;
                continue;
            }

            if (pixelUnder.type == dirt) {
                backgroundPixels[i].type = tree_base;
                pixelUnder.type = tree_roots;
                continue;
            }
        }


    }
}


function updateTree() {
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
        var pixelAbove = getPixelAround[5];



        if (backgroundPixels[i].type == tree_roots) {
            if (pixelUnder.type == dirt) {
                pixelUnder.type = tree_roots;
                pixelUnder.updatedInCycle = true;
                backgroundPixels[i].updatedInCycle = true;
                continue;
            }
        }

        if (backgroundPixels[i].type == tree_base) {
            if (pixelAbove.type == sky) {
                if (tree_height < 17) {
                    pixelAbove.type = tree_base;
                    pixelAbove.updatedInCycle = true;
                    backgroundPixels[i].updatedInCycle = true;
                    tree_height++;
                }
                continue;
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

        if ((backgroundPixel.y - 1) == backgroundPixels[i2].y && backgroundPixel.x == backgroundPixels[i2].x) {
            if (backgroundPixels[i2].updatedInCycle == false) {
                PixelArray[5] = backgroundPixels[i2];
            }
        }

        if (PixelArray[0] != undefined && PixelArray[1] != undefined && PixelArray[2] != undefined && PixelArray[3] != undefined && PixelArray[4] != undefined && PixelArray[5] != undefined) {
            continue;
        }
    }

    for (let i2 = 0; i2 < 6; i2++) {
        if (PixelArray[i2] == undefined) {
            PixelArray[i2] = [];
        }
    }

    return PixelArray;
}



function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}



updatePixelsPos();

setInterval(updateTree, 500);