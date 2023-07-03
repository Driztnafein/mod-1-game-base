class Poo {
  constructor(ctx, x, y, direction) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.vx = direction * -5;
    this.vy = 5;
    this.ax = 0;
    this.ay = 0.03;
    this.sprite = new Image();
    this.width = 40; // define the width
    this.height = 40; // define the height
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
}


class BlackPoo extends Poo {
  constructor(ctx, x, y, direction) {
    super(ctx, x, y, direction);
    this.sprite.src = '/assets/img/pooWhite.png';
  }
}

class WhitePoo extends Poo {
  constructor(ctx, x, y, direction) {
    super(ctx, x, y, direction);
    this.sprite.src = '/assets/img/pooBlack.png';
  }
}
