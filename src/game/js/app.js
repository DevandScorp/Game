import FightInterface from './fightInterface';
import resourceHandler from './resourceHandler';

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
const game = new FightInterface(canvas, ctx, resourceHandler);

let lastTime = 0;
function main() {
  const now = Date.now();
  const dt = (now - lastTime) / 1000.0;
  game.updateEntities(dt);
  game.render();
  lastTime = now;
  requestAnimationFrame(main);
}
function init() {
  game.reset();
  lastTime = Date.now();
  main();
}

resourceHandler.load([
  'img/sprites.png',
  'img/terrain.png',
  'img/knights.png',
  'img/fire.png',
  'img/knights_attack.png',
  'img/ork_sprite.png',
]);
resourceHandler.onReady(init);
window.addEventListener('click', () => {
  game.makeShot();
}, false);
