/* eslint-disable no-case-declarations */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FightInterface from './fightInterface';
import resourceHandler from './resourceHandler';
import getTask from '../../../components/tasks/simpleMath/createTask';
import getDictionary from '../../../components/tasks/translateEngToRU/translate';
import listen from '../../../components/tasks/listening/listening';
import dragAndDrop from '../../../components/tasks/dragAndDrop/dragAndDrop';
import getGreatestCommonFactor from '../../../components/tasks/greatestCommonFactor/greatestCommonFactor';
import getLeastCommonMultiple from '../../../components/tasks/leastCommonMultiple/leastCommonMultiple';
import setInfo from './setInfo';
import getRandomInt from './getRandomInt';
import compareTwoNumbers from '../../../components/tasks/comparison/compareTwoNumbers';
import getTranscription from '../../../components/tasks/transcription/getTranscription';
import createWords from '../../../components/tasks/createWords/createWords';
import findRedundant from '../../../components/tasks/findRedundant/findRedundant';
import findMistake from '../../../components/tasks/findMistake/findMistake';
import getPrepositions from '../../../components/tasks/prepositions/getPrepositions';
import getTenses from '../../../components/tasks/tenses/getTenses';
import getArticles from '../../../components/tasks/articles/getArticles';

require('webpack-jquery-ui');
const _ = require('lodash');

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.75;
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
const game = new FightInterface(canvas, ctx, resourceHandler);
const blueFireSpritePath = 'img/fire.png';
const redFireSpritePath = 'img/fireRed.png';
const pinkFireSpritePath = 'img/firePink.png';

