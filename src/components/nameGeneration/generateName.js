/* eslint-disable no-undef */
import getRandomInt from '../../screen/game/js/getRandomInt';

export default function generateName() {
  const first = getRandomInt(0, 10);
  const third = getRandomInt(0, 6);
  const names = fetch('./../../../src/components/nameGeneration/names.json')
    .then(res => res.json());
  return [first, 0, third, names];
}
