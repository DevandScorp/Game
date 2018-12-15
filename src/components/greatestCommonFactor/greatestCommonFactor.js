/* eslint-disable no-param-reassign */
/** Нахождение наибольшего общего делителя двух чисел */
import Sprite from '../../screen/game/js/fightInterface';

export function getNOD(a, b) {
  while (b) {
    const c = a % b;
    a = b;
    b = c;
  }
  return a;
}
export default function getGreatestCommonFactor() {
  const a = Sprite.getRandomInt(1, 20);
  const b = Sprite.getRandomInt(1, 20);
  const taskName = 'Count the greatest common factor: ';
  const taskNote = 'Note: найти НОД двух чисел';
  const result = getNOD(a, b);
  return [taskNote, taskName, result, a, b];
}
