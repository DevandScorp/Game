/* eslint-disable prefer-const */
/* eslint-disable no-undef */
import FightInterface from './fightInterface';
import resourceHandler from './resourceHandler';
import getTask from '../../../components/simpleMath/createTask';

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth * 0.75;
canvas.height = window.innerHeight * 0.75;
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
  'img/heal.png',
  'img/explosion.png',
  'img/damage.png',
  'img/knight.png',
  'img/fire.png',
  'img/knightAttack.png',
  'img/orkSprite.png',
]);
resourceHandler.onReady(init);

document.getElementById('task').onclick = () => {
  let name;
  let first;
  let second;
  let result;
  let sign;
  [name, first, second, sign, result] = getTask();
  document.getElementById('taskModelLabel').innerHTML = `${name}${first}${sign}${second}`;
  document.getElementById('hidden-result').value = `${result}`;
};
document.getElementById('submit').onclick = () => {
  if (document.getElementById('hidden-result').value === document.getElementById('exampleInputEmail1').value) {
    game.makeShot();
  } else {
    game.attackHero();
  }
};
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') { game.healHero(); }
}, false);
