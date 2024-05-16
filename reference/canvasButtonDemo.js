const canvas = document.querySelector('canvas')

function setupEmojiGrid(canvas) {
  const ctx = canvas.getContext('2d');
  const gridSize = 3; // 3x3 grid
  const emojiList = ["😀", "😂", "🤣", "😜", "😎", "😍", "🥳", "😱", "👻"];
  const cellSize = Math.min(canvas.width, canvas.height) / gridSize;
  const grid = [];

  // Initialize grid and emojis
  function initGrid() {
    let index = 0;
    for (let row = 0; row < gridSize; row++) {
      grid[row] = [];
      for (let col = 0; col < gridSize; col++) {
        grid[row][col] = {
          emoji: emojiList[index],
          x: col * cellSize,
          y: row * cellSize,
          selected: false
        };
        index++;
      }
    }
  }
	
  const buttonLocations = new Set();
  // Draw the grid and emojis
  function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    grid.forEach(row => {
      row.forEach(cell => {
        if (cell.selected) {
          ctx.fillStyle = '#CCC'; // yellow background for selected emojis
          ctx.fillRect(cell.x, cell.y, cellSize, cellSize);
        }
        ctx.fillText(cell.emoji, cell.x + cellSize / 4, cell.y + cellSize * 0.75);
      });
    });
  }

  function handleMouseDown(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (x > cell.x && x < cell.x + cellSize && y > cell.y && y < cell.y + cellSize) {
        cell.selected = true;
        setTimeout(()=>{
          cell.selected = false;
          drawGrid();
        }, 200)
        }
        });
      });
    }


  // Handle click events
  function handleCanvasClick(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (x > cell.x && x < cell.x + cellSize && y > cell.y && y < cell.y + cellSize) {
          console.log(`Emoji: ${cell.emoji}, Coordinates: (${rowIndex}, ${colIndex})`);
          drawGrid();
        }
      });
    });
  }
	function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }
  function handleMouseMove(e){
  	const pos = getMousePos(e);
  }
  // Event listener for clicks
  canvas.addEventListener('click', handleCanvasClick);
	canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mousemove', handleMouseMove);
  
  // Set font size for emojis
  ctx.font = `${cellSize / 2}px Arial`;

  initGrid();
  drawGrid();
}

canvas.width = 300; // Set width of canvas
canvas.height = 300; // Set height of canvas
setupEmojiGrid(canvas);
