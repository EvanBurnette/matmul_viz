import './style.css';
import { matrixViz } from './matrixViz';

document.querySelector('#app').innerHTML = `
  <canvas id="matrixCanvas"></canvas>
`

matrixViz(document.querySelector("canvas"));