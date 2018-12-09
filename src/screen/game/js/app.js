/* eslint-disable prefer-const */
/* eslint-disable no-undef */
import FightInterface from './fightInterface';
import resourceHandler from './resourceHandler';
import getTask from '../../../components/simpleMath/createTask';
import getDictionary from '../../../components/translateEngToRU/translate';

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

document.getElementById('arithmetics').onclick = () => {
  localStorage.setItem('task', 'arithmetics');
  let name;
  let first;
  let second;
  let result;
  let sign;
  let taskNote;
  [name, first, second, sign, result, taskNote] = getTask();
  document.getElementById('taskModelLabel').innerHTML = `${name}${first}${sign}${second}`;
  document.getElementById('hidden-result').value = `${result}`;
  document.getElementById('note').innerHTML = `${taskNote}`;
};
document.getElementById('translate').onclick = () => {
  localStorage.setItem('task', 'translate');
  let taskNote;
  let taskName;
  let dictionary;
  [taskNote, taskName, dictionary] = getDictionary();
  console.log(dictionary);
  dictionary.then((res) => {
    let i = FightInterface.getRandomInt(0, res.dictionary.words.length);
    let word = res.dictionary.words[i];
    document.getElementById('taskModelLabel').innerHTML = `${taskName}${word.english}`;
    let second = word.second ? word.second : '';
    document.getElementById('hidden-result').value = `${word.first},${second}`;
  });
  document.getElementById('note').innerHTML = `${taskNote}`;
};
document.getElementById('submit').onclick = () => {
  let solved = false;
  switch (localStorage.getItem('task')) {
    case 'arithmetics':
      solved = (document.getElementById('hidden-result').value === document.getElementById('answer').value);
      break;
    case 'translate':
      solved = document.getElementById('hidden-result').value.split(',')
        .filter(a => a).includes(document.getElementById('answer').value.toLowerCase());
      break;
    default:
      break;
  }
  if (solved) {
    game.makeShot();
  } else {
    game.attackHero();
  }
};
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') { game.healHero(); }
}, false);
