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
  constructor(x, y, dx, dy, radius, ctx) {
    this.x = this.oldX = x;
    this.y = this.oldY = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
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

    // if ((this.x + this.radius > circle.x) || (this.x - this.radius < circle.x)) {
    //   this.dx = -this.dx;
    // }

    // if ((this.y + this.radius > circle.y) || (this.y - this.radius < circle.y)) {
    //   this.dy = -this.dy;
    // }

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
    // this.attract(mouse);
    // this.integrate();
    this.draw();
  }

  integrate() {
    const velocityX = (this.x - this.oldX) * 0.95;
    const velocityY = (this.y - this.oldY) * 0.95;
    this.oldX = this.x;
    this.oldY = this.y;
    this.x += velocityX;
    this.y += velocityY;
  }

  attract(target) {
    const distance = Util.calculateDistance(target, this);
    const dx = target.x - this.x;
    const dy = target.y - this.y;

    if (distance > 20) {
      this.x += dx / distance;
      this.y += dy / distance;
    } else {
      this.x -= dx * 1.2;
      this.y -= dy * 1.2;
    }
  }
}

export default Particle;