class Weapon {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;

    this.bullets = [];
  }

  shoot() {
    const newBullet = new Bullet(this.ctx, this.x, this.y);
    this.bullets.push(newBullet);
  }

  draw() {
    this.bullets.forEach((bullet) => {
      bullet.draw();
    });
  }

  move() {
    this.bullets.forEach((bullet) => {
      bullet.move();
    });
  }
}
