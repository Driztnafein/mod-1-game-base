class Pigeon {
  constructor(ctx, x, y) {
    this.ctx = ctx;

    this.y0 = y;

    this.x = x;
    this.y = y;
    this.w = 64;
    this.h = 64;
    this.h0 = this.h;

    this.vx = 0;
    this.vy = 0;
    this.ay = PIGEON_AY;

    this.direction = 1
    this.breadCrumbCount = 0;
    this.weapon = new Weapon(this.ctx, this.x + this.w, this.y + this.h / 2, this.direction, this.breadCrumbCount);

    this.isOnGround = true;
    this.isWalking = false;
    this.isEating = false;
    this.isSpacePressed = false;
    this.shouldStopEating = false;

    this.isFlying = false;

    this.flyingSprite = new Image();
    this.flyingSprite.src = "/assets/img/flySprite.png";
    this.flyingSprite.verticalFrames = 1;
    this.flyingSprite.verticalFrameIndex = 0;
    this.flyingSprite.horizontalFrames = 7;
    this.flyingSprite.horizontalFrameIndex = 0;

    this.flyingSprite.onload = () => {
      this.flyingSprite.isReady = true;
      this.flyingSprite.frameWidth = 32;
      this.flyingSprite.frameHeight = 32;
    };

    this.walkingSprite = new Image();
    this.walkingSprite.src = "/assets/img/walkSprite.png";
    this.walkingSprite.verticalFrames = 1;
    this.walkingSprite.verticalFrameIndex = 0;
    this.walkingSprite.horizontalFrames = 4;
    this.walkingSprite.horizontalFrameIndex = 0;

    this.walkingSprite.onload = () => {
      this.walkingSprite.isReady = true;
      this.walkingSprite.frameWidth = 32;
      this.walkingSprite.frameHeight = 32;
    };

    this.eatingSprite = new Image();
    this.eatingSprite.src = "/assets/img/eatSprite.png";

    this.eatingSprite.verticalFrameIndex = 0;
    this.eatingSprite.horizontalFrames = 4;
    this.eatingSprite.horizontalFrameIndex = 0;

    this.eatingSprite.onload = () => {
      this.eatingSprite.isReady = true;
      console.log('Eating sprite loaded:', this.eatingSprite.isReady)

      this.eatingSprite.frameWidth = 32;
      this.eatingSprite.frameHeight = 32;
    };

    this.isEating = false;

    this.animationTick = 0;
  }

  onKeyDown(event) {
    switch (event.keyCode) {
      case KEY_UP:
        this.isFlying = true;
        this.vy = -PIGEON_SPEED;
        break;
      case KEY_LEFT:
        this.vx = -PIGEON_SPEED;
        this.direction = -1;
        this.weapon.direction = this.direction;
        this.isWalking = true;
        break;
      case KEY_RIGHT:
        this.vx = PIGEON_SPEED;
        this.direction = 1;
        this.weapon.direction = this.direction
        this.isWalking = true;
        break;
      case KEY_WHITE_POO:
        this.weapon.shootWhite();
        this.breadCrumbCount = this.weapon.breadCrumbCount;
      case KEY_BLACK_POO:
        this.weapon.shootBlack();
        this.breadCrumbCount = this.weapon.breadCrumbCount;
        break;
      case KEY_SPACE:

        if (!this.isFlying && (!this.isEating || this.shouldStopEating)) {
          this.isEating = true;
          this.isSpacePressed = true;
          this.shouldStopEating = false;
        }
        break;
    }
  }

  onKeyUp(event) {
    switch (event.keyCode) {
      case KEY_UP:
        this.isFlying = false;
        this.vy = 0;
        break;
      case KEY_LEFT:
      case KEY_RIGHT:
        this.vx = 0;
        this.isWalking = false;
        break;
      case KEY_SPACE:
        console.log('Space key released');
        if (this.isEating) {
          this.isSpacePressed = false;
        }
        this.shouldStopEating = true;
        break;
    }
  }

  move() {
    if (!this.isFlying) {
      this.vy += this.ay;
    }

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

    if (!this.isFlying && this.y > this.y0) {
      this.y = this.y0;
      this.vy = 0;
      this.isOnGround = true;
    } else {
      this.isOnGround = false;
    }
  }

  draw() {
    if (!this.isFlying && this.isEating && this.isSpacePressed && this.eatingSprite.isReady) {
      this.ctx.drawImage(
        this.eatingSprite,
        this.eatingSprite.horizontalFrameIndex * this.eatingSprite.frameWidth,
        0,
        this.eatingSprite.frameWidth,
        this.eatingSprite.frameHeight,
        this.x,
        this.y,
        this.w,
        this.h
      );
      this.animateEating();
    }
    else if (this.isWalking && this.isOnGround && this.walkingSprite.isReady) {
      this.ctx.save();
      if (this.direction < 0) {
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(
          this.walkingSprite,
          this.walkingSprite.horizontalFrameIndex * this.walkingSprite.frameWidth,
          this.walkingSprite.verticalFrameIndex * this.walkingSprite.frameHeight,
          this.walkingSprite.frameWidth,
          this.walkingSprite.frameHeight,
          -this.x - this.w,
          this.y,
          this.w,
          this.h
        );
      } else {
        this.ctx.drawImage(
          this.walkingSprite,
          this.walkingSprite.horizontalFrameIndex * this.walkingSprite.frameWidth,
          this.walkingSprite.verticalFrameIndex * this.walkingSprite.frameHeight,
          this.walkingSprite.frameWidth,
          this.walkingSprite.frameHeight,
          this.x,
          this.y,
          this.w,
          this.h
        );
      }
      this.ctx.restore();
      this.animateWalking();
    }
    else if (this.flyingSprite.isReady) {
      this.ctx.save();
      if (this.direction < 0) {
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(
          this.flyingSprite,
          this.flyingSprite.horizontalFrameIndex * this.flyingSprite.frameWidth,
          this.flyingSprite.verticalFrameIndex * this.flyingSprite.frameHeight,
          this.flyingSprite.frameWidth,
          this.flyingSprite.frameHeight,
          -this.x - this.w,
          this.y,
          this.w,
          this.h
        );
      } else {
        this.ctx.drawImage(
          this.flyingSprite,
          this.flyingSprite.horizontalFrameIndex * this.flyingSprite.frameWidth,
          this.flyingSprite.verticalFrameIndex * this.flyingSprite.frameHeight,
          this.flyingSprite.frameWidth,
          this.flyingSprite.frameHeight,
          this.x,
          this.y,
          this.w,
          this.h
        );
      }
      this.ctx.restore();
      this.animate();
    }

    this.weapon.draw();
  }

  animate() {

    if (this.vx !== 0 || this.vy !== 0) {
      this.animationTick++;

      if (this.animationTick > PIGEON_RAN_ANIMATION_TICK) {
        this.animationTick = 0;
        this.flyingSprite.horizontalFrameIndex++;

        if (this.flyingSprite.horizontalFrameIndex > this.flyingSprite.horizontalFrames - 1) {
          this.flyingSprite.horizontalFrameIndex = 0;
        }
      }
    }
  }

  animateWalking() {
    if (this.vx !== 0) {
      this.animationTick++;
      if (this.animationTick > PIGEON_RAN_ANIMATION_TICK) {
        this.animationTick = 0;
        this.walkingSprite.horizontalFrameIndex++;
        if (this.walkingSprite.horizontalFrameIndex > this.walkingSprite.horizontalFrames - 1) {
          this.walkingSprite.horizontalFrameIndex = 0;
        }
      }
    }
  }

  animateEating() {
    this.animationTick++;

    if (this.animationTick > PIGEON_EAT_ANIMATION_TICK) {
      this.animationTick = 0;
      this.eatingSprite.horizontalFrameIndex++;

      if (this.eatingSprite.horizontalFrameIndex >= this.eatingSprite.horizontalFrames) {
        this.eatingSprite.horizontalFrameIndex = 0;

        if (this.shouldStopEating) {
          this.isEating = false;
          this.shouldStopEating = false;
        }
      }
    }
  }
}
