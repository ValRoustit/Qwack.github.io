document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("grid");
    const ctxGrid = grid.getContext('2d');
    // debugger 
    
    ctxGrid.fillStyle = 'black';
    ctxGrid.fillRect(0, 0, grid.width, grid.height);

})


// ctxGrid.moveTo(0, 5);
// ctxGrid.lineTo(grid.height, 5);
// ctxGrid.stroke();

// const drawGrid = function() {
//     for(const i = 0; i < grid.height; i++) {
//         ctxGrid.moveTo(0, i);
//         ctxGrid.lineTo(grid.height, i);
//         ctxGrid.stroke();
//     }
// }
