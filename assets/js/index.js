const canvasId = 'main-canvas';
const game = new Game(canvasId);

window.addEventListener('keydown', (event) => {
  console.log('keydown', event);
  game.onKeyDown(event)
});
window.addEventListener('keyup', (event) => {
  console.log('keyup', event);
  game.onKeyUp(event)
});

game.start();