import * as Util from './util';

const mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
}

window.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

let effects = {bubble: false, repulse: false}

let animationNum = 0;
let animations = {
  1: 'attract',
  2: 'drag',
  3: 'detract',
}

window.addEventListener('click', (e) => {
  if (e.target.type === 'checkbox') {
    effects[e.target.id] = e.target.checked;
  }
});

const canvas = document.getElementById('canvas-container');
canvas.addEventListener("mouseup", (e) => {
  e.preventDefault();
  if (animationNum === 3) {
    animationNum = 1;
  } else {
    animationNum += 1;
  }
})

class Particle {
  constructor(x, y, dx, dy, radius, ctx) {
    this.x = this.oldX = x;
    this.y = this.oldY = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.ctx = ctx;
    this.hue = Util.randomIntFromRange(1, 50);

    // particles distance from the center of window view
    this.distanceFromCenter = {
      x: Util.randomIntFromRange(80, 260),
      y: Util.randomIntFromRange(80, 260)
    }

    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.03;
    this.lastMouse = {
      x: x,
      y: y
    };
  }

  draw() {
    this.hue = (this.hue + 1) % 360;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = `hsla(${this.hue}, 100%, 50%, 0.8)`;
    this.ctx.fill();
  }

  drawConnectors(particle) {
    this.ctx.strokeStyle = `hsla(${this.hue}, 80%, 50%, 0.4)`;
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(particle.x, particle.y);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  update(circle) {
    if ((this.x + this.radius > innerWidth) || (this.x - this.radius < 0)) {
      this.dx = -this.dx;
    }
    
    if ((this.y + this.radius > innerHeight) || (this.y - this.radius < 0)) {
      this.dy = -this.dy;
    }

    const xDist = this.x - circle.x;
    const yDist = this.y - circle.y;
    const radiiSum = this.minRadius + circle.radius;
    
    if (xDist * xDist + yDist * yDist === radiiSum * radiiSum) {
      this.dx = -this.dx;
      this.dy = -this.dy;
    }

    if (animations[animationNum] === 'attract') {
      this.attract(mouse);
      this.integrate();
    } else if (animations[animationNum] === 'drag') {
      this.drag();
    } else if (animations[animationNum] === 'detract') {
      this.detract(mouse);
      this.integrate();
    }

    if (Util.calculateDistance(mouse, this) < 80 && effects['bubble'] === true) {
      if (this.radius < 25) {
        this.radius += 1.5;
      }
    } else {
      if (this.radius > this.minRadius) {
        this.radius -= 0.5;
      }
    }

    if (Util.calculateDistance(mouse, this) < 80 && effects['repulse'] === true) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const angle = Math.atan2(dy, dx);
      const xRepulsion = Math.cos(angle);
      const yRepulsion = Math.sin(angle);
      const radiusDistance = 80 - Util.calculateDistance(mouse, this);
      this.x += xRepulsion * radiusDistance;
      this.y += yRepulsion * radiusDistance;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }

  integrate() {
    const velocityX = (this.x - this.oldX);
    const velocityY = (this.y - this.oldY);
    this.oldX = this.x;
    this.oldY = this.y;
    this.x += velocityX/3;
    this.y += velocityY/3;
  }

  attract(target) {
    const distance = Util.calculateDistance(target, this);
    const dx = target.x - this.x;
    const dy = target.y - this.y;

    if (distance > 30) {
      this.x += 3 * dx / distance;
      this.y += 3 * dy / distance;
    } else {
      this.x -= dx * 0.75;
      this.y -= dy * 0.75;
    }
  }

  detract(target) {
    const distance = Util.calculateDistance(target, this);
    const dx = target.x - this.x;
    const dy = target.y - this.y;

    this.x -= (3 * dx / distance);
    this.y -= (3 * dy / distance);
  }

  drag() {
    this.radians += this.velocity;

    // creates center point for donut shape
    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

    // creates circular shape donut
    this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter.x;
    this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter.y;
  }
}

export default Particle;