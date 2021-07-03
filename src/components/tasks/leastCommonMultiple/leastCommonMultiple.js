/* eslint-disable no-bitwise */
/* eslint-disable no-undef */
import getRandomInt from '../../../screen/game/js/getRandomInt';
import { getNOD } from '../greatestCommonFactor/greatestCommonFactor';

export default function getLeastCommonMultiple() {
  const a = getRandomInt(1, 20);
  const b = getRandomInt(1, 20);
  const taskName = 'Count the least common multiple: ';
  const taskNote = 'Note: найти НОК двух чисел';
  const result = Math.abs(a * b) / getNOD(a, b);
  return [taskNote, taskName, result, a, b];
}
