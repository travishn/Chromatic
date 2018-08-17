import Particle from './particle';
import * as Util from './util';

const canvas = document.getElementById('canvas-container');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

window.addEventListener('resize', () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  init((canvas.height + canvas.width) / 2.5);
});

let particleArray;
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

const init = (num) => {
  particleArray = [];
  for (let i = 0; i < num; i++) {
    const radius = Math.random() * 3 + 3;
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const y = Math.random() * (canvas.height - radius * 2) + radius;
    const dx = (Math.random() - 0.7);
    const dy = (Math.random() - 0.7);
    const color = colorArray[Util.randomIntFromRange(0, colorArray.length)];

    particleArray.push(new Particle(x, y, dx, dy, radius, color, ctx));
  }
}

const animate = () => {
  requestAnimationFrame(animate);
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grd.addColorStop(0, "#010407");
  grd.addColorStop(0.25, "#061119");
  grd.addColorStop(0.75, "#061119");
  grd.addColorStop(1, "#010407");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
  }
}

init(1000);
animate();