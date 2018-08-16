class Particle {
  constructor(x, y, dx, dy, radius, color, ctx) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  update() {
    if ((this.x + this.radius > innerWidth) || (this.x - this.radius < 0)) {
      this.dx = -this.dx;
    }
    
    if ((this.y + this.radius > innerHeight) || (this.y - this.radius < 0)) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

export default Particle;