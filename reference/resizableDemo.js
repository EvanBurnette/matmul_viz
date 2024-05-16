const canvas = document.querySelector("canvas");
resizable(canvas);

function resizable(canvas) {
  const ctx = canvas.getContext('2d');
  const squareDim = Math.min(window.innerWidth, window.innerHeight) - 20;
  canvas.height = squareDim;
  canvas.width = window.innerWidth;
  const grid_size = Math.round(squareDim / 10);

  let rect = { x: grid_size, y: grid_size, width: grid_size * 3, height: grid_size * 2 };
  let dragging = false;
  let resizing = false;
  let dragStart = {};
  let dragOffset = {};
  
  function drawRectangle() {
    ctx.fillStyle = '#0095DD';
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    ctx.strokeStyle = '#000';
    ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
  }

  function handleMouseDown(e) {
    const pos = getMousePos(e);
    dragStart = pos;
		
    let edgeX = rect.x + rect.width;
    let edgeY = rect.y + rect.height;
    
    let nearEdgeX = Math.abs(pos.x - edgeX) <= grid_size;
    let nearEdgeY = Math.abs(pos.y - edgeY) <= grid_size;
    
    // Determine if the click is on the edge for resizing
    if (nearEdgeY || nearEdgeX) {
      resizing = true;
      canvas.style.cursor = 'nwse-resize';
    }
  }

  function handleMouseMove(e) {
    const pos = getMousePos(e);
    canvas.style.cursor = 'default';
    
    let edgeX = rect.x + rect.width;
    let edgeY = rect.y + rect.height;
    
    let nearEdgeX = Math.abs(pos.x - edgeX) <= grid_size;
    let nearEdgeY = Math.abs(pos.y - edgeY) <= grid_size;
    if (dragging) {
      rect.x = pos.x - dragOffset.x;
      rect.y = pos.y - dragOffset.y;
      drawScreen();
    } else if (resizing) {
      rect.width = (Math.floor(pos.x/grid_size) * grid_size - rect.x);
      rect.height = (Math.floor(pos.y/grid_size) * grid_size - rect.y);
      drawScreen();
    } else if (nearEdgeY && nearEdgeX){
      canvas.style.cursor = 'nwse-resize';
    } else if (nearEdgeY) {
    	canvas.style.cursor = 'ns-resize';
    } else if (nearEdgeX) {
    	canvas.style.cursor = 'ew-resize';
    }
  }

  function handleMouseUp(e) {
    dragging = false;
    resizing = false;
    canvas.style.cursor = 'default';
  }

  function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  function drawScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRectangle();
  }
  
  function handleHover(e) {
  	console.log(e.clientX, e.clientY)
  }

  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseup', handleMouseUp);

  drawScreen();
}
