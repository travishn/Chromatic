import Particle from './particle';
import Circle from './circle';
import * as Util from './util';

const canvas = document.getElementById('canvas-container');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
const circleContainer = new Circle(window.innerWidth / 2, window.innerHeight / 2, ctx);

window.addEventListener('resize', () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  init(particleNum);
});

let drawLinesEffect = false;
window.addEventListener('click', (e) => {
  if (e.target.id === 'edges') {
    drawLinesEffect = e.target.checked;
  }
});

let particleArray;
let particleNum = 300;
let particlesInput = document.getElementById('particle-input');
particlesInput.addEventListener('change', () => {
  particleNum = particlesInput.value;
  init(particleNum);
});

const init = (num) => {
  particleArray = [];
  for (let i = 0; i < num; i++) {
    const radius = Math.random() * 3 + 3;
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const y = Math.random() * (canvas.height - radius * 2) + radius;
    const dx = (Math.random() - 0.5);
    const dy = (Math.random() - 0.5);

    particleArray.push(new Particle(x, y, dx, dy, radius, ctx));
  }
}

const drawLines = (particleA) => {
  for (let j = 0; j < particleArray.length; j++) {
    const particleB = particleArray[j];
    const distance = Util.calculateDistance(particleA, particleB);
    if (distance < 110) {
      particleA.drawConnectors(particleB);
    }
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
    particleArray[i].update(circleContainer);
    if (drawLinesEffect === true) {
      drawLines(particleArray[i]);
    }
  }
}

init(particleNum);
animate();