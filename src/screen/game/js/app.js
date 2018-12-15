/* eslint-disable no-case-declarations */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FightInterface from './fightInterface';
import resourceHandler from './resourceHandler';
import getTask from '../../../components/simpleMath/createTask';
import getDictionary from '../../../components/translateEngToRU/translate';
import listen from '../../../components/listening/listening';
import dragAndDrop from '../../../components/dragAndDrop/dragAndDrop';
import getGreatestCommonFactor from '../../../components/greatestCommonFactor/greatestCommonFactor';
import getLeastCommonMultiple from '../../../components/leastCommonMultiple/leastCommonMultiple';
import setInfo from './setInfo';

require('webpack-jquery-ui');
const _ = require('lodash');

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth * 0.75;
canvas.height = window.innerHeight * 0.75;
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
const game = new FightInterface(canvas, ctx, resourceHandler);
const blueFireSpritePath = 'img/fire.png';
const redFireSpritePath = 'img/fireRed.png';
const pinkFireSpritePath = 'img/firePink.png';

/** Ввод имени при загрузке страницы */
$(document).ready(() => {
  console.log('ready');
  $('#nickName').modal('show');
});

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
  'img/firePink.png',
  'img/fireRed.png',
  'img/knightAttack.png',
  'img/orkSprite.png',
]);
resourceHandler.onReady(init);
/** Tasks handlers */
$('#arithmetics').click(() => {
  localStorage.setItem('task', 'arithmetics');
  let name;
  let first;
  let second;
  let result;
  let sign;
  let taskNote;
  [name, first, second, sign, result, taskNote] = getTask();
  setInfo(`${name}${first}${sign}${second}`, `${result}`, `${taskNote}`);
});
$('#translate').click(() => {
  localStorage.setItem('task', 'translate');
  let taskNote;
  let taskName;
  let dictionary;
  [taskNote, taskName, dictionary] = getDictionary();
  dictionary.then((res) => {
    let i = FightInterface.getRandomInt(0, res.dictionary.words.length);
    let word = res.dictionary.words[i];
    let second = word.second ? word.second : '';
    setInfo(`${taskName}${word.english}`, `${word.first},${second}`, `${taskNote}`);
  });
});
$('#listening').click(() => {
  localStorage.setItem('task', 'listening');
  let taskNote;
  let taskName;
  let dictionary;
  let synth;
  [taskNote, taskName, dictionary, synth] = listen();
  dictionary.then((res) => {
    let i = FightInterface.getRandomInt(0, res.dictionary.words.length);
    let word = res.dictionary.words[i];
    setInfo(`${taskName}`, `${word}`, `${taskNote}`);
    const utterThis = new SpeechSynthesisUtterance(`${word}`);
    utterThis.voice = speechSynthesis.getVoices()[1];
    utterThis.volume = 5;
    utterThis.rate = 0.5;
    synth.speak(utterThis);
  });
});
$('#dragAndDrop').click(() => {
  localStorage.setItem('task', 'dragAndDrop');
  let taskNote;
  let taskName;
  let colors;
  let template;
  [taskNote, taskName, colors, template] = dragAndDrop();
  colors.then((res) => {
    let index = FightInterface.getRandomInt(0, res.colors.length);
    let word = res.colors[index];
    const colorLetters = _.shuffle(word.split(''));
    $('.form-group').html(`${template({ letters: colorLetters })}<input type="hidden" id = "hidden-result">`);
    $('#sortable').children().css('background-color', word);
    $('#sortable').children().css('color', 'white');
    setInfo(`${taskName}`, `${word}`, `${taskNote}`);
    $('#sortable').sortable({
      revert: true,
    });
  });
});
$('#NOD').click(() => {
  localStorage.setItem('task', 'NOD');
  let taskNote;
  let taskName;
  let result;
  let first;
  let second;
  [taskNote, taskName, result, first, second] = getGreatestCommonFactor();
  setInfo(`${taskName}${first} & ${second}`, `${result}`, `${taskNote}`);
});
$('#NOK').click(() => {
  localStorage.setItem('task', 'NOK');
  let taskNote;
  let taskName;
  let result;
  let first;
  let second;
  [taskNote, taskName, result, first, second] = getLeastCommonMultiple();
  setInfo(`${taskName}${first} & ${second}`, `${result}`, `${taskNote}`);
});
$('#submitName').click(() => {
  $('.heroName').html($('#nickNameInput').val());
});
$('#submit').click(() => {
  let solved = false;
  let healed = false;
  let fireSpritePath = blueFireSpritePath;
  switch (localStorage.getItem('task')) {
    case 'translate':
      fireSpritePath = redFireSpritePath;
      solved = $('#hidden-result').val().split(',')
        .filter(a => a)
        .includes($('#answer').val().toLowerCase());
      break;
    case 'listening':
      fireSpritePath = blueFireSpritePath;
      solved = ($('#hidden-result').val() === $('#answer').val());
      break;
    case 'dragAndDrop':
      let word = '';
      const solution = document.getElementById('sortable').children;
      for (let i = 0; i < solution.length; i += 1) {
        word += solution[i].innerHTML;
      }
      fireSpritePath = pinkFireSpritePath;
      solved = ($('#hidden-result').val() === word);
      $('.form-group').html(`<label for="answer">Input your answer</label>
                              <input type="text" class="form-control" id="answer">
                              <input type="hidden" id = "hidden-result">`);
      break;
    default:
      healed = ($('#hidden-result').val() === $('#answer').val());
      break;
  }
  if (solved) {
    game.makeShot(fireSpritePath);
  } else if (healed) {
    game.healHero();
  } else {
    game.attackHero();
  }
});
