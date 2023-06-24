class Mario {
  constructor(ctx, x, y) {
    this.ctx = ctx;

    this.y0 = y;

    this.x = x;
    this.y = y;
    this.w = Math.floor(120 / 2);
    this.h = Math.floor(161 / 2);
    this.h0 = this.h;

    this.vx = 0;
    this.vy = 0;
    this.ay = MARIO_AY;

    this.weapon = new Weapon(this.ctx, this.x + this.w, this.y + this.h / 2);

    this.jumpSound = new Audio("/assets/audio/jump.mp3");

    this.sprite = new Image();
    this.sprite.src = "/assets/img/mario-sprite.png";
    this.sprite.verticalFrames = 1;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.horizontalFrames = 3;
    this.sprite.horizontalFrameIndex = 0;

    this.sprite.onload = () => {
      this.sprite.isReady = true;
      this.sprite.frameWidth = Math.floor(
        this.sprite.width / this.sprite.horizontalFrames
      );
      this.sprite.frameHeight = Math.floor(
        this.sprite.height / this.sprite.verticalFrames
      );
    };

    this.animationTick = 0;
  }

  onKeyDown(event) {
    switch (event.keyCode) {
      case KEY_SPACE:
        this.weapon.shoot();
        break;
      case KEY_UP:
        this.jump();
        break;
      case KEY_DOWN:
        this.h = this.h0 / 2;
        break;
      case KEY_LEFT:
        this.vx = -MARIO_SPEED;
        break;
      case KEY_RIGHT:
        this.vx = MARIO_SPEED;
        break;
    }
  }

  onKeyUp(event) {
    switch (event.keyCode) {
      case KEY_DOWN:
        this.h = this.h0;
      case KEY_LEFT:
      case KEY_RIGHT:
        this.vx = 0;
        break;
    }
  }

  jump() {
    if (!this.isJumping()) {
      this.vy = -MARIO_JUMP;
      this.jumpSound.play();
    }
  }

  isJumping() {
    return this.y < this.y0;
  }

  move() {
    this.vy += this.ay;
    this.x += this.vx;
    this.y += this.vy;

    this.weapon.x = this.x + this.w;
    this.weapon.y = this.y + this.h / 2;
    this.weapon.move();

    if (this.x < 0) {
      this.x = 0;
    } else if (this.x + this.w > this.ctx.canvas.width) {
      this.x = this.ctx.canvas.width - this.w;
    }

    if (this.y > this.y0) {
      this.y = this.y0;
      this.vy = 0;
    }
  }

  draw() {
    if (this.sprite.isReady) {
      this.ctx.drawImage(
        this.sprite,
        this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
        this.sprite.verticalFrameIndex * this.sprite.frameHeight,
        this.sprite.frameWidth,
        this.sprite.frameHeight,
        this.x,
        this.y,
        this.w,
        this.h
      );

      this.animate();
    }

    this.weapon.draw();
  }

  animate() {
    this.animationTick++;

    if (this.isJumping()) {
      this.sprite.horizontalFrameIndex = 1;
    } else if (this.animationTick > MARION_RAN_ANIMATION_TICK) {
      this.animationTick = 0;
      this.sprite.horizontalFrameIndex++;

      if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
        this.sprite.horizontalFrameIndex = 0;
      }
    }
  }
}
