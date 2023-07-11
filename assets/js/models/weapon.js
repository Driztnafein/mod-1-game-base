class Weapon {
  constructor(ctx, x, y, direction, breadCrumbCount) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.pooCount = 0;
    this.maxPooCount = 23;
    this.breadCrumbCount = breadCrumbCount;
    this.poos = [];
    this.pooCarCollisions = 0;
  }

  
  shootBlack() {
    if (this.breadCrumbCount > 0) {
      const newPoo = new BlackPoo(this.ctx, this.x, this.y, this.direction);
      this.poos.push(newPoo);
      this.decreaseBreadCrumbCount(); 
    }
  }

  shootWhite() {
    if (this.breadCrumbCount > 0) {
      const newPoo = new WhitePoo(this.ctx, this.x, this.y, this.direction);
      this.poos.push(newPoo);
      this.decreaseBreadCrumbCount(); 
    }
  }

  decreaseBreadCrumbCount() {
    this.breadCrumbCount--;
  }
     

  draw() {
    this.poos.forEach((poo) => {
      poo.draw();
    });
  }

  move() {
    this.poos.forEach((poo, index) => {
      poo.move();
  
      // Verificar colisión con los coches
      for (let i = 0; i < game.cars.length; i++) {
        if (poo.checkCollision(game.cars[i])) {
          game.pooCarCollisions++;
          this.pooCarCollisions++;
          this.poos.splice(index, 1);
          game.cars.splice(i, 1);
          break;
        }
      }
  
      // Eliminar las poos que salgan de la pantalla
      if (poo.x + poo.width < 0 || poo.x > this.ctx.canvas.width) {
        this.poos.splice(index, 1);
      }
    });
  }
}
