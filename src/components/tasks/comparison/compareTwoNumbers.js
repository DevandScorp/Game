import getRandomInt from '../../../screen/game/js/getRandomInt';

export default function compareTwoNumbers() {
  const taskName = 'Compare two numbers: ';
  const taskNote = 'Note: сравнить два числа';
  const a = getRandomInt(1, 20);
  const b = getRandomInt(1, 20);
  let sign = '=';
  if (a < b) {
    sign = '<';
  } else if (a > b) {
    sign = '>';
  }
  return [taskNote, taskName, sign, a, b];
}
