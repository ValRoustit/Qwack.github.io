document.addEventListener("DOMContentLoaded", () => {
    const newDrawingform = document.querySelector("#new-drawing");
    newDrawingform.addEventListener("submit", handleNewDrawing);

    const newColorform = document.querySelector("#colors-palette");
    newColorform.addEventListener("submit", handleNewColor);
  
    const deletePalette = document.querySelector("#delete-palette");
    deletePalette.addEventListener("click", handleDeletePalette);
})

const handleNewColor = function() {
    event.preventDefault();
    // debugger
    const color = document.querySelector("#color");
    const palette = document.querySelector("#palette");

    const newColorItem = createColorItem(color);
    palette.appendChild(newColorItem);
}

const createColorItem = function(color) {
    const newItem = document.createElement("input");
    newItem.type = "radio"; 
    newItem.value = color.value;
    newItem.id = "color-in-palette";
    return newItem;
}

const handleDeletePalette = function(event) {
    const palette = document.querySelector("#palette");
    while (palette.firstChild) {
        palette.removeChild(palette.lastChild)
    };
}

const handleNewDrawing = function (event) {
    event.preventDefault();
    const size = event.target.size.value;
    const gridSize = 513;
  
    const drawing = document.querySelector("#drawing");
    while (drawing.firstChild) {
        drawing.removeChild(drawing.lastChild)
    };

    const canvas = createCanvas("my-canvas", size);
    drawing.appendChild(canvas);

    const grid = createCanvas("grid", gridSize);
    drawing.appendChild(grid);

    drawGrid(grid, size);
}

const createCanvas = function(id, size) {
    const canvas = document.createElement("canvas");
    canvas.id = id;
    canvas.height = size;
    canvas.width = size;
    return canvas
}

const drawGrid = function(canvas, size) {
    const ctx = canvas.getContext("2d")
    const pixelLength = (canvas.height-1)/size
    ctx.lineWidth = 0.5;

    ctx.translate(0.5, 0.5);
    for (var i=0; i<=canvas.height; i+=pixelLength) {

        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.height, i)
        ctx.stroke();
        ctx.closePath();
    }
}