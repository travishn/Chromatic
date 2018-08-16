import Particle from './particle';
import * as Util from './util';

const canvas = document.getElementById('canvas-container');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');

window.addEventListener('resize', () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  init();
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

const particleArray = [];
const init = () => {
  for (let i = 0; i < 750; i++) {
    const radius = Math.random() * 7;
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const y = Math.random() * (canvas.height - radius * 2) + radius;
    const dx = (Math.random() - 0.5) * 2;
    const dy = (Math.random() - 0.5) * 2;
    const color = colorArray[Util.randomIntFromRange(0, colorArray.length)];

    particleArray.push(new Particle(x, y, dx, dy, radius, color, ctx));
  }
}

const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
  }
}

init();
animate();