/** Ввод имени при загрузке страницы */
$(document).ready(() => {
  $('#nickName').modal('show');
  let players = {};
  if (sessionStorage.getItem('players') && Object.keys(JSON.parse(sessionStorage.getItem('players')))) {
    players = JSON.parse(sessionStorage.getItem('players'));
  }
  setTimeout(() => { $('#nickNameInput').focus(); }, 500);
  sessionStorage.setItem('players', JSON.stringify(players));
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  fetch('https://murmuring-fortress-42045.herokuapp.com/score', {
    method: 'GET',
    headers: myHeaders,
  }).then(res => res.json()).then((res) => {
    console.log(res);
  });
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
$('body').keydown((e) => {
  if (e.altKey) {
    e.preventDefault();
    if (!document.querySelector('.show')) {
      $('#tasks').modal('show');
    }
  }

  if (e.key === 'Enter') {
    if (!document.querySelector('div.show div.modal-body div.btn-toolbar')) {
      $('div.show button').trigger('click');
    }
  }
  if (e.key === '1') {
    if (document.querySelector('div.show div.modal-body div.btn-toolbar')) {
      $('#attack').trigger('click');
      $('#dragAndDrop').focus();
    }
  }
  if (e.key === '2') {
    if (document.querySelector('div.show div.modal-body div.btn-toolbar')) {
      e.preventDefault();
      $('#heal').trigger('click');
      $('#arithmetics').focus();
    }
  }
});
$('#arithmetics').click(() => {
  sessionStorage.setItem('task', 'arithmetics');
  let name;
  let first;
  let second;
  let result;
  let sign;
  let taskNote;
  [name, first, second, sign, result, taskNote] = getTask();
  setInfo(`${name}${first}${sign}${second}`, `${result}`, `${taskNote}`);
  setTimeout(() => { $('#answer').focus(); }, 500);
});
$('#mistake').click(() => {
  sessionStorage.setItem('task', 'mistake');
  let taskNote;
  let taskName;
  let sentences;
  let template;
  [taskNote, taskName, sentences, template] = findMistake();
  sentences.then((res) => {
    let index = getRandomInt(0, res.length);
    let word = res[index];
    $('.form-group').html(`${template({ sentence: word })}<input type="hidden" id = "hidden-result">`);
    setInfo(`${taskName}`, `${word.answer}`, `${taskNote}`);
  });
  $('.form-group').click((evt) => {
    for (let i = 0; i < document.querySelector('.form-group').children.length; i += 1) {
      document.querySelector('.form-group').children[i].classList.remove('clicked');
    }
    evt.target.classList.add('clicked');
  });
});

$('#redundant').click(() => {
  sessionStorage.setItem('task', 'redundant');
  let taskNote;
  let taskName;
  let variants;
  let template;
  [taskNote, taskName, variants, template] = findRedundant();
  variants.then((res) => {
    let index = getRandomInt(0, res.length);
    let word = res[index];
    $('.form-group').html(`${template({ words: word })}<input type="hidden" id = "hidden-result">`);
    setInfo(`${taskName}  ${word.topic} `, `${word.answer}`, `${taskNote}`);
    setTimeout(() => { $('#getRedundant').focus(); }, 500);
  });
});

$('#prepositions').click(() => {
  sessionStorage.setItem('task', 'prepositions');
  let taskNote;
  let taskName;
  let prepositions;
  let template;
  [taskNote, taskName, prepositions, template] = getPrepositions();
  prepositions.then((res) => {
    let index = getRandomInt(0, res.length);
    let word = res[index];
    $('.form-group').html(`${template({ words: word })}<input type="hidden" id = "hidden-result">`);
    setInfo(`${taskName}  ${word.sentence} `, `${word.answer}`, `${taskNote}`);
    setTimeout(() => { $('#getPrepositions').focus(); }, 500);
  });
});

$('#articles').click(() => {
  sessionStorage.setItem('task', 'articles');
  let taskNote;
  let taskName;
  let articles;
  let template;
  [taskNote, taskName, articles, template] = getArticles();
  articles.then((res) => {
    let index = getRandomInt(0, res.length);
    let word = res[index];
    $('.form-group').html(`${template({ words: word })}<input type="hidden" id = "hidden-result">`);
    setInfo(`${taskName}  ${word.sentence} `, `${word.answer}`, `${taskNote}`);
    setTimeout(() => { $('#getArticles').focus(); }, 500);
  });
});
$('#tenses').click(() => {
  sessionStorage.setItem('task', 'tenses');
  let taskNote;
  let taskName;
  let tenses;
  let template;
  [taskNote, taskName, tenses, template] = getTenses();
  tenses.then((res) => {
    let index = getRandomInt(0, res.length);
    let word = res[index];
    $('.form-group').html(`${template({ words: word })}<input type="hidden" id = "hidden-result">`);
    setInfo(`${taskName}  ${word.sentence} `, `${word.answer}`, `${taskNote}`);
    setTimeout(() => { $('#getTenses').focus(); }, 500);
  });
});
$('#translate').click(() => {
  sessionStorage.setItem('task', 'translate');
  let taskNote;
  let taskName;
  let dictionary;
  [taskNote, taskName, dictionary] = getDictionary();
  dictionary.then((res) => {
    let i = getRandomInt(0, res.dictionary.words.length);
    let word = res.dictionary.words[i];
    let second = word.second ? word.second : '';
    setInfo(`${taskName}${word.english}`, `${word.first},${second}`, `${taskNote}`);
    setTimeout(() => { $('#answer').focus(); }, 500);
  });
});
$('#transcription').click(() => {
  sessionStorage.setItem('task', 'transcription');
  let taskNote;
  let taskName;
  let transcriptions;
  [taskNote, taskName, transcriptions] = getTranscription();
  transcriptions.then((res) => {
    let i = getRandomInt(0, res.length);
    const word = res[i].word;
    const transcription = res[i].transcription;
    setInfo(`${taskName} : ${transcription}`, `${word}`, `${taskNote}`);
    setTimeout(() => { $('#answer').focus(); }, 500);
  });
});

$('#createWords').click(() => {
  sessionStorage.setItem('task', 'transcription');
  let taskNote;
  let taskName;
  let words;
  [taskNote, taskName, words] = createWords();
  words.then((res) => {
    let i = getRandomInt(0, res.length);
    const sentence = res[i].sentence;
    const word = res[i].word;
    const answer = res[i].answer;
    setInfo(`${taskName} : ${word} <br> Sentence : <br> ${sentence}`, `${answer}`, `${taskNote}`);
    setTimeout(() => { $('#answer').focus(); }, 500);
  });
});
$('#listening').click(() => {
  sessionStorage.setItem('task', 'listening');
  let taskNote;
  let taskName;
  let dictionary;
  let synth;
  [taskNote, taskName, dictionary, synth] = listen();
  dictionary.then((res) => {
    let i = getRandomInt(0, res.dictionary.words.length);
    let word = res.dictionary.words[i];
    setInfo(`${taskName}`, `${word}`, `${taskNote}`);
    const utterThis = new SpeechSynthesisUtterance(`${word}`);
    utterThis.voice = speechSynthesis.getVoices()[1];
    utterThis.volume = 5;
    utterThis.rate = 0.5;
    synth.speak(utterThis);
    setTimeout(() => { $('#answer').focus(); }, 500);
  });
});
$('#dragAndDrop').click(() => {
  sessionStorage.setItem('task', 'dragAndDrop');
  let taskNote;
  let taskName;
  let colors;
  let template;
  [taskNote, taskName, colors, template] = dragAndDrop();
  colors.then((res) => {
    let index = getRandomInt(0, res.colors.length);
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
  sessionStorage.setItem('task', 'NOD');
  let taskNote;
  let taskName;
  let result;
  let first;
  let second;
  [taskNote, taskName, result, first, second] = getGreatestCommonFactor();
  setInfo(`${taskName}${first} & ${second}`, `${result}`, `${taskNote}`);
  setTimeout(() => { $('#answer').focus(); }, 500);
});
$('#NOK').click(() => {
  sessionStorage.setItem('task', 'NOK');
  let taskNote;
  let taskName;
  let result;
  let first;
  let second;
  [taskNote, taskName, result, first, second] = getLeastCommonMultiple();
  setInfo(`${taskName}${first} & ${second}`, `${result}`, `${taskNote}`);
  setTimeout(() => { $('#answer').focus(); }, 500);
});
$('#comparison').click(() => {
  sessionStorage.setItem('task', 'comparison');
  let taskNote;
  let taskName;
  let sign;
  let a;
  let b;
  [taskNote, taskName, sign, a, b] = compareTwoNumbers();
  setInfo(`${taskName}${a} & ${b}`, `${sign}`, `${taskNote}`);
  setTimeout(() => { $('#answer').focus(); }, 500);
});
$('#submitName').click(() => {
  $('.heroName').html($('#nickNameInput').val());
  const players = JSON.parse(sessionStorage.getItem('players'));
  game.currentPlayerName = $('#nickNameInput').val();
  players[$('#nickNameInput').val()] = 0;
  sessionStorage.setItem('players', JSON.stringify(players));
});
$('#submit').click(() => {
  let solved = false;
  let healed = false;
  let fireSpritePath = blueFireSpritePath;
  switch (sessionStorage.getItem('task')) {
    case 'translate':
      fireSpritePath = redFireSpritePath;
      solved = $('#hidden-result').val().split(',')
        .filter(a => a)
        .includes($('#answer').val().toLowerCase());
      break;
    case 'redundant':
      let index = 0;
      let children = document.getElementById('getRedundant').children;
      for (let i = 0; i < children.length; i += 1) {
        if (children[i].selected)index = i;
      }
      solved = ($('#hidden-result').val() === `${index}`);
      $('.form-group').html(`<label for="answer">Input your answer</label>
          <input type="text" class="form-control" id="answer">
          <input type="hidden" id = "hidden-result">`);
      break;
    case 'prepositions':
      index = 0;
      children = document.getElementById('getPrepositions').children;
      for (let i = 0; i < children.length; i += 1) {
        if (children[i].selected)index = i;
      }
      solved = ($('#hidden-result').val() === `${index}`);
      $('.form-group').html(`<label for="answer">Input your answer</label>
          <input type="text" class="form-control" id="answer">
          <input type="hidden" id = "hidden-result">`);
      break;
    case 'articles':
      index = 0;
      children = document.getElementById('getArticles').children;
      for (let i = 0; i < children.length; i += 1) {
        if (children[i].selected)index = i;
      }
      healed = ($('#hidden-result').val() === `${index}`);
      $('.form-group').html(`<label for="answer">Input your answer</label>
          <input type="text" class="form-control" id="answer">
          <input type="hidden" id = "hidden-result">`);
      break;
    case 'tenses':
      index = 0;
      children = document.getElementById('getTenses').children;
      for (let i = 0; i < children.length; i += 1) {
        if (children[i].selected)index = i;
      }
      solved = ($('#hidden-result').val() === `${index}`);
      $('.form-group').html(`<label for="answer">Input your answer</label>
          <input type="text" class="form-control" id="answer">
          <input type="hidden" id = "hidden-result">`);
      break;
    case 'mistake':
      index = 0;
      children = document.querySelector('.form-group').children;
      for (let i = 0; i < children.length; i += 1) {
        if (children[i].classList.contains('clicked'))index = i;
      }
      solved = ($('#hidden-result').val() === `${index}`);
      $('.form-group').html(`<label for="answer">Input your answer</label>
          <input type="text" class="form-control" id="answer">
          <input type="hidden" id = "hidden-result">`);
      $('.form-group').unbind('click');
      break;
    case 'listening':
      fireSpritePath = blueFireSpritePath;
      solved = ($('#hidden-result').val() === $('#answer').val().toLowerCase());
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
      healed = ($('#hidden-result').val() === $('#answer').val().toLowerCase());
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
