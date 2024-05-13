document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Configuration variables
    const fontSize = 16;
    const verticalSpacing = 30;
    const horizontalSpacing = 60;
    const xOffset = 50;
    const yOffsetOperations = 300;
    const yOffsetData = 50;
    const resultOffsetX = 650;
    const resultOffsetY = 200;
    const curveHeight = 40;
    const controlWidth = 20;
    const dataColor = "blue";
    const opColor = "orange";
    const resultColor = "green";

    // Matrix definitions
    let operations = { rows: 5, cols: 5, data: [], x: xOffset, y: yOffsetOperations };
    let data = { rows: 3, cols: 3, data: [], x: xOffset + 300, y: yOffsetData };
    let resultMatrix = { rows: operations.rows, cols: data.cols, data: [], x: resultOffsetX, y: resultOffsetY };

    function initMatrix(matrix, zero=false) {
        matrix.data = [];
        for (let i = 0; i < matrix.rows; i++) {
            let row = [];
            if (zero) {
                for (let j = 0; j < matrix.cols; j++) {
                    row.push(parseFloat(Number(0).toFixed(2)));
                }
            } else {
                for (let j = 0; j < matrix.cols; j++) {
                    row.push(parseFloat(Math.random().toFixed(2)));
                }
            }
            matrix.data.push(row);
        }
    }

    function updateMatrices() {
        initMatrix(operations);
        initMatrix(data);
        if (operations.cols !== data.rows) {
            resultMatrix.data = [];
            resultMatrix.rows = 0;
            resultMatrix.cols = 0;
        } else {
            resultMatrix.rows = operations.rows;
            resultMatrix.cols = data.cols;
            initMatrix(resultMatrix, true);
        }
    }

    updateMatrices();

    let resizing = false;
    let resizeAxis = '';
    let currentMatrix;

    function startResize(e) {
        [operations, data].forEach(matrix => {
            let matrixRight = matrix.x + matrix.cols * horizontalSpacing;
            let matrixBottom = matrix.y + matrix.rows * verticalSpacing;
            // Check for X-axis resize handle
            if (e.clientX >= matrix.x && e.clientX <= matrixRight &&
                e.clientY >= matrixBottom && e.clientY <= matrixBottom + controlWidth) {
                resizing = true;
                resizeAxis = 'x';
                currentMatrix = matrix;
            }
            // Check for Y-axis resize handle
            if (e.clientX >= matrixRight && e.clientX <= matrixRight + controlWidth &&
                e.clientY >= matrix.y && e.clientY <= matrixBottom) {
                resizing = true;
                resizeAxis = 'y';
                currentMatrix = matrix;
            }
        });
    }

    function resize(e) {
        if (resizing && currentMatrix) {
            if (resizeAxis === 'x') {
                let newCols = Math.min(Math.max(1, Math.floor((e.clientX - currentMatrix.x) / horizontalSpacing)), 5);
                currentMatrix.cols = newCols;
            } else if (resizeAxis === 'y') {
                let newRows = Math.min(Math.max(1, Math.floor((e.clientY - currentMatrix.y) / verticalSpacing)), 5);
                currentMatrix.rows = newRows;
            }
            updateMatrices();
            draw();
        }
    }

    function endResize(e) {
        resizing = false;
        resizeAxis = '';
        currentMatrix = null;
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawLines();
        drawMatrix(operations, "operations", opColor);
        drawMatrix(data, "data", dataColor);
        if (resultMatrix.data.length > 0) {
            drawMatrix(resultMatrix, "result", resultColor);
        } else {
            ctx.fillStyle = 'red';
            ctx.fillText('Matrix dimensions mismatch!', resultMatrix.x, resultMatrix.y);
        }
    }

    function drawMatrix(matrix, name, color) {
        ctx.fillStyle = 'white';
        ctx.font = `${1}rem monospace`;
        matrix.data.forEach((row, i) => {
            row.forEach((cell, j) => {
                let x = matrix.x + j * horizontalSpacing;
                let y = matrix.y + i * verticalSpacing;
                ctx.fillText(cell.toFixed(2), x, y);
            });
        });
        // draw label text
        ctx.fillStyle = color
        ctx.fillText(name, matrix.x, matrix.y - fontSize * 1.5)
        console.log(matrix, name, color)
        ctx.fillStyle = 'grey';
        // Draw X-axis control
        ctx.fillRect(matrix.x, matrix.y + matrix.rows * verticalSpacing, matrix.cols * horizontalSpacing, controlWidth);
        ctx.fillStyle = 'black';
        ctx.fillText(matrix.cols, matrix.x + matrix.cols * horizontalSpacing / 2 - 5, matrix.y + matrix.rows * verticalSpacing + 15);
        // Draw Y-axis control
        ctx.fillStyle = 'grey';
        ctx.fillRect(matrix.x + matrix.cols * horizontalSpacing, matrix.y, controlWidth, matrix.rows * verticalSpacing);
        ctx.fillStyle = 'black';
        ctx.fillText(matrix.rows, matrix.x + matrix.cols * horizontalSpacing + 5, matrix.y + matrix.rows * verticalSpacing / 2 + 5);
    }


    function drawLines(matrix, color){

    }


    canvas.addEventListener('mousedown', startResize);
    canvas.addEventListener('mousemove', resize);
    canvas.addEventListener('mouseup', endResize);

    draw(); // Initial draw
});
