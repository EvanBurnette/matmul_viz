import { getMatrix, fruits, shoppers, stores, Node, transpose, getZeroMatrix, elemWiseMult, sumVec } from "./matrixData.js";

import { mean } from 'lodash';

import { hslaToHexa } from './utils.js';

export function matmulViz(canvas, buttons = {}) {
  const shoppers_set = new Set(shoppers);
  const ctx = canvas.getContext('2d');

  const squareDim = Math.min(window.innerWidth, window.innerHeight) - 20;
  canvas.height = squareDim;

  const divs = 16;
  const grid_size = Math.round(squareDim / divs);
  canvas.width = squareDim;

  function drawGrid() {
    ctx.lineWidth = 1;
    for (let c = 0; c < divs; c++) {
      ctx.beginPath();
      ctx.strokeStyle = "#AA3";
      ctx.moveTo(grid_size * c, 0);
      ctx.lineTo(grid_size * c, canvas.height);
      ctx.stroke();
    }
    for (let r = 0; r < divs + 1; r++) {
      ctx.strokeStyle = "#AA3";
      ctx.beginPath();
      ctx.moveTo(0, grid_size * r, 0);
      ctx.lineTo(canvas.width, grid_size * r);
      ctx.stroke();
    }
  }

  // Matrix definitions
  const operations = { rows: 1, cols: 1, data: [], x: grid_size * 1.0, y: grid_size * (divs / 2) + grid_size * 2, resizing: null };
  const dataMatrix = { rows: 1, cols: 1, data: [], x: grid_size * (divs / 2 + 1), y: grid_size * 2.0, resizing: null };
  let resColor;
  function updateResultMatrix() {
    if (operations.cols != dataMatrix.rows) {
      resColor = "red";
      return;
    }

    // this is our matmul
    for (let r = 0; r < resultMatrix.rows; r++) {
      for (let c = 0; c < resultMatrix.cols; c++) {
        // this is a dot product (element wise multiplication then a sum)
        sumVec(elemWiseMult(transpose(dataMatrix.data)[c], operations.data[r]), resultMatrix.data[r][c]);
      }
    }
  }

  function drawUpstreamSubtotals(res_cell) {
    const y_offset = grid_size * 0.55;
    const x_offset = grid_size / 16;
    const gap_width = grid_size / 8;
    // ctx.fillStyle = "lightblue";
    ctx.font = `${grid_size / 4}px monospace`;
    for (const parent of res_cell.parents) {
      // draw subtotal text
      const subtotal = "$" + parent.val.toFixed(2);
      ctx.fillText(subtotal, parent.x + x_offset, parent.y + grid_size - grid_size / 10);
      const y = parent.y + y_offset;
      const lineY = y - grid_size / 8;

      //draw equals line
      ctx.strokeStyle = "white"
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(parent.x + gap_width, parent.y + 2 * grid_size / 3);
      ctx.lineTo(parent.x + grid_size - gap_width, parent.y + 2 * grid_size / 3);
      ctx.stroke()

      // draw subtotal lines
      // ctx.strokeStyle = hslaToHexa(0 + 360 * Math.random(), 100, 80, 25);
      ctx.strokeStyle = "#FFF5";
      drawLine({ x: parent.x + x_offset + grid_size * 0.5, y: y + grid_size / 2.75 }, { x: res_cell.x + grid_size * 0.6, y: lineY + grid_size / 4 });
    }
  }

  function drawDataFlow(res_cell, dataVec) {
    dataVec.forEach((cell, i) => {
      ctx.fillStyle = "white";
      ctx.font = `${grid_size / 4}px monospace`;
      const x = res_cell.parents[i].x + grid_size * 0.1;
      const y = res_cell.parents[i].y + 2 * grid_size / 3.5;
      // draw data vector with a scalar multiplication sign within the operations matrix
      ctx.fillText(" X" + String(cell.val).padStart(3, " "), x, y);

      // ctx.strokeStyle = hslaToHexa(0 + 360 * Math.random(), 100, 80, 25);
      ctx.strokeStyle = "#FFF5";
      drawLine({ x: x + grid_size * 0.75, y: y - 0.15 * grid_size }, { x: cell.x, y: cell.y + grid_size * 0.15 })
    })
  }

  function drawAllConnections() {
    for (let r = 0; r < resultMatrix.rows; r++) {
      for (let c = 0; c < resultMatrix.cols; c++) {
        const delay = 100;
        const res_cell = resultMatrix.data[r][c];
        setTimeout(() => {
          drawDataFlow(res_cell, transpose(dataMatrix.data)[c]);
        }, (c * 5 + r) * delay);
        setTimeout(() => {
          drawUpstreamSubtotals(res_cell);
        }, (c * 5 + r) * delay + delay * 0.5);
      }
    }
  }
  let resultMatrix;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ctx.font = `${grid_size / 3}px monospace`
    // ctx.fillStyle = "white";
    // ctx.fillText('evanburnette.github.io/matmul_viz', grid_size / 5, grid_size/2)

    // ctx.font = `${grid_size}px monospace`
    // ctx.fillStyle = "orange";
    // ctx.fillText('P', grid_size * 1, grid_size * 5);
    // ctx.fillStyle = "white";
    // ctx.fillText('⋅', grid_size * 2, grid_size * 5);
    // ctx.fillStyle = "#CCF";
    // ctx.fillText('S', grid_size * 3, grid_size * 5);
    // ctx.fillStyle = "white";
    // ctx.fillText('=', grid_size * 4, grid_size * 5);
    // ctx.fillStyle = "aqua";
    // ctx.fillText('R', grid_size * 5, grid_size * 5);

    resultMatrix = { rows: operations.rows, cols: dataMatrix.cols, data: [], x: dataMatrix.x, y: operations.y };
    resColor = 'aqua';

    operations.data = getMatrix(operations.rows, operations.cols, "ops");
    dataMatrix.data = getMatrix(dataMatrix.rows, dataMatrix.cols, "data");
    resultMatrix.data = getZeroMatrix(operations.rows, dataMatrix.cols);

    // drawGrid();
    const operationsMatrixPlural = operations.cols > 1 || operations.rows > 1;
    drawMatrix(operations, "price", "orange", true, operationsMatrixPlural);
    drawRowLabels(operations, stores);
    drawColumnLabels(operations, fruits);

    const shoppingListPlural = dataMatrix.cols > 1 ? true : false;
    drawMatrix(dataMatrix, `shopping list`, "#CCF", false, shoppingListPlural);
    drawRowLabels(dataMatrix, fruits);
    drawColumnLabels(dataMatrix, shoppers);

    updateResultMatrix();

    const resultMatrixPlural = resultMatrix.cols > 1 || resultMatrix.rows > 1;
    drawMatrix(resultMatrix, "total", resColor, true, resultMatrixPlural)
    drawRowLabels(resultMatrix, stores);
    drawColumnLabels(resultMatrix, shoppers);
    registerButtons(resultMatrix);

    registerShoppers({ x: Math.floor((dataMatrix.x + grid_size / 2) / grid_size), y: Math.floor((dataMatrix.y + grid_size / 2) / grid_size) - 1 }, dataMatrix);

    drawBrokenConnections();
    // drawAllConnections();
  }
  draw();

  function drawBrokenConnections(){
    if (operations.cols != dataMatrix.rows) {
      for (let i = 0; i < Math.max(operations.cols, dataMatrix.rows); i++) {
        const broken = i >= Math.min(operations.cols, dataMatrix.rows);
        if (broken) {
          ctx.strokeStyle = "red";
        } else {
          ctx.strokeStyle = "#0F08";
        }
        const start = {x: i * grid_size + operations.x + grid_size / 2, y: operations.y - grid_size / 2 - grid_size/3};
        const end = {x: dataMatrix.x - grid_size / 2 - grid_size / 3, y: dataMatrix.y + i * grid_size + grid_size / 2}
        drawLine(start, end);
        if (broken) {
          if (operations.cols > dataMatrix.rows) {
            ctx.fillText("❌", end.x + grid_size / 12, end.y + grid_size / 5);
          } else {
            ctx.fillText("❌", start.x - grid_size / 4, start.y + grid_size / 2 + grid_size / 40);
          }
        }
      }
    }
  }

  function drawColumnLabels(matrix, labels) {
    const cols = matrix.cols;
    for (let i = 0; i < cols; i++) {
      const label = labels[i];
      let x = matrix.x + grid_size / 5 + i * grid_size;
      let y = matrix.y + grid_size / -3;
      // let x = matrix.x - grid_size * 0.75;
      // let y = matrix.y + grid_size / 1.5 + i * grid_size;
      ctx.fillText(label, x, y);
    }
  }
  function drawRowLabels(matrix, labels) {
    const rows = matrix.rows;
    for (let i = 0; i < rows; i++) {
      const label = labels[i];
      let x = matrix.x - grid_size * 0.75;
      let y = matrix.y + grid_size / 1.5 + i * grid_size;
      ctx.fillText(label, x, y);
    }
  }
  function highlightLowestPrice(cell, col, matrix){
    if (cell.val == 0){
      return;
    }
    const minVal = Math.min(...(transpose(matrix.data)[col].map(cell=>cell.val)));
    if (cell.val === minVal){
      ctx.fillStyle = "#00FF0033";
      ctx.fillRect(cell.x + ctx.lineWidth, cell.y + ctx.lineWidth, grid_size - 2 * ctx.lineWidth, grid_size - 2 * ctx.lineWidth);
      ctx.strokeStyle = "green";
      ctx.lineWidth = 2;
      ctx.strokeRect(cell.x + ctx.lineWidth, cell.y + ctx.lineWidth, grid_size - 2 * ctx.lineWidth, grid_size - 2 * ctx.lineWidth);
    }
  }

  function drawMatrix(matrix, name, color, cost=false, plural=true) {
    ctx.lineWidth = 2;
    if (name == "price") {
      // create row vectors
      for (const r in matrix.data) {

        ctx.strokeStyle = "white";
        ctx.strokeRect(matrix.x, r * grid_size + matrix.y, grid_size * matrix.cols, grid_size);
      }
    } else {
      for (const c in matrix.data[0]) {
        ctx.strokeStyle = "white";
        ctx.strokeRect(matrix.x + grid_size * c, matrix.y, grid_size, grid_size * matrix.rows)
      }
    }

    const prefix = cost ? "$" : "";
    ctx.fillStyle = color;
    ctx.font = cost ? `${grid_size / 4}px monospace` : `${grid_size / 2}px monospace`;
    matrix.data.forEach((row, r) => {
      row.forEach((cell, c) => {
        let stem = cost ? cell.val.toFixed(2) : cell.val;
        cell.x = matrix.x + c * grid_size;
        cell.y = matrix.y + r * grid_size;
        if (name == "shopping list") {
          cell.y += grid_size / 2.5;
          cell.x += grid_size / 4;
          if (dataMatrix.rows === 1 && dataMatrix.cols === 1) {
            name = "quantity"
          }
        } else if (name == "total") {
          highlightLowestPrice(cell, c, matrix);
          cell.y += grid_size * 0.25;
          cell.x -= grid_size * 0.05;
        }
        ctx.fillStyle = color;
        ctx.fillText(prefix + stem, cell.x + grid_size / 10, cell.y + grid_size / 3);
      });
    });

    // draw label text
    ctx.fillStyle = color
    ctx.font = `${grid_size / 2}px monospace`;
    ctx.fillText(name + (plural ? "s" : ''), matrix.x, matrix.y - grid_size * 1.0);

    ctx.fillStyle = 'white';
  }
  function drawLine(start, end) {
    ctx.lineWidth = 2;
    const horizontal = Math.abs(start.y - end.y) <= grid_size;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    const diffx = end.x - start.x;
    const cp1 = (() => {
      const res = {
        x: start.x,
        y: horizontal ? start.y + diffx / 8 : Math.round(mean([start.y, end.y]))
      };
      return res;
    })();
    const cp2 = (() => {
      const res = {
        x: horizontal ? end.x : Math.round(mean([start.x, end.x])),
        y: horizontal ? end.y + diffx / 8 : end.y
      };
      return res;
    })();
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
    ctx.stroke();
  }

  function resetButtons() {
    buttons = {};
  }

  function registerShoppers(grid_start, matrix) {
    for (let i = 0; i < matrix.data[0].length; i++) {
      const key = (i + grid_start.x) + ',' + grid_start.y;
      buttons[key] = shoppers[i];
    }
  }
  function registerButtons(matrix) {
    resetButtons();

    const grid_y = Math.floor((matrix.y + grid_size / 2) / grid_size);
    const grid_x = Math.floor((matrix.x + grid_size / 2) / grid_size);

    registerShoppers({ x: grid_x, y: grid_y - 1 }, matrix);
    for (let r = 0; r < matrix.rows; r++) {
      for (let c = 0; c < matrix.cols; c++) {
        const key = (c + grid_x) + ',' + (r + grid_y);
        buttons[key] = [c, r];
      }
    }
  }
  function calculateGridCoords(e) {
    const canvasRect = canvas.getBoundingClientRect();
    const canvasX = canvasRect.left;
    const canvasY = canvasRect.top;
    const x = e.clientX - canvasX;
    const y = e.clientY - canvasY;
    const gridX = Math.floor(x / grid_size);
    const gridY = Math.floor(y / grid_size);
    return [gridX, gridY];
  }
  document.addEventListener('click', (e) => {
    const [gridX, gridY] = calculateGridCoords(e);
    const key = gridX + ',' + gridY;
    if (key in buttons) {
      if (shoppers_set.has(buttons[key])) {
        // draw dependencies for an entire output column
        draw();
        const c = shoppers.indexOf(buttons[key]);
        for (let r = 0; r < resultMatrix.rows; r++) {
          const res_cell = resultMatrix.data[r][c];
          drawDataFlow(res_cell, transpose(dataMatrix.data)[c]);
          drawUpstreamSubtotals(res_cell);
        }
      } else {
        // draw dependencies for a single output cell
        draw();
        const [c, r] = buttons[key];
        const res_cell = resultMatrix.data[r][c];
        drawDataFlow(res_cell, transpose(dataMatrix.data)[c]);
        drawUpstreamSubtotals(res_cell);
      }
    } else {
      // reset drawing to init
      draw();
    }
  })
  document.addEventListener('mousemove', (e) => {
    const [gridX, gridY] = calculateGridCoords(e);
    const key = gridX + ',' + gridY;
    if (key in buttons) {
      canvas.style.cursor = "pointer";
    }
    else {
      const pos = getMousePos(e);
      if (dataMatrix.resizing === null || operations.resizing === null) {
        canvas.style.cursor = 'default';
      }
      drawHoverCursor(pos, dataMatrix);
      drawHoverCursor(pos, operations);

      if (dataMatrix.resizing == 'ew') {
        dataMatrix.cols = Math.max(1, Math.min(5, Math.round((pos.x - dataMatrix.x)/grid_size)));
        draw();
      } else if (dataMatrix.resizing == 'ns') {
        dataMatrix.rows = Math.max(1, Math.min(5, Math.round((pos.y - dataMatrix.y)/grid_size)));
        draw();
      } else if (dataMatrix.resizing == 'nwse'){
        dataMatrix.cols = Math.max(1, Math.min(5, Math.round((pos.x - dataMatrix.x)/grid_size)));
        dataMatrix.rows = Math.max(1, Math.min(5, Math.round((pos.y - dataMatrix.y)/grid_size)));
        draw();
      }
      if (operations.resizing == 'ew') {
        operations.cols = Math.max(1, Math.min(5, Math.round((pos.x - operations.x)/grid_size)));
        draw();
      } else if (operations.resizing == 'ns') {
        operations.rows = Math.max(1, Math.min(5, Math.round((pos.y - operations.y)/grid_size)));
        draw();
      } else if (operations.resizing == 'nwse'){
        operations.cols = Math.max(1, Math.min(5, Math.round((pos.x - operations.x)/grid_size)));
        operations.rows = Math.max(1, Math.min(5, Math.round((pos.y - operations.y)/grid_size)));
        draw();
      }
    }
  })

  function drawHoverCursor(pos, matrix){
    let edgeX = matrix.x + matrix.cols * grid_size;
    let edgeY = matrix.y + matrix.rows * grid_size;

    let nearEdgeX = Math.abs(pos.x - edgeX) <= grid_size / 5;
    let nearEdgeY = Math.abs(pos.y - edgeY) <= grid_size / 5;

    if (inBounds(matrix, pos)) {
      if (nearEdgeY && nearEdgeX) {
        canvas.style.cursor = 'nwse-resize';
      } else if (nearEdgeY) {
        canvas.style.cursor = 'ns-resize';
      } else if (nearEdgeX) {
        canvas.style.cursor = 'ew-resize';
      }
    }
  }

  document.addEventListener('mousedown', (e)=>{
    const pos = getMousePos(e);
    if (canvas.style.cursor == 'ew-resize') {
      if (inBounds(dataMatrix, pos)) {
        dataMatrix.resizing = 'ew';
      }
    }
    if (canvas.style.cursor == 'ns-resize') {
      if (inBounds(dataMatrix, pos)) {
        dataMatrix.resizing = 'ns';
      }
    }
    if (canvas.style.cursor == 'nwse-resize') {
      if (inBounds(dataMatrix, pos)) {
        dataMatrix.resizing = 'nwse';
      }
    }

    if (canvas.style.cursor == 'ew-resize') {
      if (inBounds(operations, pos)) {
        operations.resizing = 'ew';
      }
    }
    if (canvas.style.cursor == 'ns-resize') {
      if (inBounds(operations, pos)) {
        operations.resizing = 'ns';
      }
    }
    if (canvas.style.cursor == 'nwse-resize') {
      if (inBounds(operations, pos)) {
        operations.resizing = 'nwse';
      }
    }
  })

  document.addEventListener('mouseup', (e)=>{
    dataMatrix.resizing = null;
    operations.resizing = null;
  })

  function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  function inBounds(matrix, pos) {
    const leftBound = matrix.x;
    const topBound = matrix.y;
    const rightBound = matrix.x + grid_size * matrix.cols + grid_size / 5;
    const bottomBound = matrix.y + grid_size * matrix.rows + grid_size / 5;

    if (pos.x < leftBound) return false;
    if (pos.y < topBound) return false;
    if (pos.x > rightBound) return false;
    if (pos.y > bottomBound) return false;

    return true;
  }
}

