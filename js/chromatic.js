import Particle from './particle';
import * as Util from './util';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('#canvas-container');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const colorArray = [
  "#FF0000",
  "#FFFF00",
  "#00FF00",
  "#008000",
  "#00FFFF",
  "#008080",
  "#0000FF",
  "#000080",
  "#FF00FF",
  "#800080"
];

const init = () => {
  const particleArray = [];
  for (let i = 0; i < 500; i++) {
    const radius = Math.random() * 7;
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const y = Math.random() * (canvas.height - radius * 2) + radius;
    const dx = (Math.random() - 0.5) * 2;
    const dy = (Math.random() - 0.5) * 2;
    const color = Util.randomIntFromRange(0, colorArray.length);

    particleArray.push(new Particle(x, y, dx, dy, radius, color));
  }
}

init();
