document.addEventListener("DOMContentLoaded", () => {
    // debugger

    const newDrawingform = document.querySelector('#new-drawing');
    newDrawingform.addEventListener('submit', handleNewDrawing);

    const newColorform = document.querySelector('#colors-palette');
    newColorform.addEventListener('submit', handleNewColor);
  
    const deletePalette = document.querySelector('#delete-palette');
    deletePalette.addEventListener('click', handleDeletePalette);
})

const handleNewDrawing = function (event) {
    event.preventDefault();
    const height = event.target.height.value;
    const width = event.target.width.value;
    const heightGrid = height * 32;
    const widthGrid = width * 32;
    debugger
  
    const drawing = document.querySelector('#drawing');
    while (drawing.firstChild) {drawing.removeChild(drawing.lastChild)};

    const canvas = createCanvas("my-canvas", height, width);
    drawing.appendChild(canvas);

    const grid = createCanvas("grid", heightGrid, widthGrid);
    drawing.appendChild(grid);

    drawGrid("grid");
}

const handleNewColor = function(event) {

}

const handleDeletePalette = function(event) {

}

const createCanvas = function(id, height, width) {
    const canvas = document.createElement("canvas");
    canvas.id = id;
    canvas.height = height;
    canvas.width = width;
    return canvas
}

const drawGrid = function(id) {
    const grid = document.getElementById(id);
    const ctx = grid.getContext('2d')

    for(let i = 0; i <= grid.height; i += i * 32) {
        ctx.moveTo(0, i);
        ctx.lineTo(grid.width, i);
        ctx.stroke();
    }
}


// const grid = document.getElementById("grid");
// const ctxGrid = grid.getContext('2d');

// ctxGrid.fillStyle = 'black';
// ctxGrid.fillRect(0, 0, grid.width, grid.height);