class Game {

  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');

    this.drawIntervalId = undefined;
    this.fps = 60;

    this.background = new Background(this.ctx);
    this.square = new Square(this.ctx, 10, 10);
    this.mario = new Mario(this.ctx, 10, this.canvas.height - 164);
  }

  onKeyDown(event) {
    this.square.onKeyDown(event);
    this.mario.onKeyDown(event);
  }

  onKeyUp(event) {
    this.square.onKeyUp(event);
    this.mario.onKeyUp(event);
  }

  start() {
    if (!this.drawIntervalId) {
      this.drawIntervalId = setInterval(() => {
        this.clear();
        this.move();
        this.draw();
      }, 1000 / this.fps);
    }
  }

  stop() {
    clearInterval(this.drawIntervalId);
    this.drawIntervalId = undefined;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  move() {
    this.square.move();
    this.background.move();
    this.mario.move();
  }

  draw() {
    this.background.draw();
    this.square.draw();
    this.mario.draw();
  }
} 