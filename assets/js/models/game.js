class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.drawIntervalId = undefined;
    this.fps = 60;

    this.background = new Background(this.ctx);
    this.pigeon = new Pigeon(this.ctx, 10, this.canvas.height - 140);

    this.oldMan = new OldMan(this.ctx, 90, this.canvas.height - 220,);

    this.cars = [];
    this.poos = []; // Array para almacenar las "poos"
    this.pooCarCollisions = 0;
    this.whiteHits = 0;
    this.blackHits = 0;
    this.carSprites = [
      "/assets/img/cazafantasmas.png", // Coche original (blanco)
      "/assets/img/delorean.png", // DeLorean (blanco)
      "/assets/img/ATeam.png", // Furgoneta del Equipo A (negro)
      "/assets/img/batmovil.png"]


    this.breadCrumbs = [];

    this.groundHeight = this.ctx.canvas.height - 50;

    this.breadCrumbCount = 0;

    this.audio = new Audio("/assets/audio/main.mp3");
    this.audio.volume = 0.0;

    this.tick = 0;
  }

  onKeyDown(event) {
    this.pigeon.onKeyDown(event);
  }

  onKeyUp(event) {
    this.pigeon.onKeyUp(event);
  }

  start() {
    if (!this.drawIntervalId) {
      this.audio.play();

      this.drawIntervalId = setInterval(() => {
        this.clear();
        this.move();
        this.draw();
        this.checkCollisions();
        this.checkBreadCrumbCollisions();
        this.addCar();
        this.checkPooCarCollisions();
      }, 1000 / this.fps);
    }
  }

  stop() {
    clearInterval(this.drawIntervalId);
    this.audio.pause();
    this.drawIntervalId = undefined;
  }

  addCar() {
    this.tick++;

    if (this.tick > 300) {
      this.tick = 0;

      const randomDirection = Math.random() < 0.5 ? -1 : 1;
      const randomX = randomDirection === 1 ? this.canvas.width : -this.cars[0]?.w || 0; // Verificar si hay al menos un coche en this.cars
      const randomY = this.canvas.height - 270; // Altura fija

      let newCar;

      switch (Math.floor(Math.random() * 4)) {
        case 0:
          newCar = new DeLoreanCar(this.ctx, randomX, randomY, randomDirection);
          break;
        case 1:
          newCar = new EquipoACar(this.ctx, randomX, randomY, randomDirection);
          break;
        case 2:
          newCar = new Batmovil(this.ctx, randomX, randomY, randomDirection);
          break;
        default:
          newCar = new Car(this.ctx, "/assets/img/cazafantasmas.png", randomX, randomY, randomDirection);
      }

      this.cars.push(newCar);
    }
  }

  checkCollisions() {
    const m = this.pigeon;

    this.cars.forEach((e) => {
      const colx = m.x + m.w >= e.x && m.x < e.x + e.w;
      const coly = m.y + m.h >= e.y && m.y < e.y + e.h;

      if (colx && coly) {
        this.gameOver();
      }
    });
  }

  checkBreadCrumbCollisions() {
    const m = this.pigeon;

    this.breadCrumbs = this.breadCrumbs.filter((breadCrumb) => {
      const colx = m.x + m.w >= breadCrumb.x && m.x < breadCrumb.x + breadCrumb.width;
      const coly = m.y + m.h >= breadCrumb.y && m.y < breadCrumb.y + breadCrumb.height;

      if (colx && coly && m.isEating && m.isSpacePressed) {
        this.breadCrumbCount++;
        m.breadCrumbCount++;
        return false;
      }

      return true;
    });

    this.pigeon.weapon.breadCrumbCount = m.breadCrumbCount;
  }

  checkPooCarCollisions() {
    for (let i = this.poos.length - 1; i >= 0; i--) {
      for (let j = this.cars.length - 1; j >= 0; j--) {
        if (this.poos[i].checkCollision(this.cars[j])) {
          if (
            (this.poos[i].color === "white" && this.cars[j].color === "black") ||
            (this.poos[i].color === "black" && this.cars[j].color === "white")
          ) {
            this.pooCarCollisions++;
            this.pigeon.weapon.pooCarCollisions = this.pooCarCollisions;
          }
          this.poos.splice(i, 1);
          this.cars.splice(j, 1);
          break;
        }
      }
    }
  }

  gameOver() {


    this.stop();

    this.ctx.font = "40px Comic Sans MS";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "GAME OVER",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    );
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  move() {
    this.pigeon.move();
    this.oldMan.move();

    if (this.oldMan.isThrowing && this.oldMan.breadCrumb) {
      this.oldMan.breadCrumb.move();
    }

    this.cars.forEach((e) => e.move());
  }

  draw() {
    this.background.draw();
    this.oldMan.draw();
    this.pigeon.draw();

    if (this.oldMan.isThrowing && this.oldMan.breadCrumb) {
      this.oldMan.breadCrumb.move();
      this.oldMan.breadCrumb.draw();
    }

    this.breadCrumbs.forEach((breadCrumb) => {
      breadCrumb.move();
      breadCrumb.draw();
    });

    this.cars.forEach((car) => {
      if (car.vx < 0) {
        car.isFlipped = false;
      } else {
        car.isFlipped = true;
      }
      car.draw();
    });

    this.ctx.fillStyle = "black";
    this.ctx.font = "20px 'Press Start 2P'";
    this.ctx.fillText(`Municion de cacas: ${this.pigeon.weapon.breadCrumbCount}`, 20, 50);

    this.ctx.fillStyle = "white";
this.ctx.font = "20px 'Press Start 2P'";
let text = `Colisiones poo-coche: ${this.pooCarCollisions}`;
let textWidth = this.ctx.measureText(text).width;
let canvasWidth = this.ctx.canvas.width;
this.ctx.fillText(text, canvasWidth - textWidth - 20, 50);

  }





}
