import Sprite from '../../screen/game/js/fightInterface';

export default function getTask() {
  const signs = ['*', '-', '+', '/'];
  const a = Sprite.getRandomInt(1, 10);
  const b = Sprite.getRandomInt(1, 10);
  const sign = signs[Sprite.getRandomInt(0, signs.length)];
  const taskName = 'Solve task: ';
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
      result = (a / b).toFixed(1);
      break;
    default:
      break;
  }
  return [taskName, a, b, sign, result];
}
