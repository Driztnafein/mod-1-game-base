class Poo {
  constructor(ctx, x, y, direction, color) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.vx = direction * -5;
    this.vy = 5;
    this.ax = 0;
    this.ay = 0.03;
    this.sprite = new Image();
    this.width = 40;
    this.height = 40;
    this.color = color; // Nueva propiedad para el color de la poo
  }

  draw() {
    this.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
  }

  move() {
    this.vx += this.ax;
    this.x += this.vx;
    this.vy += this.ay;
    this.y += this.vy;
  }

  checkCollision(car) {
    const colLeft = this.x < car.x + car.w;
    const colRight = this.x + this.width > car.x;
    const colTop = this.y < car.y + car.h;
    const colBottom = this.y + this.height > car.y;
  
    if (this.color === "white" && car.color === "black") {
      return colLeft && colRight && colTop && colBottom;
    }
  
    if (this.color === "black" && car.color === "white") {
      return colLeft && colRight && colTop && colBottom;
    }
  
    return false;
  }
}

class BlackPoo extends Poo {
  constructor(ctx, x, y, direction) {
    super(ctx, x, y, direction, "black");
    this.sprite.src = "/assets/img/pooBlack.png";
  }
}

class WhitePoo extends Poo {
  constructor(ctx, x, y, direction) {
    super(ctx, x, y, direction, "white");
    this.sprite.src = "/assets/img/pooWhite.png";
  }
}
