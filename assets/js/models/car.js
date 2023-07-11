class Car {
  constructor(ctx, spriteSrc, x, y, direction, isFlipped) {
    this.ctx = ctx;
    this.x = x ?? this.ctx.canvas.width;
    this.y = y ?? this.ctx.canvas.height - 270;
    this.w = 350;
    this.h = 210;
    this.vx = -3 * direction;
    this.isFlipped = isFlipped;

    this.sprite = new Image();
    this.sprite.src = spriteSrc;
    this.sprite.verticalFrames = 1;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.horizontalFrames = 1;
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
    this.color = "white";
  }

  draw() {
    if (this.sprite.isReady) {
      if (this.isFlipped) {
        this.ctx.save();
        this.ctx.scale(-1, 1); // Invertir horizontalmente
        this.ctx.drawImage(
          this.sprite,
          this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
          this.sprite.verticalFrameIndex * this.sprite.frameHeight,
          this.sprite.frameWidth,
          this.sprite.frameHeight,
          -this.x - this.w, // Ajustar posición X invertida
          this.y,
          this.w,
          this.h
        );
        this.ctx.restore();
      } else {
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
      }
      this.animate();
    }
  }
  
  

  move() {
    this.x += this.vx;
  }

  animate() {
    this.animationTick++;

    if (this.animationTick > PIGEON_RAN_ANIMATION_TICK) {
      this.animationTick = 0;
      this.sprite.horizontalFrameIndex++;

      if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
        this.sprite.horizontalFrameIndex = 0;
      }
    }
  }
}
class DeLoreanCar extends Car {
  constructor(ctx, x, y, direction) {
    super(ctx, "/assets/img/delorean.png", x, y, direction); // Pasa las variables a super
    this.color = "white";
    
  }
}

class EquipoACar extends Car {
  constructor(ctx, x, y, direction) {
    super(ctx, "/assets/img/ATeam.png", x, y, direction); // Pasa las variables a super
    this.color = "black";
  }
}

class Batmovil extends Car {
  constructor(ctx, x, y, direction) {
    super(ctx, "/assets/img/batmovil.png", x, y, direction); // Pasa las variables a super
    this.color = "black";
  }
}
