class BreadCrumb {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.vy = 1;
    this.isFalling = true;
    this.stopHeight = y + 90;
    this.sprite = new Image();
    this.sprite.src = '/assets/img/cumbreadblack.png';
    this.width = 30;
    this.height = 30;
    this.isReady = false;

    this.sprite.onload = () => {
      this.isReady = true;
    };
  }

  draw() {
    if (this.isReady) {
      this.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    }
  }

  move() {
    if (this.isFalling) {
      this.y += this.vy;
      if (this.y >= this.stopHeight) {
        this.y = this.stopHeight;
        this.isFalling = false;
      }
    }
  }
  
}


