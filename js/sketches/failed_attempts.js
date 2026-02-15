/*
 *
 * Failed Attempts at Art
 *
 */

/*
 *
 * Failed attempt to make clouds using noise
 *
 */
// p.loadPixels();
// const d = p.pixelDensity();

// // we multiply by 4 because the pixel[] array is the size of the display window * 4 (including the pixel density)
// const widthOfCanvas = Math.pow(4, d) * p.width;
// const heightOfCanvas = Math.pow(4, d) * p.height;

// for (let y = 0; y < heightOfCanvas; y+=4) {
//     for (let x = 0; x < widthOfCanvas; x+=4) {
//         const grayScale = Math.floor(p.random(255));
//         p.pixels[x] = grayScale;
//         p.pixels[x+1] = grayScale;
//         p.pixels[x+2] = grayScale;
//         p.pixels[x+3] = 1;
//     }
// }
// p.updatePixels();

/*
 * This one draws the canvas, the one above it doesn't!
 */

// const fullCanvas = 4 * (p.windowWidth * d) * (p.windowHeight * d);
// for (let i = 0; i < fullCanvas; i+=4) {
//     const bright = p.color(Math.floor(p.random(255)), Math.floor(p.random(255)), Math.floor(p.random(255)));
//     p.pixels[i] = p.red(bright);
//     p.pixels[i+1] = p.green(bright);
//     p.pixels[i+2] = p.blue(bright);
//     p.pixels[i+3] = p.alpha(bright);
// }
// p.updatePixels();

/*
 * Successful Line Drawing thingy!
 */
const lineDraw = function () {
  p.draw = function () {
    p.background(255);

    // Two Vectors, one for the mouse location and one for the center of the window
    const mouse = p.createVector(p.mouseX, p.mouseY);
    const center = p.createVector(p.windowWidth / 2, p.windowHeight / 2);

    // Vector subtraction & multiplication!
    mouse.sub(center);
    // mouse.mult(0.5);

    const mag = mouse.mag();
    p.fill(0);
    p.rect(0, 0, mag, 10);

    // Draw a line to represent the vector.
    p.translate(center.x, center.y);
    p.line(0, 0, mouse.x, mouse.y);
  };
};
