class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.drawIntervalId = undefined;
    this.fps = 60;

    this.background = new Background(this.ctx);
    this.mario = new Mario(this.ctx, 10, this.canvas.height - 164);
    this.enemy = new Enemy(this.ctx);

    this.audio = new Audio("/assets/audio/main.mp3");
    this.gameOverAudio = new Audio("/assets/audio/game-over.mp3");
  }

  onKeyDown(event) {
    this.mario.onKeyDown(event);
  }

  onKeyUp(event) {
    this.mario.onKeyUp(event);
  }

  start() {
    if (!this.drawIntervalId) {
      //this.audio.play();

      this.drawIntervalId = setInterval(() => {
        this.clear();
        this.move();
        this.draw();
        this.checkCollisions();
      }, 1000 / this.fps);
    }
  }

  stop() {
    clearInterval(this.drawIntervalId);
    this.audio.pause();
    this.drawIntervalId = undefined;
  }

  checkCollisions() {
    const m = this.mario;
    const e = this.enemy;

    const colx = m.x + m.w >= e.x && m.x < e.x + e.w;
    const coly = m.y + m.h >= e.y && m.y < e.y + e.h;

    if (colx && coly) {
      this.gameOver();
    }
  }

  gameOver() {
    this.gameOverAudio.play();
    this.stop();
    alert("GAME OVER");
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  move() {
    this.background.move();
    this.mario.move();
    this.enemy.move();
  }

  draw() {
    this.background.draw();
    this.mario.draw();
    this.enemy.draw();
  }
}
