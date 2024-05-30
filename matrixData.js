export const shoppers = "🧘 🤖 👮 👷 🐒".split(' ');
export const fruits = "🍌 🍏 🍉 🍍 🫐".split(' ');
export const stores = "🛒 🌺 🌱 🎯 🐖".split(' ');
// Data
const groceryOrders = {
  //  🧘 🤖 👮 👷 👨🏻‍💻
  Anna: [2, 1, 3, 4, 5],
  Bob: [5, 4, 3, 2, 1],
  Charlie: [1, 1, 1, 1, 1],
  Dave: [1, 2, 1, 2, 1],
  Evan: [9, 0, 0, 0, 0]
}

// Operations
const groceryPrices = {
  // prices are for 🍌 🍏 🍉 🍍 🫐
  Kroger: [0.27, 0.80, 4.99, 2.99, 6.99],
  Trader_Joes: [0.23, 1.29, 5.99, 2.99, 5.99],
  Sprouts: [0.25, 0.84, 6.99, 2.89, 2.99],
  Target: [0.29, 0.57, 6.50, 3.50, 4.49],
  Piggly_Wiggly: [0.31, 0.66, 5.99, 3.49, 9.00]
}

export function getMatrix(rows = 5, cols = 5, type = "data") {
  let matrix = []
  if (type != 'data') {
    matrix = Object.values(groceryPrices).map(row => {
      return row.map(val => new Node(val));
    })
  } else {
    matrix = transpose(Object.values(groceryOrders).map(row => {
      return row.map(val => new Node(val));
    }))
  }
    return trimMatrix(matrix, rows, cols)
  }
  function test() {
    console.log(getMatrix(2, 3, "data"))
    console.log(getMatrix(2, 3, "ops"))
    console.log(getMatrix(5, 5, "data"))
    console.log(getMatrix(5, 5, "ops"))
  }

  export function transpose(matrix) {
    let rows = matrix.length;
    let cols = matrix[0].length;
    let newMatrix = [];

    for (let j = 0; j < cols; j++) {
      let newRow = [];
      for (let i = 0; i < rows; i++) {
        newRow.push(matrix[i][j]);
      }
      newMatrix.push(newRow);
    }

    return newMatrix;
  }

  function trimMatrix(matrix, maxRows, maxCols) {
    let trimmedMatrix = [];

    for (let i = 0; i < Math.min(maxRows, matrix.length); i++) {
      trimmedMatrix.push(matrix[i].slice(0, maxCols))
    }

    return trimmedMatrix;
  }

  export class Node {
    constructor(val) {
      this.val = val;
      this.parents = [];
      this.x = null;
      this.y = null;
    }

    setVal(val){
      this.val = val;
    }

    setPos(x, y) {
      this.x = x;
      this.y = y;
    }

    addParent(newParent) {
      this.parents.push(newParent);
    }

    clearParents() {
      this.parents = [];
    }
    setParents(parents) {
      this.parents = parents
    }
  }

  function test_dotProd(){
    const vec1 = [new Node(1), new Node(2), new Node(3)];
    const vec2 = [new Node(1), new Node(2), new Node(3)];
    // should be 1 * 1 + 2 * 2 + 3 * 3 == 14
    // console.log(dotprod(vec1, vec2))
  }
  // test_dotProd()

  export function sumVec(vec, res_node) {
    let sum = vec.reduce((prev, curr) => {
      return prev + curr.val
    }, 0);
    res_node.setVal(sum);
    res_node.setParents(vec);
    return
  }

  function test_sumVec() {
    const test_node = new Node(0);
    const vec = [new Node(1), new Node(2), new Node(3)];
    sumVec(vec, test_node);
    console.log(test_node);
  }

  export function elemWiseMult(vec1, vec2){
    // console.log(vec1)
    const res_vec = [];
    for (let i = 0; i < vec1.length; i++){
      res_vec.push(new Node(vec1[i].val * vec2[i].val));
      res_vec[i].parents.push(vec1[i], vec2[i]);
      res_vec[i].setPos(vec2[i].x, vec2[i].y);
    }
    // console.log(res_vec)
    return res_vec;
  }

  export function getZeroMatrix(rows, cols){
    const res = [];
    for (let r = 0; r < rows; r++){
      res.push([]);
      for (let c = 0; c < cols; c++){
        res[r].push(0);
      }
      res[r] = res[r].map(val=>new Node(val))
    }
    return res;
  }

  function test_getZeroMatrix(){
    console.log(getZeroMatrix(2, 3))
  }

  function calculateTotals(orders, prices) {
    const totals = {};
  
    // Iterate through each shopper
    for (const [shopper, order] of Object.entries(orders)) {
      totals[shopper] = {}; // Initialize a nested object for each shopper
  
      // Iterate through each store
      for (const [store, priceList] of Object.entries(prices)) {
        // Calculate the total cost for the current shopper at the current store
        totals[shopper][store] = order.reduce((total, qty, index) => {
          return total + qty * priceList[index];
        }, 0);
      }
    }
  
    return totals;
  }
  
  // Example usage with the provided data
  const totalCosts = calculateTotals(groceryOrders, groceryPrices);
  // console.log(totalCosts);
  