import './style.css';
import { matmulViz } from './matmulViz';

document.querySelector('#app').innerHTML = `
  <canvas id="matrixCanvas"></canvas>
`

matmulViz(document.querySelector("canvas"));