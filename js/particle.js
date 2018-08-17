import * as Util from './util';

const mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
}

window.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

class Particle {
  constructor(x, y, dx, dy, radius, color, ctx) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = color;
    this.ctx = ctx;
    this.hue = Util.randomIntFromRange(1, 50);
  }

  draw() {
    this.hue = (this.hue + 1) % 360;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = `hsla(${this.hue}, 100%, 50%, 0.8)`;
    this.ctx.fill();
  }

  update() {
    if ((this.x + this.radius > innerWidth) || (this.x - this.radius < 0)) {
      this.dx = -this.dx;
    }
    
    if ((this.y + this.radius > innerHeight) || (this.y - this.radius < 0)) {
      this.dy = -this.dy;
    }

    // Bubble effect
    if (Util.calculateDistance(mouse, this) < 80) {
      if (this.radius < 25) {
        this.radius += 1.5;
      }
    } else {
      if (this.radius > this.minRadius) {
        this.radius -= 0.5;
      }
    }

    //Repulsion effect
    // if (Util.calculateDistance(mouse, this) < 80) {
    //   const dx = this.x - mouse.x;
    //   const dy = this.y - mouse.y;
    //   const angle = Math.atan2(dy, dx);
    //   const xRepulsion = Math.cos(angle);
    //   const yRepulsion = Math.sin(angle);
    //   const radiusDistance = 80 - Util.calculateDistance(mouse, this);
    //   this.x += xRepulsion * radiusDistance;
    //   this.y += yRepulsion * radiusDistance;
    // }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

export default Particle;