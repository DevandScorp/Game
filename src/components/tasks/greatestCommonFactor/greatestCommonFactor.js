/* eslint-disable no-param-reassign */
/** Нахождение наибольшего общего делителя двух чисел */
import getRandomInt from '../../../screen/game/js/getRandomInt';

export function getNOD(a, b) {
  while (b) {
    const c = a % b;
    a = b;
    b = c;
  }
  return a;
}
export default function getGreatestCommonFactor() {
  const a = getRandomInt(1, 20);
  const b = getRandomInt(1, 20);
  const taskName = 'Count the greatest common factor: ';
  const taskNote = 'Note: найти НОД двух чисел';
  const result = getNOD(a, b);
  return [taskNote, taskName, result, a, b];
}
