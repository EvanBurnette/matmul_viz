import viteLogo from '/vite.svg'
import './style.css'
import { matrixViz } from './matrixViz'

document.querySelector('#app').innerHTML = `
  <canvas id="matrixCanvas"></canvas>
  <h1>HELLO2</h1>
`

matrixViz(document.querySelector("canvas"))

// setupCounter(document.querySelector('#counter'))
