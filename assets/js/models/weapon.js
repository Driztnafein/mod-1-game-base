class Weapon {
  constructor(ctx, x, y, direction) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.direction = direction;

    this.poos = [];
  }

  shootBlack() {
    const newPoo = new BlackPoo(this.ctx, this.x, this.y, this.direction);
    this.poos.push(newPoo);
  }

  shootWhite() {
    const newPoo = new WhitePoo(this.ctx, this.x, this.y, this.direction);
    this.poos.push(newPoo);
  }

  draw() {
    this.poos.forEach((poo) => {
      poo.draw();
    });
  }

  move() {
    this.poos.forEach((poo) => {
      poo.move();
    });
  }
}
