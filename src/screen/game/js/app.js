/* eslint-disable no-case-declarations */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
import FightInterface from './fightInterface';
import resourceHandler from './resourceHandler';
import getTask from '../../../components/simpleMath/createTask';
import getDictionary from '../../../components/translateEngToRU/translate';
import listen from '../../../components/listening/listening';
import dragAndDrop from '../../../components/dragAndDrop/dragAndDrop';
import getGreatestCommonFactor from '../../../components/greatestCommonFactor/greatestCommonFactor';
import getLeastCommonMultiple from '../../../components/leastCommonMultiple/leastCommonMultiple';
require('webpack-jquery-ui');
const _ = require('lodash');

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
/** Tasks handlers */
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
  dictionary.then((res) => {
    let i = FightInterface.getRandomInt(0, res.dictionary.words.length);
    let word = res.dictionary.words[i];
    document.getElementById('taskModelLabel').innerHTML = `${taskName}${word.english}`;
    let second = word.second ? word.second : '';
    document.getElementById('hidden-result').value = `${word.first},${second}`;
  });
  document.getElementById('note').innerHTML = `${taskNote}`;
};
document.getElementById('listening').onclick = () => {
  localStorage.setItem('task', 'listening');
  let taskNote;
  let taskName;
  let dictionary;
  let synth;
  [taskNote, taskName, dictionary, synth] = listen();
  dictionary.then((res) => {
    let i = FightInterface.getRandomInt(0, res.dictionary.words.length);
    let word = res.dictionary.words[i];
    document.getElementById('taskModelLabel').innerHTML = `${taskName}`;
    document.getElementById('hidden-result').value = `${word}`;
    const utterThis = new SpeechSynthesisUtterance(`${word}`);
    utterThis.voice = speechSynthesis.getVoices()[1];
    utterThis.volume = 3;
    utterThis.rate = 0.5;
    synth.speak(utterThis);
  });
  document.getElementById('note').innerHTML = `${taskNote}`;
};
document.getElementById('dragAndDrop').onclick = () => {
  localStorage.setItem('task', 'dragAndDrop');
  let taskNote;
  let taskName;
  let colors;
  let template;
  [taskNote, taskName, colors, template] = dragAndDrop();
  colors.then((res) => {
    let index = FightInterface.getRandomInt(0, res.colors.length);
    let word = res.colors[index];
    document.getElementById('taskModelLabel').innerHTML = `${taskName}`;
    const colorLetters = _.shuffle(word.split(''));
    document.querySelector('.form-group').innerHTML = template({ letters: colorLetters });
    document.querySelector('.form-group').innerHTML += '<input type="hidden" id = "hidden-result">';
    let children = document.getElementById('sortable').children;
    for (let i = 0; i < children.length; i += 1) {
      children[i].style.backgroundColor = word;
      children[i].style.color = 'white';
    }
    document.getElementById('hidden-result').value = `${word}`;
    $('#sortable').sortable({
      revert: true,
    });
  });
  document.getElementById('note').innerHTML = `${taskNote}`;
};
document.getElementById('NOD').onclick = () => {
  localStorage.setItem('task', 'NOD');
  let taskNote;
  let taskName;
  let result;
  let first;
  let second;
  [taskNote, taskName, result, first, second] = getGreatestCommonFactor();
  document.getElementById('taskModelLabel').innerHTML = `${taskName}${first} & ${second}`;
  document.getElementById('hidden-result').value = `${result}`;
  document.getElementById('note').innerHTML = `${taskNote}`;
};
document.getElementById('NOK').onclick = () => {
  localStorage.setItem('task', 'NOK');
  let taskNote;
  let taskName;
  let result;
  let first;
  let second;
  [taskNote, taskName, result, first, second] = getLeastCommonMultiple();
  document.getElementById('taskModelLabel').innerHTML = `${taskName}${first} & ${second}`;
  document.getElementById('hidden-result').value = `${result}`;
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
    case 'listening':
      solved = (document.getElementById('hidden-result').value === document.getElementById('answer').value);
      break;
    case 'dragAndDrop':
      let word = '';
      const solution = document.getElementById('sortable').children;
      for (let i = 0; i < solution.length; i += 1) {
        word += solution[i].innerHTML;
      }
      solved = (document.getElementById('hidden-result').value === word);
      document.querySelector('.form-group').innerHTML = `<label for="answer">Input your answer</label>
                                              <input type="text" class="form-control" id="answer">
                                              <input type="hidden" id = "hidden-result">`;
      break;
    case 'NOD':
      solved = (document.getElementById('hidden-result').value === document.getElementById('answer').value);
      break;
    case 'NOK':
      solved = (document.getElementById('hidden-result').value === document.getElementById('answer').value);
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
