document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector("#grid");
    handleGrid(grid);

    const newDrawing = document.querySelector("#new-drawing");
    newDrawing.addEventListener("submit", handleNewDrawing);

    const newColorform = document.querySelector("#choose-color");
    newColorform.addEventListener("submit", handleNewColor);
  
    const deletePalette = document.querySelector("#delete-palette");
    deletePalette.addEventListener("click", handleDeletePalette);

    const eraser = document.querySelector("#eraser");
    eraser.addEventListener("click", handleEraser);

    const download = document.querySelector("#download");
    download.addEventListener("click", handleDownload)

    const downloadRealSize = document.querySelector("#download-real-size");
    downloadRealSize.addEventListener("click", handleDownloadRealSize)

    const selectColor = document.querySelector("#palette");
    selectColor.addEventListener("click", handleSelectColor);
})

let colorSelected = "";
let eraser = false;
let colorId = 0;

//--------------------------------------------

const downloadFile = function(canvas) {
    // Create an invisible A element
    const a = document.createElement("a");
    a.style.display = "none";
    document.body.appendChild(a);
  
    // Set the HREF 
    a.href = canvas.toDataURL("image/png");
  
    // Use download attribute to set desired file name
    a.setAttribute("download", "Qwack");
  
    // Trigger the download by simulating click
    a.click();
  
    // Cleanup
    window.URL.revokeObjectURL(a.href);
    document.body.removeChild(a);
}

const handleDownload = function() {
    const canvas = document.querySelector("#my-canvas");
    upscaleCanvas(canvas);
}

const handleDownloadRealSize = function() {
    const canvas = document.querySelector("#my-canvas");
    downloadFile(canvas);
}

const upscaleCanvas = function(canvas) {
    const c = document.createElement("canvas");
    c.style.display = "none";
    c.height = 512;
    c.width = 512;

    document.body.appendChild(c);
    const ctx = c.getContext("2d");

    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(canvas, 0, 0, 512, 512);

    downloadFile(c);

    document.body.removeChild(c);
}

//-----------------------------------------------------------------

const handleEraser = function() {
    eraser = true;
}

const handleDrawPixel = function(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    drawPixel(x, y);
}

const handlePreRender = function(event) {
    const x = event.offsetX;
    const y = event.offsetY;
}

const drawPixel = function(x, y) {
    const canvas = document.querySelector("#my-canvas");
    const ctx = canvas.getContext("2d")
    const size = canvas.width;
    const boxSide = 512/size;

    const canvasX = Math.floor(x/boxSide);
    const canvasY = Math.floor(y/boxSide);

    if(eraser) {
        ctx.clearRect(canvasX, canvasY, 1, 1)
    } else {
        ctx.fillStyle = colorSelected;
        ctx.fillRect(canvasX, canvasY, 1, 1);
    }
}

const handleNewColor = function(event) {
    event.preventDefault();
    colorId += 1;
    const color = document.querySelector("#color");
    const palette = document.querySelector("#new-palette");

    const newColorItem = createColorItem(color);

    palette.appendChild(newColorItem);
    handleSelectColor();
}

const createLabel = function(color) {
    const newLabel = document.createElement("label");
    newLabel.setAttribute("for",color.id);
    newLabel.setAttribute("class","primary");
    newLabel.style = `background-color: ${color.value}`;
    return newLabel;
}

const createColorItem = function(color) {
    const newColor = document.createElement("input");
    newColor.type = "radio"; 
    newColor.class = "colors-in-palette"
    newColor.value = color.value;
    newColor.name = "color-in-palette";
    newColor.checked = "true";
    newColor.style = `background-color: ${color.value}`;

    return newColor;
}

const handleSelectColor = function() {
    eraser = false;
    const colors = Array.from(document.getElementsByName("color-in-palette"));
    
    colorSelected = colors.find(color => color.checked).value;
}

const handleDeletePalette = function() {
    const palette = document.querySelector("#new-palette");
    while (palette.firstChild) {
        palette.removeChild(palette.lastChild)
    };
}

const handleGrid = function (grid) {
    const size = 8;

    drawGrid(grid, size);

    grid.addEventListener("mousedown", handleDrawPixel);
    grid.addEventListener("mouseover", handlePreRender);
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

    grid.addEventListener("mousedown", handleDrawPixel);
    grid.addEventListener("mouseover", handlePreRender);
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
    ctx.lineWidth = 1;
    ctx.strokeStyle = "white";

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