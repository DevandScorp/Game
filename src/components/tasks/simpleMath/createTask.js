import getRandomInt from '../../../screen/game/js/getRandomInt';

export default function getTask() {
  const signs = ['*', '-', '+', '/'];
  const a = getRandomInt(1, 10);
  const b = getRandomInt(1, 10);
  const sign = signs[getRandomInt(0, signs.length)];
  const taskName = 'Solve task: ';
  const taskNote = 'Note: for division you have to write first number after comma';
  let result = 0;
  switch (sign) {
    case '*':
      result = a * b;
      break;
    case '-':
      result = a - b;
      break;
    case '+':
      result = a + b;
      break;
    case '/':
      result = (`${a / b}`).substring(0, (`${a / b}`).indexOf('.') + 2);
      break;
    default:
      break;
  }
  return [taskName, a, b, sign, result, taskNote];
}
