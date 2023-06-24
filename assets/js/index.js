const canvasId = "main-canvas";
const game = new Game(canvasId);

window.addEventListener("keydown", (event) => {
  game.onKeyDown(event);
});

window.addEventListener("keyup", (event) => {
  game.onKeyUp(event);
});

//document.getElementById("start-btn").onclick = () => {
game.start();
//};
