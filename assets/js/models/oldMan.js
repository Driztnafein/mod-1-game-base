class OldMan {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 300;
    this.y = this.ctx.canvas.height - 270;
    this.w = 100;
    this.h = 90;
    this.vx = 1.5;

    this.breadCrumb = null;

    this.direction = 1;
    this.isWalking = true;

    this.walkSprite = new Image();
    this.walkSprite.src = "/assets/img/oldManWalkSprite.png";
    this.walkSprite.isReady = false;
    this.walkSprite.frameWidth = 50;
    this.walkSprite.frameHeight = 45;
    this.walkSprite.horizontalFrames = 4;
    this.walkSprite.horizontalFrameIndex = 0;
    this.walkAnimationTick = 0;

    this.walkSprite.onload = () => {
      this.walkSprite.isReady = true;
    };

    this.throwingSprite = new Image();
    this.throwingSprite.src = "/assets/img/oldManThrowSprite.png";
    this.throwingSprite.isReady = false;
    this.throwingSprite.frameWidth = 50;
    this.throwingSprite.frameHeight = 45;
    this.throwingSprite.horizontalFrames = 4;
    this.throwingSprite.horizontalFrameIndex = 0;
    this.throwAnimationTick = 0;

    this.throwingSprite.onload = () => {
      this.throwingSprite.isReady = true;
    };

    this.isThrowing = false;
  }

  throwBreadCrumb() {
    if (!this.isThrowing && !this.breadCrumb) {
      this.breadCrumb = new BreadCrumb(this.ctx, this.x + this.w, this.y + this.h);
      console.log('Miga de pan lanzada:', this.breadCrumb);
      game.breadCrumbs.push(this.breadCrumb); // Agregar la migaja de pan al array en la clase Game
    }
  }
  

  move() {
    if (this.isWalking && !this.isThrowing) {
      this.x += this.vx * this.direction;

      if (this.x + this.w < 0 || this.x > this.ctx.canvas.width - this.w) {
        this.direction *= -1;
      }

      if (Math.random() < THROWING_PROBABILITY) {
        this.isThrowing = true;
        this.isWalking = false;
      }

      if (Math.random() < DIRECTION_CHANGE_PROBABILITY) {
        this.direction *= -1;
      }
    }
  }

  animate() {
    this.walkAnimationTick++;

    if (this.walkAnimationTick > 10) {
      this.walkAnimationTick = 0;
      this.walkSprite.horizontalFrameIndex++;

      if (this.walkSprite.horizontalFrameIndex >= this.walkSprite.horizontalFrames) {
        this.walkSprite.horizontalFrameIndex = 0;
      }
    }
  }

  animateThrowing() {
    this.throwAnimationTick++;

    if (this.throwAnimationTick > 10) {
      this.throwAnimationTick = 0;
      this.throwingSprite.horizontalFrameIndex++;

      if (this.throwingSprite.horizontalFrameIndex >= this.throwingSprite.horizontalFrames) {
        this.throwingSprite.horizontalFrameIndex = 0;
        this.isThrowing = false;
        this.isWalking = true;
        if (!this.breadCrumb) {
          this.throwBreadCrumb();
        }
      }
    }
  }

  draw() {
    this.ctx.save();
    let currentSprite;
 
    if (this.isThrowing) {
      currentSprite = this.throwingSprite;
      this.animateThrowing();
    } else {
      currentSprite = this.walkSprite;
      this.animate();
    }
  
    if (this.direction < 0) {
      this.ctx.scale(-1, 1);
    }
  
    if (currentSprite.isReady) {
      this.ctx.drawImage(
        currentSprite,
        currentSprite.horizontalFrameIndex * currentSprite.frameWidth,
        0,
        currentSprite.frameWidth,
        currentSprite.frameHeight,
        this.direction < 0 ? -this.x - this.w : this.x,
        this.y,
        this.w,
        this.h
      );
    }
  
    this.ctx.restore();
  
    if (this.breadCrumb) {
      if (!this.breadCrumb.isFalling) {
        this.breadCrumb = null;
      } else {
        this.breadCrumb.move();
        this.breadCrumb.draw();
      }
    }
  }
  
}