class cellNode {
  constructor(val, x, y){
    this.val = val;
    this.x = x;
    this.y = y;
    this.children = [];
    this.parents = [];
  }
}

function testNode(){
  const newNode = new cellNode(5, 50, 100, []);
  return newNode;
}

testNode()

const x_space = 50;
const y_space = 50;

function testMatrix(){
  const matrix = []
  const raw_matrix = [[1,2,3],[4,5,6]];
  raw_matrix.forEach((row, row_idx) => {
    matrix.push([]);
    row.forEach((num, col_idx)=>{
      matrix[row_idx].push(new cellNode(num, col_idx * x_space, row_idx * y_space, matrix))
    })
  })
  return matrix;
}

testMatrix()

function testGraph(){
  const ops_matrix = [];
  const raw_ops = [[1,2,3]];
  raw_ops.forEach((row, row_idx) => {
    ops_matrix.push([]);
    row.forEach((num, col_idx)=>{
      ops_matrix[row_idx].push(new cellNode(num, col_idx * x_space, row_idx * y_space))
    })
  })
  const data_matrix = [];
  const raw_data = 
  [
    [1],
    [2],
    [3]
  ];
  raw_data.forEach((row, row_idx) => {
    data_matrix.push([]);
    row.forEach((num, col_idx)=>{
      data_matrix[row_idx].push(new cellNode(num, col_idx * x_space, row_idx * y_space))
    })
  })
  for (let col_idx = 0; col_idx < data_matrix[0].length; col_idx++) {
    for (let item_idx = 0; item_idx < ops_matrix[0].length; item_idx++){
      ops_matrix[col_idx][item_idx].parents.push(data_matrix[col_idx][item_idx])
    }
  }
  console.log(ops_matrix)
  console.log(ops_matrix[0][0].parents)
}

testGraph()