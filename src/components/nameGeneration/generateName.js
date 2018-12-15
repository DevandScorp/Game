/* eslint-disable no-undef */
import Sprite from '../../screen/game/js/fightInterface';

export default function generateName() {
  const first = Sprite.getRandomInt(0, 10);
  const third = Sprite.getRandomInt(0, 6);
  const names = fetch('./../../../src/components/nameGeneration/names.json')
    .then(res => res.json());
  return [first, 0, third, names];
}
